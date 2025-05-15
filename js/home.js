document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.isLoggedIn) {
        window.location.href = 'index.html';
        return;
    }

    // Sample data for stories
    const stories = [
        { username: 'user1', image: 'assets/default-profile.jpg' },
        { username: 'user2', image: 'assets/default-profile.jpg' },
        { username: 'user3', image: 'assets/default-profile.jpg' },
        { username: 'user4', image: 'assets/default-profile.jpg' },
        { username: 'user5', image: 'assets/default-profile.jpg' }
    ];

    // Sample data for posts
    const posts = [
        {
            username: 'user1',
            userImage: 'assets/default-profile.jpg',
            postImage: 'assets/post1.jpg',
            likes: 1012,
            description: 'Beautiful sunset!',
            comments: []
        },
        // Add more posts as needed
    ];

    // Render stories
    function renderStories() {
        const storiesContainer = document.querySelector('.stories');
        stories.forEach(story => {
            const storyElement = document.createElement('div');
            storyElement.className = 'story';
            storyElement.innerHTML = `
                <div class="profile-pic">
                    <img src="${story.image}" alt="${story.username}">
                </div>
                <p class="username">${story.username}</p>
            `;
            storiesContainer.appendChild(storyElement);
        });
    }

    // Handle post interactions
    function setupPostInteractions() {
        const posts = document.querySelectorAll('.post');
        posts.forEach(post => {
            const likeBtn = post.querySelector('.reaction-wrapper .fa-heart');
            const commentBtn = post.querySelector('.comment-btn');
            const commentBox = post.querySelector('.comment-box');
            const likesCount = post.querySelector('.likes');

            // Like button functionality
            likeBtn.addEventListener('click', () => {
                likeBtn.classList.toggle('fas');
                likeBtn.classList.toggle('far');
                let likes = parseInt(likesCount.textContent);
                if (likeBtn.classList.contains('fas')) {
                    likes++;
                } else {
                    likes--;
                }
                likesCount.textContent = `${likes} likes`;
            });

            // Comment functionality
            commentBtn.addEventListener('click', () => {
                const comment = commentBox.value.trim();
                if (comment) {
                    const commentsSection = post.querySelector('.post-content');
                    const commentElement = document.createElement('p');
                    commentElement.innerHTML = `<span>${user.username}</span> ${comment}`;
                    commentsSection.insertBefore(commentElement, post.querySelector('.post-time'));
                    commentBox.value = '';
                }
            });
        });
    }

    // Update user profile
    function updateProfile() {
        const profileUsername = document.querySelector('.profile-card .username');
        profileUsername.textContent = user.username;
    }

    // Initialize the page
    function init() {
        renderStories();
        setupPostInteractions();
        updateProfile();
    }

    // Add profile navigation
    const profilePic = document.querySelector('.nav-items .profile-pic');
    profilePic.addEventListener('click', () => {
        window.location.href = 'profile.html';
    });

    // Make profile picture clickable
    profilePic.style.cursor = 'pointer';

    // Add create post functionality
    const createPostBtn = document.querySelector('#create-post-btn');
    createPostBtn.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'create-post-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Create New Post</h2>
                <form id="create-post-form">
                    <input type="file" accept="image/*" required>
                    <textarea placeholder="Write a caption..." required></textarea>
                    <button type="submit">Share</button>
                    <button type="button" class="cancel">Cancel</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        const form = modal.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const caption = form.querySelector('textarea').value;
            const file = form.querySelector('input[type="file"]').files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const newPost = {
                        username: user.username,
                        userImage: 'assets/default-profile.jpg',
                        postImage: event.target.result,
                        likes: 0,
                        description: caption,
                        comments: []
                    };
                    
                    // Add new post to the beginning of posts array
                    posts.unshift(newPost);
                    
                    // Create and insert new post element
                    const postsContainer = document.querySelector('.posts');
                    const postElement = createPostElement(newPost);
                    postsContainer.insertBefore(postElement, postsContainer.firstChild);
                    
                    // Setup interactions for the new post
                    setupPostInteractions();
                };
                reader.readAsDataURL(file);
            }
            
            modal.remove();
        });

        modal.querySelector('.cancel').addEventListener('click', () => {
            modal.remove();
        });
    });

    // Helper function to create post element
    function createPostElement(post) {
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `
            <div class="post-header">
                <div class="profile-pic">
                    <img src="${post.userImage}" alt="">
                </div>
                <p class="username">${post.username}</p>
                <i class="fas fa-ellipsis-h options"></i>
            </div>
            <img src="${post.postImage}" class="post-image" alt="post">
            <div class="post-content">
                <div class="reaction-wrapper">
                    <i class="far fa-heart"></i>
                    <i class="far fa-comment"></i>
                    <i class="far fa-paper-plane"></i>
                    <i class="far fa-bookmark save"></i>
                </div>
                <p class="likes">${post.likes} likes</p>
                <p class="description"><span>${post.username}</span> ${post.description}</p>
                <p class="post-time">Just now</p>
            </div>
            <div class="comment-wrapper">
                <i class="far fa-smile"></i>
                <input type="text" class="comment-box" placeholder="Add a comment...">
                <button class="comment-btn">post</button>
            </div>
        `;
        return div;
    }

    // Add this after the existing initialization code
    const themeToggle = document.querySelector('#theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.classList.toggle('fas', currentTheme === 'dark');
    themeToggle.classList.toggle('far', currentTheme === 'light');
    
    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'light' 
            : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Toggle icon
        themeToggle.classList.toggle('fas');
        themeToggle.classList.toggle('far');
    });
    init();
});