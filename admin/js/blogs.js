const serverLink = 'https://mybrandbackend-4e8h.onrender.com/api';

const allBlogs = document.getElementById("allBlogs");

const showBlogs = async () => {
    const res = await fetch(`${serverLink}/blog/blogs`);
    if (!res.ok) {
        console.log("Send API Failed!");
        return;
    }
    const blogs = await res.json();
    allBlogs.innerHTML = ""
    blogs.message.forEach(blog => {
        allBlogs.innerHTML += `
            <tr>
                <td>${blog._id}</td>
                <td>${blog.title}</td>
                <td>${truncateText(blog.description)}</td>
                <td class="centerize"><img src="${blog.image}" width="50"></td>
                <td class="action-btns"><button class="delete-btn" onclick="deleteBlog('${blog._id}')"><i class="fa fa-trash"></i> Delete</button></td>
            </tr>
                `
    });
}

onload = showBlogs();

const deleteBlog = async(id) => {
    const res = await fetch(`${serverLink}/blog/delete`, {
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
    showBlogs();
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


function truncateText(text) {
    if (text.length > 100) {
        return text.substr(0, 40) + '...' + text.substr(text.length - 40);
    }
    return text;
}