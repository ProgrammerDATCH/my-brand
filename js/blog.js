const serverLink = 'https://mybrandbackend-4e8h.onrender.com/api';

const blogTitle = document.getElementById("blogTitle");
const blogImage = document.getElementById("blogImage");
const introDivs = document.querySelectorAll(".introDiv");


const showBlogDetails = async () => {
    const isValidObjectId = /^[0-9a-fA-F]{24}$/;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id || !isValidObjectId.test(id)) {
        window.location.href = '/my-brand/blogs.html';
        return;
    }

    const res = await fetch(`${serverLink}/blog/blog/${id}`);
    if (!res.ok) {
        console.log("Send API Failed!");
        return;
    }
    const blog = await res.json();
    blogTitle.innerText = blog.message.title;
    blogImage.src = blog.message.image;
    introDivs.forEach(element => {
        element.innerText = blog.message.description;
    });

}

onload = showBlogDetails()