const full_name = document.getElementById('fullname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const signUpBtn = document.querySelector('.sign_up_btn')
const dialogContent = document.getElementById('dialog-content')
const dialogIcon = document.querySelector('#dialog-content > span')
const dialogText = document.querySelector('.dialog-text')
signUpBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (full_name.value == '' || email.value == '' || password.value == '') {
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
    } else {
        fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                full_name: full_name.value,
                password: password.value,
                role: 'Thành viên',
                avatar: 'avatar.jpg'
            })
        })
            .then((res) => {
                if (res.ok) {
                    dialogContent.style.display = 'flex';
                    dialogContent.style.backgroundColor = '#6B8A47';
                    dialogContent.style.color = 'white';
                    dialogText.textContent = 'Đăng ký thành công';
                    dialogIcon.innerHTML = '<span class="material-symbols-outlined">check</span>';
                } else if (res.status === 409) {
                    dialogContent.style.display = 'flex';
                    dialogContent.style.backgroundColor = '#C5041B';
                    dialogContent.style.color = 'white';
                    dialogText.textContent = 'Email đã tồn tại';
                    dialogIcon.innerHTML = '<span class="material-symbols-outlined">close</span>';
                } else {
                    throw new Error('Đăng ký thất bại');
                }

                setTimeout(() => {
                    dialogContent.style.display = 'none';
                    dialogContent.style.backgroundColor = '';
                    dialogContent.style.color = '';
                    dialogText.textContent = '';
                    dialogIcon.innerHTML = '';
                }, 4000);
            })
            .catch(error => {
                dialogContent.style.display = 'flex';
                dialogContent.style.backgroundColor = '#C5041B';
                dialogContent.style.color = 'white';
                dialogText.textContent = 'Đăng ký thất bại';
                dialogIcon.innerHTML = '<span class="material-symbols-outlined">close</span>';

                setTimeout(() => {
                    dialogContent.style.display = 'none';
                    dialogContent.style.backgroundColor = '';
                    dialogContent.style.color = '';
                    dialogText.textContent = '';
                    dialogIcon.innerHTML = '';
                }, 4000);
            });
    }
})

