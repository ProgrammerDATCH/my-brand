const serverLink = "http://localhost:9090/api";

const allUsers = document.getElementById("allUsers");

const showUsers = async () => {
    const res = await fetch(`${serverLink}/users/users`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie()}`
        }
    });
    if (!res.ok) {
        console.log("Send API Failed!");
        return;
    }
    const users = await res.json();
    allUsers.innerHTML = ""
    users.message.forEach(user => {
        allUsers.innerHTML += `
                <tr>
                    <td>${user._id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td class="action-btns"><button class="delete-btn" onclick="deleteUser('${user.email}')"><i class="fa fa-trash"></i> Delete</button></td>
                </tr>
                `
    });
}

onload = showUsers();

const deleteUser = async(email) => {
    const res = await fetch(`${serverLink}/users/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie()}`
        },
        body: JSON.stringify({email})
    });
    if (!res.ok) {
        console.log("Send API Failed!");
        return;
    }
    const result = await res.json();
    if(!result.success){
        alert(result.message)
    }
    showUsers();
}

function getCookie() {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === "adminToken") {
            return cookieValue;
        }
    }
    return null;
}