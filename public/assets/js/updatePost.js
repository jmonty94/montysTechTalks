const postTitleEl = document.getElementById(`postTitle`);
const postContentEl = document.getElementById(`postContent`);
const updatePostBtn = document.getElementById(`updatePostBtn`);

const updatePost = async (event) => {
    event.preventDefault();
    const title = postTitleEl.value;
    const content = postContentEl.value;
    const username = window.location.pathname.split('/').at(1);
    const postId = window.location.pathname.split('/').pop();
    if (title.trim().length === 0 || content.trim().length === 0) {
        alert('Both the title and content sections must be filled in in order to create a new post')
    }
    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: `PUT`,
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                title,
                content
            }),
        });
        await response.json();
        window.location.href = `/${username}`;
    } catch (error) {
        alert(error)
    }
};

updatePostBtn?.addEventListener('click', updatePost)