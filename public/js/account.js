import { getUser } from "./api.js";

const userId = localStorage.getItem('userId')
const user = await getUser(userId)
const avatar = document.querySelector('.avatar')
const imgAvatar = document.createElement('img')
imgAvatar.src = `/public/img/${user.avatar}`
imgAvatar.width = 50
imgAvatar.height = 50
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

