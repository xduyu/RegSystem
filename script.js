const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const usernameInputRegister = document.getElementById('username');
const emailInputRegister = document.getElementById('email');
const passwordInputRegister = document.getElementById('password');
const confirmPasswordInputRegister = document.getElementById('confirm-password');
const usernameInputLogin = document.getElementById('username-login');
const passwordInputLogin = document.getElementById('password-login');
const errorMessageRegister = document.getElementById('error-message-register');
const errorMessageLogin = document.getElementById('error-message-login');

// Функция для открытия вкладок
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    const tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

// Получаем данные из localStorage
const users = JSON.parse(localStorage.getItem('users')) || {};

// Обработка формы регистрации
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInputRegister.value.trim();
    const email = emailInputRegister.value.trim();
    const password = passwordInputRegister.value.trim();
    const confirmPassword = confirmPasswordInputRegister.value.trim();

    if (username === '' || email === '' || password === '' || confirmPassword === '') {
        errorMessageRegister.textContent = 'Пожалуйста, заполните все поля';
        return;
    }

    if (password !== confirmPassword) {
        errorMessageRegister.textContent = 'Пароли не совпадают';
        return;
    }

    // Проверка на существование пользователя
    if (users[username]) {
        errorMessageRegister.textContent = 'Пользователь с таким именем уже существует';
        return;
    }

    // Создаем нового пользователя
    users[username] = {
        email: email,
        password: password
    };

    // сохраяем данные в localStorage
    localStorage.setItem('users', JSON.stringify(users));

    console.log('Регистрация успешна!');
    // Здесь можно добавить код для отправки данных на сервер
});

// Обработка формы логина
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInputLogin.value.trim();
    const password = passwordInputLogin.value.trim();

    if (username === '' || password === '') {
        errorMessageLogin.textContent = 'Пожалуйста, заполните все поля';
        return;
    }

    // Проверка на существование пользователя
    if (!users[username]) {
        errorMessageLogin.textContent = 'Пользователь не найден';
        return;
    }

    // Проверка пароля
    if (users[username].password !== password) {
        errorMessageLogin.textContent = 'Неверный пароль';
        return;
    }

    console.log('Вход успешен!');
    // Перенаправляем на YouTube
    window.location.href = 'https://www.youtube.com';
});