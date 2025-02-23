import { User } from './User.js';

const drawTableRows = (users) => {
    const tableBody = document.querySelector('#users-table-body');

    tableBody.innerHTML = '';

    users.forEach((user) => {
        const row = document.createElement('tr');
        row.style.fontSize = '18px';

        row.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.isLogedIn ? 'מחובר' : 'מנותק'}</td>
        `;
        const mediaQuery = window.matchMedia('(min-width: 480px) and (max-width: 768px)');
        if (mediaQuery.matches) {
            row.style.fontSize = '14px';
        }
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'התנתקות';

        logoutBtn.addEventListener('click', () => {
            User.logout(user.id);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'מחיקה';
        deleteBtn.addEventListener('click', () => {
            User.removeUser(user.id);
        });

        const editButton = document.createElement('button');
        const editUserContainer = document.querySelector('#editUserContainer');
        editButton.textContent = 'עריכה';
        editButton.addEventListener('click', () => {
            editUserContainer.style.opacity = '1';
            editUserContainer.style.zIndex = '3';
        });

        row.appendChild(logoutBtn);
        row.appendChild(deleteBtn);
        row.appendChild(editButton);
        tableBody.appendChild(row);

        const buttons = document.querySelectorAll('button');
        buttons.forEach((button) => {
            button.style.width = '31%';
            button.style.marginLeft = '5px';

            const mediaQuery = window.matchMedia('(min-width: 480px) and (max-width: 768px)');
            if (mediaQuery.matches) {
                logoutBtn.style.padding = '0';
                logoutBtn.style.paddingLeft = '25px';
                logoutBtn.style.fontSize = '11px';

                deleteBtn.style.padding = '0';
                deleteBtn.style.fontSize = '11px';

                editButton.style.padding = '0';
                editButton.style.fontSize = '11px';

                button.style.marginLeft = '3px';
            }
        });
    });
};
window.onload = drawTableRows(User.usersList);

const registerForm = document.querySelector('.register-form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const users = User.usersList;

    if (users.find((user) => user.email === email)) {
        alert('משתמש עם כתובת דוא"ל זו כבר קיים');
        return;
    }
    new User(firstName, lastName, email, password);
    e.target.reset();
});

const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const user = User.usersList.find((user) => user.email === email);
    if (user && user.password === password) {
        User.login(user.id);
        e.target.reset();
    } else {
        alert('שם משתמש או סיסמה לא נכונים');
        return;
    }
});

const editUserForm = document.querySelector('.edit-user-form');
editUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const editUserContainer = document.querySelector('#editUserContainer');
    const currentEmail = document.querySelector('#current-email').value;
    const currentPassword = document.querySelector('#current-password').value;
    const newEmail = document.querySelector('#new-email').value;
    const newPassword = document.querySelector('#new-password').value;

    const users = User.usersList;
    const user = User.usersList.find((user) => user.email === email && user.password === password);
    if (users.find((user) => user.email === newEmail)) {
        alert('משתמש עם כתובת דוא"ל זו כבר קיים');
        return;
    }
    if (user && user.password === currentPassword && user.email === currentEmail) {
        user.email = newEmail;
        user.password = newPassword;
        e.target.reset();
        editUserContainer.style.opacity = '0';
        editUserContainer.style.zIndex = '-1';
        User.updateUser(user.id);
        User.updatePassword(user.id, user.password);
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const editUserContainer = document.querySelector('#editUserContainer');
        if (editUserContainer) {
            editUserContainer.style.opacity = '0';
            setTimeout(() => {
                editUserContainer.style.zIndex = '-1';
            }, 700);
            const form = document.querySelector('.edit-user-form');
            if (form) form.reset();
        }
    }
});


export { drawTableRows, registerForm, loginForm };