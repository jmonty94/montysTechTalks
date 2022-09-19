const postTitleEl = document.getElementById(`postTitle`);
const postContentEl = document.getElementById(`postContent`);
const submitButtonEl = document.getElementById(`createPostBtn`);
const modalEl = document.getElementById(`myModal`)

const createPost = async (event) => {
    event.preventDefault();
    console.log(`hit createPost.js line 7`);
    const title = postTitleEl.value;
    const content = postContentEl.value;
    if (title.trim().length === 0 || content.trim().length === 0) {
        alert('Both the title and content sections must be filled in in order to create a new post')
    }
    try {
        const response = await fetch(`/api/posts/`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                title,
                content
            }),
        });
        await response.json();
        window.location.href = '/';
    } catch (error) {
        
    }
};

submitButtonEl?.addEventListener('click', createPost)