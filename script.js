document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Function to update hero section content
    function updateHeroContent(title, description) {
        document.querySelector('#hero h1').textContent = title;
        document.querySelector('#hero p').textContent = description;
    }

    // Call updateHeroContent with initial content
    updateHeroContent("Welcome to My Portfolio", "I'm Pranav Jha, a ");

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        Email.send({
            SecureToken: "YOUR_SECURE_TOKEN",
            To: 'pranavcr26@gmail.com',
            From: email,
            Subject: `New Contact Form Submission from ${name}`,
            Body: `Name: ${name} <br> Email: ${email} <br> Message: ${message}`
        }).then(
            message => alert("Message sent successfully!")
        );
    });

    // Typing effect
    const phrases = ["Web Developer", "Machine Learning Enthusiast", "Tech Blogger"];
    let currentIndex = 0;
    let isDeleting = false;
    let index = 0;
    const typingText = document.getElementById("typing-text");

    function type() {
        const currentPhrase = phrases[index];
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, currentIndex - 1);
            currentIndex--;
            if (currentIndex <= 0) {
                isDeleting = false;
                index = (index + 1) % phrases.length;
            }
        } else {
            typingText.textContent = currentPhrase.substring(0, currentIndex + 1);
            currentIndex++;
            if (currentIndex >= currentPhrase.length) {
                setTimeout(() => isDeleting = true, 2000);
            }
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }
    type();
});
