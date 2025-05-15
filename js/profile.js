document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.isLoggedIn) {
        window.location.href = 'index.html';
        return;
    }

    // Update profile information
    const username = document.querySelector('.profile-username');
    const profileName = document.querySelector('.profile-name');
    const profileImage = document.querySelector('.profile-image img');
    
    username.textContent = user.username;
    profileName.textContent = user.fullName || user.username;
    
    // Sample posts data
    const posts = [
        { image: 'assets/post1.jpg', likes: 123, comments: 12 },
        { image: 'assets/post2.jpg', likes: 456, comments: 34 },
        { image: 'assets/post3.jpg', likes: 789, comments: 56 }
    ];

    // Render posts grid
    function renderPosts() {
        const postsGrid = document.querySelector('.posts-grid');
        postsGrid.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post-item';
            postElement.innerHTML = `
                <img src="${post.image}" alt="Post">
                <div class="post-overlay">
                    <div class="post-stats">
                        <span><i class="fas fa-heart"></i> ${post.likes}</span>
                        <span><i class="fas fa-comment"></i> ${post.comments}</span>
                    </div>
                </div>
            `;
            postsGrid.appendChild(postElement);
        });
    }

    // Handle tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
        });
    });

    // Handle edit profile button
    const editProfileBtn = document.querySelector('.edit-profile');
    editProfileBtn.addEventListener('click', () => {
        // Create modal for editing profile
        const modal = document.createElement('div');
        modal.className = 'edit-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Edit Profile</h2>
                <form id="edit-profile-form">
                    <input type="text" placeholder="Name" value="${user.fullName || ''}" name="fullName">
                    <textarea placeholder="Bio" name="bio">${user.bio || ''}</textarea>
                    <button type="submit">Save</button>
                    <button type="button" class="cancel">Cancel</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        // Handle form submission
        const form = modal.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            user.fullName = formData.get('fullName');
            user.bio = formData.get('bio');
            localStorage.setItem('user', JSON.stringify(user));
            profileName.textContent = user.fullName;
            document.querySelector('.bio-text').textContent = user.bio;
            modal.remove();
        });

        // Handle cancel button
        modal.querySelector('.cancel').addEventListener('click', () => {
            modal.remove();
        });
    });

    // Initialize posts
    renderPosts();

    // Add dark theme functionality
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
});