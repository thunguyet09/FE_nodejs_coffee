import { getUser } from "./api.js";
const userId = localStorage.getItem('userId')
const dialogContent = document.getElementById('dialog-content')
const dialogIcon = document.querySelector('#dialog-content > span')
const dialogText = document.querySelector('.dialog-text')
const list = document.querySelector('.sub-list')
const getAPI_Profile = async () => {
    list.childNodes[1].id = 'active-list'
    const user = await getUser(userId)
    showInfo(user)
}

const avatar = document.querySelector('.avatar')
const showInfo = (user) => {
    avatar.innerHTML = ''
    const imgAvatar = document.createElement('img')
    imgAvatar.src = `/public/img/${user.avatar}`
    imgAvatar.width = 60
    imgAvatar.height = 60
    avatar.appendChild(imgAvatar)
    const user_name = document.createElement('div')
    avatar.appendChild(user_name)
    const full_name = document.createElement('h5')
    full_name.textContent = user.full_name
    user_name.appendChild(full_name)
    const changeInfoBtn = document.createElement('button')
    changeInfoBtn.className = 'changeInfoBtn'
    changeInfoBtn.innerHTML = `
        <span class="material-symbols-outlined">edit</span> 
        <span>Sửa Hồ Sơ</span>
    `
    user_name.appendChild(changeInfoBtn)


    const email = document.getElementById('email')
    const phone = document.getElementById('phone')
    email.innerHTML = user.email
    if(user.phone){
        phone.innerHTML = user.phone
    }else{
        phone.innerHTML = `<input type="number" id="phone-input">`
    }

    const currentImg = document.querySelector('.currentImg')
    currentImg.width = 100
    currentImg.height = 100
    currentImg.src = `/public/img/${user.avatar}`

    const saveBtn = document.querySelector('.save-info > button')
    const name = document.getElementById('full_name')
    name.value = user.full_name

    const gender = document.querySelectorAll('.gender')
    let genderChecked = ''
    gender.forEach((item) => {
        item.addEventListener('click', (e) => {
            gender.forEach((val) => {
                val.checked = false;
            })
            e.target.checked = true;
            genderChecked = e.target.value
        })
    })

    const address = document.getElementById('address')
    if(user.address){
        address.value = user.address
    }
    
    if(user.gender == 'male'){
        gender[0].checked = true
    }else if(user.gender == 'female'){
        gender[1].checked = true
    }else if(user.gender == 'other'){
        gender[2].checked = true
    }

    const avatarFile = document.querySelector('.avatarFile')
    avatarFile.addEventListener('change', () => {
        currentImg.src = `/public/img/${avatarFile.files[0].name}`
    })
    saveBtn.addEventListener('click', async () => {
        let img = ''
        if(avatarFile.files[0]){
            img = avatarFile.files[0].name
        }else{
            img = user.avatar
        }
        const updateInfo = {
            full_name: name.value,
            gender: genderChecked,
            address: address.value,
            currentImg: user.avatar,
            avatar: img
        }
        await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateInfo)
        })
        .then(() => {
            dialogContent.style.display = 'flex';
            dialogContent.style.backgroundColor = '#6B8A47';
            dialogContent.style.color = 'white';
            dialogText.textContent = 'Thông tin của bạn đã được cập nhật';
            dialogIcon.innerHTML = `<span class="material-symbols-outlined">done</span>`;

            setTimeout(() => {
                getAPI_Profile()
                dialogContent.style.display = 'none';
                dialogContent.style.backgroundColor = '';
                dialogContent.style.color = '';
                dialogText.textContent = '';
                dialogIcon.innerHTML = '';
            }, 2000)
        })
    })
}

getAPI_Profile()

const changePasswordBtn = list.childNodes[3]
const accountRow = document.querySelector('.account-row')

changePasswordBtn.addEventListener('click', (e) => {
    accountRow.innerHTML = ''
    changePassword()
})

