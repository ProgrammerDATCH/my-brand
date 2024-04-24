const blogTitle = document.getElementById("blogTitle");
// const blogDescription = document.getElementById("blogDescription");
const blogImage = document.getElementById("blogImage");
const introDivs = document.querySelectorAll(".introDiv");


const showBlogDetails = async () => {
    const isValidObjectId = /^[0-9a-fA-F]{24}$/;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id || !isValidObjectId.test(id)) {
        window.location.href = '/blogs.html';
        return;
    }

    const res = await fetch(`http://localhost:9090/api/blog/blog/${id}`);
    if (!res.ok) {
        console.log("Send API Failed!");
        return;
    }
    const blog = await res.json();
    blogTitle.innerText = blog.message.title;
    // blogDescription.innerText = blog.message.description;
    blogImage.src = blog.message.image;
    introDivs.forEach(element => {
        element.innerText = blog.message.description;
    });

}

onload = showBlogDetails()