const sendMail = () => {
    let params = {
        from_name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    }
    emailjs.send('service_c6ysp0t', 'template_pgl2jxb', params).then(
        alert('Email sent successfully!'));
    ['fullName', 'email', 'phone', 'message'].forEach(id => document.getElementById(id).value = '');
}

document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.querySelector('#works .stars');
    const rows = 10;
    const cols = 10;

    const cellWidth = 98 / cols;
    const cellHeight = 98 / rows;
    const margin = 1;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const starsInCell = 1 + Math.floor(Math.random() * 2);

            for (let i = 0; i < starsInCell; i++) {
                const star = document.createElement('div');
                star.classList.add('star');


                const offsetX = Math.random() * (cellWidth * 0.8);
                const offsetY = Math.random() * (cellHeight * 0.8);

                star.style.left = `${margin + col * cellWidth + offsetX}%`;
                star.style.top = `${margin + row * cellHeight + offsetY}%`;

                const delay = ((row * cols + col) % 3) * 0.5;
                star.style.animationDelay = `${delay}s`;

                starsContainer.appendChild(star);
            }
        }
    }
});