const deleteBtn = document.getElementById(`deleteBtn`);
const editBtn = document.getElementById(`editBtn`);

const deleteConfirm = (event) => {
    event.preventDefault();
    if (confirm('Are you sure you would like to proceed')) {
        deletePost();
    }
}

const deletePost = async () => {
    const postId = window.location.pathname.split('/').pop();
    const postUser = window.location.pathname.split('/').at(2)
    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                postId
            }),
        });
        await response.json();
        window.location = `/users/${postUser}`;
    } catch (error) {
        alert(error)
    }
};

const updatePost = async (event) => {
    event.preventDefault();
    const postId = window.location.pathname.split('/').pop();
    const postUser = window.location.pathname.split('/').at(1)
    console.log(postUser);
    window.location.href= `/${postUser}/update/${postId}`;
}

deleteBtn?.addEventListener('click', deleteConfirm);
editBtn?.addEventListener('click', updatePost);