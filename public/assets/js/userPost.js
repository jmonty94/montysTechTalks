const deleteBtn = document.getElementById(`deleteBtn`);
const editBtn = document.getElementById(`editBtn`);

const deletePost = async (event) => {
    event.preventDefault();
    const postId = window.location.pathname.split('/').pop();
    try {
        const response = await fetch(`/api/post/${postId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                postId: postId
            }),
        });
        await response.json();
        window.location = '/';
    } catch (error) {
        alert(error)
    }
};

const updatePost = async (event) => {
    event.preventDefault();
    const postId = window.location.pathname.split('/').pop();
    try {
        const response = await fetch(`/api/post/${postId}`, {
            method: 'PUT',
            
        })
    } catch (error) {
        alert(error)
    }
}

deleteBtn?.addEventListener('click', deletePost);