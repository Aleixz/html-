    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    const users = [ // 用户列表
      { username: '2223677155', password: '2223677155', link: 'rzc/v19.html' },
      { username: '978781465', password: '978781465', link: 'https://www.4399.com' },
      { username: '12345', password: '12345', link: 'https://www.google.com' }
    ];

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const username = form.username.value;
      const password = form.password.value;

      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        window.location.href = user.link;
      } else {
        errorMessage.textContent = '用户名或密码错误，请重新输入。';
      }
    });