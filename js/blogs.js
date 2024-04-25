const serverLink = 'https://mybrandbackend-4e8h.onrender.com/api';

const blogsContainer = document.getElementById("blogsContainer");
const addPopup = document.getElementById('addPopup');
const closeBtnAdd = document.getElementById('closeBtnAdd');
const cancelBtnAdd = document.getElementById('cancelBtnAdd');

closeBtnAdd.addEventListener('click', () => { closePopup(addPopup) })
cancelBtnAdd.addEventListener('click', () => { closePopup(addPopup) })



function closePopup(element) {
    element.style.display = 'none';
}


function showAddBlog() {
    addPopup.style.display = 'flex';
}

async function addBlog() {
    const addTitle = document.getElementById('addTitle').value;
    const addDescription = document.getElementById('addDescription').value;
    const addImageInput = document.getElementById('addImage');
    
    if (addTitle.trim() == "" || addImageInput.files.length === 0 || addDescription.trim() == "") {
        alert("Fill all fields please.");
        return;
    }
    const file = addImageInput.files[0];
    const imageBase64 = await convertToBase64(file);

    if(await callAPI("/blog/add", "POST", { title: addTitle, image: imageBase64, description: addDescription }, addPopup)) {
        alert("Blog Added");
        document.getElementById('addTitle').value = "";
        document.getElementById('addDescription').value = "";
        addImageInput.value = "";
    }
}


const showBlogs = async() =>{
    const res = await fetch(`${serverLink}/blog/blogs`);
    if (!res.ok) {
        console.log("Send API Failed!");
        return;
    }
    const blogs = await res.json();
    blogsContainer.innerHTML = ""
    blogs.message.forEach(blog => {
        blogsContainer.innerHTML += `
            <div class="blog-div">
                <div class="blog-img-div">
                    <img src="${blog.image}" class="blog-img">
                </div>
                <div class="blog-details">
                    <h5>${blog.title}</h5>
                    <p>${blog.description}</p>
                    <span class="read-more-span"><a href="blog.html?id=${blog._id}">Read more</a></span>
                </div>
            </div>
                `
    });
    checkToken()
}

onload = ()=> {showBlogs(); checkLoginToken();}


async function checkToken() {
    const token = getCookie("token");
    try{
        const res = await fetch(`${serverLink}/users/check`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        if(res.ok) {
            const data = await res.json();
            if (data.status) {
                document.getElementById("addBlogDiv").style.display = "flex";
                document.getElementById("nameGreater").innerText = `Hello ${data.message.name}, You can now Add a Blog.`;
                document.getElementById("notLoggedIn").style.display = "none";
            }
            else{
                document.getElementById("addBlogDiv").style.display = "none";
                document.getElementById("notLoggedIn").style.display = "flex";
            }
        }
    }
    catch(error){
        console.log("Error during calling API." + error.message)
    } 
}

function getCookie(name) {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
};



async function callAPI(apiLink, apiMethod, apiData, popupToHide = null) {
    console.log("Called")
    const token = getCookie("token");
    if (!token) {
        window.location.href = "/login.html";
        return;
    }
    const res = await fetch(`${serverLink}${apiLink}`, {
        method: apiMethod,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(apiData),
    });
    if (!res.ok) {
        console.error('Failed to call API');
        return false;
    }
    const data = await res.json();
    if (popupToHide) popupToHide.style.display = 'none';
    showBlogs();
    return true;
}

function logoutUser(event) {
    event.preventDefault();
    document.cookie = "token=none; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login.html";
}


async function checkLoginToken() {
    if (getCookie("token")) {
        const links = document.querySelectorAll(".menu a");
        links.forEach(link => {
            if (link.textContent === "Login") {
                link.textContent = "Logout";
                link.href = "#";
                link.addEventListener("click", logoutUser);
            }
        });
    }
}


document.getElementById('addImage').addEventListener('change', function(event) {
    const fileInput = event.target;
    const fileName = fileInput.files[0].name;
    document.getElementById('choosenFileSpan').innerHTML = `<span class="filename">Image name: </span>${truncateName(fileName)}`;
});

function truncateName(name) {
    if (name.length > 15) {
        return name.substr(0, 10) + '...' + name.substr(name.length - 5);
    }
    return name;
}