const changePassword = async () => {
    const user = await getUser(userId)
    list.childNodes.forEach((item) => {
        if (item.nodeType === Node.ELEMENT_NODE) {
            item.removeAttribute('id');
        }
    });
    list.childNodes[3].id = 'active-list'
    const accountBox = document.createElement('div')
    accountBox.className = 'authenticateBox'
    accountRow.appendChild(accountBox)
    const authenticateImg = document.createElement('img')
    authenticateImg.width = 110
    authenticateImg.src = `/public/img/authenticate.svg`
    accountBox.appendChild(authenticateImg)
    const authenticateText = document.createElement('h4')
    authenticateText.textContent = 'Để tăng cường bảo mật cho tài khoản của bạn, hãy xác minh thông tin bằng một trong những cách sau.'
    accountBox.appendChild(authenticateText)
    const authenticateBtn = document.createElement('button')
    authenticateBtn.innerHTML = `
        <span class="material-symbols-outlined">
            mail
        </span>
        <h4>Xác minh bằng liên kết Email</h4>
    `
    accountBox.appendChild(authenticateBtn)

    authenticateBtn.addEventListener('click', async () => {
        await fetch(`http://localhost:3000/api/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                id: user._id,
            })
        })
        .then(() => {
            OTPauthenticate()
        })
    })
}   

const OTPauthenticate = async () => {
    list.childNodes.forEach((item) => {
        if (item.nodeType === Node.ELEMENT_NODE) {
            item.removeAttribute('id');
        }
    });
    list.childNodes[3].id = 'active-list'

    const user = await getUser(userId)
    const email_slice = user.email.slice(3, user.email.length)
    const currentDate = new Date()
    let minutes = 60;
    setTimeout(() => {
        minutes--;
    }, 1000)
    accountRow.innerHTML = ''
    const accountBox = document.createElement('div')
    accountBox.className = 'authenticateOTP'
    accountRow.appendChild(accountBox)
    const authenticateImg = document.createElement('img')
    authenticateImg.width = 130
    authenticateImg.src = `/public/img/auth1.svg`
    accountBox.appendChild(authenticateImg)
    const authenticateTitle = document.createElement('h3')
    authenticateTitle.className = 'authenticateTitle'
    authenticateTitle.textContent = 'Xác thực OTP'
    accountBox.appendChild(authenticateTitle)
    const authenticateText = document.createElement('p')
    authenticateText.innerHTML = `Vui lòng nhập mã số chúng tôi đã gửi cho bạn qua email ***${email_slice}. Mã xác thực có giá trị trong ${minutes}s`
    accountBox.appendChild(authenticateText)
    setInterval(() => {
        minutes--;
        authenticateText.innerHTML = `Vui lòng nhập mã số chúng tôi đã gửi cho bạn qua email ***${email_slice}. Mã xác thực có giá trị trong ${minutes}s`;
        if(minutes == 0){
            accountRow.innerHTML = ''
            changePassword()
        }
    }, 1000);

    const authenticateInput = document.createElement('input')
    authenticateInput.type = 'number'
    authenticateInput.className = 'authenticateInput'
    accountBox.appendChild(authenticateInput)
    const authenticateBtn = document.createElement('button')
    authenticateBtn.className = 'continueBtn'
    authenticateBtn.textContent = 'Tiếp tục'
    accountBox.appendChild(authenticateBtn)
    const sendBackOtp = document.createElement('div')
    sendBackOtp.className = 'sendBackOTP'
    accountBox.appendChild(sendBackOtp)
    const sendBackText = document.createElement('span')
    sendBackText.textContent = 'Bạn chưa nhận được mã?'
    sendBackOtp.appendChild(sendBackText)
    const sendBackBtn = document.createElement('button')
    sendBackBtn.textContent = 'Gửi lại OTP'
    sendBackOtp.appendChild(sendBackBtn)
    authenticateBtn.addEventListener('click', () => {
        if(authenticateInput.value == user.otp){
            resetPassword()
            clearInterval()
        }else{
            dialogContent.style.display = 'flex';
            dialogContent.style.backgroundColor = '#C5041B';
            dialogContent.style.color = 'white';
            dialogText.textContent = 'Mã OTP không chính xác';
            dialogIcon.innerHTML = `<span class="material-symbols-outlined">close</span>`;

            setTimeout(() => {
                dialogContent.style.display = 'none';
                dialogContent.style.backgroundColor = '';
                dialogContent.style.color = '';
                dialogText.textContent = '';
                dialogIcon.innerHTML = '';
            }, 2000)
        }
    })
    
}
const accountTitle = document.querySelector('.account-title > h3')
const accountSub = document.querySelector('.account-title > p')
const resetPassword = async () => {
    list.childNodes.forEach((item) => {
        if (item.nodeType === Node.ELEMENT_NODE) {
            item.removeAttribute('id');
        }
    });
    list.childNodes[3].id = 'active-list'

    const user = await getUser(userId)
    accountTitle.innerHTML = 'Đổi mật khẩu'
    accountSub.innerHTML = 'Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác'
    accountRow.innerHTML = ''
    const accountBox = document.createElement('div')
    accountBox.className = 'resetPassBox'
    accountRow.appendChild(accountBox)
    const newPassword = document.createElement('div')
    newPassword.className = 'groupControl'
    accountBox.appendChild(newPassword)
    const newPassLabel = document.createElement('label')
    newPassLabel.textContent = 'Mật khẩu mới'
    newPassword.appendChild(newPassLabel)
    const newPassInput = document.createElement('input')
    newPassInput.type = 'password'
    newPassword.appendChild(newPassInput)
    const authPassword = document.createElement('div')
    authPassword.className = 'groupControl'
    accountBox.appendChild(authPassword)
    const authPassLabel = document.createElement('label')
    authPassLabel.textContent = 'Xác nhận mật khẩu'
    authPassword.appendChild(authPassLabel)
    const authPassInput = document.createElement('input')
    authPassInput.type = 'password'
    authPassword.appendChild(authPassInput)
    const authPassBtn = document.createElement('div')
    authPassBtn.className = 'informedPassBtn'
    accountBox.appendChild(authPassBtn)
    const informedPassBtn = document.createElement('button')
    informedPassBtn.textContent = 'Xác Nhận'
    authPassBtn.appendChild(informedPassBtn)

    informedPassBtn.addEventListener('click', async () => {
        if(authPassInput.value !== newPassInput.value){
            dialogContent.style.display = 'flex';
            dialogContent.style.backgroundColor = '#C5041B';
            dialogContent.style.color = 'white';
            dialogText.textContent = 'Xác nhận mật khẩu không trùng khớp';
            dialogIcon.innerHTML = `<span class="material-symbols-outlined">close</span>`;

            setTimeout(() => {
                dialogContent.style.display = 'none';
                dialogContent.style.backgroundColor = '';
                dialogContent.style.color = '';
                dialogText.textContent = '';
                dialogIcon.innerHTML = '';
            }, 2000)
        }else{
            await fetch(`http://localhost:3000/api/users/password/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: newPassInput.value
                })
            })
            .then(() => {
                dialogContent.style.display = 'flex';
                dialogContent.style.backgroundColor = '#6B8A47';
                dialogContent.style.color = 'white';
                dialogText.textContent = 'Mật khẩu đã thay đổi thành công.';
                dialogIcon.innerHTML = `<span class="material-symbols-outlined">done</span>`;

                setTimeout(() => {
                    dialogContent.style.display = 'none';
                    dialogContent.style.backgroundColor = '';
                    dialogContent.style.color = '';
                    dialogText.textContent = '';
                    dialogIcon.innerHTML = '';
                }, 2000)
            })
        }
    })
}
