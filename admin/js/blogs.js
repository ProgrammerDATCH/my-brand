const serverLink = 'https://mybrandbackend-4e8h.onrender.com/api';

const allBlogs = document.getElementById("allBlogs");

const editPopup = document.getElementById("editPopup");

document.getElementById("cancelBtnEdit").addEventListener("click", ()=>{
    editPopup.style.display = "none";
})

document.getElementById("closeBtnEdit").addEventListener("click", ()=>{
    editPopup.style.display = "none";
})

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
                <td class="action-btns">
                <button class="edit-blog-btn" style="background-color: #134074;" onclick='showEdit("${blog._id}", "${blog.title}", "${blog.description}")'><i class="fas fa-edit"></i> Edit</button>
                <button class="delete-btn" onclick="deleteBlog('${blog._id}')"><i class="fa fa-trash"></i> Delete</button></td>
            </tr>
                `
    });
}

onload = showBlogs();

const showEdit = (id, title, description) => {
    document.getElementById("blogId").value = id;
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    editPopup.style.display = "flex";
}



const editBlog = async() => {
        const id = document.getElementById("blogId").value;
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        if(title == "" || description == ""){
            alert("Please fill all fields")
            return;
        }
        document.getElementById("editBtn").innerText = "Updating..."
        const res = await fetch(`${serverLink}/blog/update`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie()}`
        },
        body: JSON.stringify({id, title, description})
    });
    document.getElementById("editBtn").innerText = "Update"
    if (!res.ok) {
        console.log("Send API Failed!");
    }
    const result = await res.json();
    document.getElementById("blogId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    alert(result.message)
    editPopup.style.display = "none";
    showBlogs();
}


editPopup.addEventListener('click', function (event) {
    if (event.target === this) {
        this.style.display = 'none';
    }
});

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