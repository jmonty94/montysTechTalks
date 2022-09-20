const newPostBtn = document.getElementById(`newPostBtn`);

const goToCreatePostPage = (event) => {
    event.preventDefault();
    window.location.href = '/createPost';
};


newPostBtn?.addEventListener('click', goToCreatePostPage);