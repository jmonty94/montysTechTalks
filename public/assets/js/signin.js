const signInButtonEl = document.getElementById('signInButton');
const signInUsernameEl = document.getElementById('usernameInput');
const signInPasswordEl = document.getElementById('passwordInput');

const signInUser = async (event) => {
    event.preventDefault();
    console.log(`HIT signin.js line 7`);
    const username = signInUsernameEl.value;
    const password = signInPasswordEl.value;

    //validation checks to prevent unecessary API calls
    if (username.trim().length === 0) {
        alert(`Please enter valid credentials`);
        return;
    }
    if (password.trim().length < 6) {
        alert(`Please enter valid credentials`);
    }
    try {
        const response = await fetch(`/api/users/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const responseData = await response.json();
        if (responseData.success) {
            window.location.href = '/';
        } else {
            alert(`Please enter valid credentials`);
        }
    } catch (error) {
        
    }
};
signInButtonEl?.addEventListener('click', signInUser);