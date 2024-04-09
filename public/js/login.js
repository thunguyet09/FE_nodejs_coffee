const email = document.getElementById('email')
const password = document.getElementById('password')
const loginBtn = document.querySelector('.sign_up_btn')
const dialogContent = document.getElementById('dialog-content')
const dialogIcon = document.querySelector('#dialog-content > span')
const dialogText = document.querySelector('.dialog-text')

loginBtn.addEventListener('click', (e) => {
    e.preventDefault()

    if (email.value == '' || password.value == '') {
        dialogContent.style.display = 'flex'
        dialogContent.style.backgroundColor = '#C5041B';
        dialogContent.style.color = 'white';
        dialogText.textContent = 'Vui lòng nhập đầy đủ thông tin';
        dialogIcon.innerHTML = '<span class="material-symbols-outlined">close</span>';

        setTimeout(() => {
            dialogContent.style.display = 'none'
            dialogContent.style.backgroundColor = '';
            dialogContent.style.color = '';
            dialogText.textContent = '';
            dialogIcon.innerHTML = '';
        }, 4000);
    }else {
        fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            })
        })
        .then(async(res) => {
            if (res.ok) {
                dialogContent.style.display = 'flex';
                dialogContent.style.backgroundColor = '#6B8A47';
                dialogContent.style.color = 'white';
                dialogText.textContent = 'Đăng nhập thành công';
                dialogIcon.innerHTML = '<span class="material-symbols-outlined">check</span>';
                const data = await res.json()
                localStorage.setItem('token', data.token)
                localStorage.setItem('userId', data.user_id)

                setTimeout(() => {
                    dialogContent.style.display = 'none';
                    dialogContent.style.backgroundColor = '';
                    dialogContent.style.color = '';
                    dialogText.textContent = '';
                    dialogIcon.innerHTML = '';
                    if(data.role == 'Thành viên'){
                        document.location.href = '/src/home.html'
                    }
                }, 2000);
            } else if (res.status === 404) {
                dialogContent.style.display = 'flex';
                dialogContent.style.backgroundColor = '#C5041B';
                dialogContent.style.color = 'white';
                dialogText.textContent = 'Không tìm thấy người dùng';
                dialogIcon.innerHTML = '<span class="material-symbols-outlined">close</span>';
            } else if (res.status === 400) {
                dialogContent.style.display = 'flex';
                dialogContent.style.backgroundColor = '#C5041B';
                dialogContent.style.color = 'white';
                dialogText.textContent = 'Mật khẩu không chính xác';
                dialogIcon.innerHTML = '<span class="material-symbols-outlined">close</span>';
            }else {
                throw new Error('Đăng nhập thất bại');
            }

            setTimeout(() => {
                dialogContent.style.display = 'none';
                dialogContent.style.backgroundColor = '';
                dialogContent.style.color = '';
                dialogText.textContent = '';
                dialogIcon.innerHTML = '';
            }, 4000);
        })
    }
})

localStorage.clear()