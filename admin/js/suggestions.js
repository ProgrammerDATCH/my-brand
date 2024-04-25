const serverLink = 'https://mybrandbackend-4e8h.onrender.com/api';

const allSuggestions = document.getElementById("allSuggestions");

const showSuggestion = async () => {
    const res = await fetch(`${serverLink}/suggestion/suggestions`, {
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
    const suggestions = await res.json();
    allSuggestions.innerHTML = ""
    suggestions.message.forEach(suggestion => {
        allSuggestions.innerHTML += `
        <tr>
            <td>${suggestion._id}</td>
            <td>${suggestion.name}</td>
            <td>${suggestion.email}</td>
            <td>${suggestion.subject}</td>
            <td>${suggestion.message}</td>
            <td class="action-btns"><button class="delete-btn" onclick="deleteSuggestion('${suggestion._id}')"><i class="fa fa-trash"></i> Delete</button></td>
        </tr>
                `
    });
}

onload = showSuggestion();

const deleteSuggestion = async(id) => {
    const res = await fetch(`${serverLink}/suggestion/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie()}`
        },
        body: JSON.stringify({id})
    });
    if (!res.ok) {
        console.log("Send API Failed!");
        return;
    }
    const result = await res.json();
    
    alert(result.message)
    showSuggestion();
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