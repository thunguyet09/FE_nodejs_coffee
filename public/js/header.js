const header = document.getElementById('header')

header.innerHTML = `
<div class="subHeader">
    <div class="subHeader_info">
        <div>
            <span class="material-symbols-outlined">
                call
            </span>
            <span>(+84) 935-695-626</span>
        </div>

        <div>
            <span class="material-symbols-outlined">
                location_on
            </span>
            <span>Hồ Chí Minh, Việt Nam</span>
        </div>
    </div>
    <div class="subHeader_btns"></div>
</div>

<div class="mainHeader">
    <img src="/public/img/logo.png">

    <ul class="nav">
        <li><a href="/src/home.html" id="active">TRANG CHỦ</a></li>
        <li><a href="/src/products.html">SẢN PHẨM</a></li>
        <li><a href="">TIN TỨC</a></li>
        <li><a href="">LIÊN HỆ</a></li>
    </ul>

    <div class="shoppingCart">
        <i class="fa-solid fa-magnifying-glass"></i>
        <a>
            <p>(0)</p>
            <span class="material-symbols-outlined">
                local_mall
            </span>
        </a>
        <ul id="cartBox"></ul>
    </div>
</div>
`


const header_btns = document.querySelector('.subHeader_btns')
function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
  
      // Check if the cookie starts with the provided name
      if (cookie.startsWith(name + '=')) {
        // Extract and return the cookie value
        return cookie.substring(name.length + 1);
      }
    }
  
    // Cookie not found
    return null;
  }
  
  const token = getCookie('_jwt');
  const userId = getCookie('id')
  

if(token){
    const response = await fetch('http://localhost:3000/users/api')
    const data = await response.json()
    const imgAvatar = document.createElement('img')
        imgAvatar.src = '/public/img/avatar.jpg'
        imgAvatar.width = '50'
        imgAvatar.height = '50'
        header_btns.appendChild(imgAvatar)
    const avatar = document.createElement('div')
        avatar.className = 'avatarBox'
        header_btns.appendChild(avatar)
    const userName = document.createElement('h4')
        userName.textContent = data.full_name
        avatar.appendChild(userName)
    const role_down = document.createElement('div')
        role_down.className = 'role_down'
        updateRoleContent()
        avatar.appendChild(role_down)

        avatar.addEventListener('mouseenter', () => {
            updateRoleContent('keyboard_arrow_up')
        })
        avatar.addEventListener('mouseleave', () => {
            updateRoleContent()
        })

        function updateRoleContent(symbol = 'stat_minus_1') {
            role_down.innerHTML = `
              <span>${data.role}</span>
              <span class="material-symbols-outlined">
                ${symbol}
              </span>
            `;
          }
          
    const ul = document.createElement('ul')
          ul.className = 'subAvatar'
          ul.innerHTML = `
            <li><a>
                <span class="material-symbols-outlined">
                    id_card
                </span>
                <p>Account</p>
            </a></li>
            <li class="order"><a>
                <span class="material-symbols-outlined">
                    list_alt
                </span>
                <p>Order</p>
            </a></li>
            <li class="logout"><a href="/logout">
                <span class="material-symbols-outlined">
                    logout
                </span>
                <p>Log Out</p>
            </a></li>
          `
          header_btns.appendChild(ul)
          ul.childNodes[5].addEventListener('click', () => {
                localStorage.clear()
                window.location.href = '/'
          })
          ul.childNodes[3].addEventListener('click', () => {
            window.location.href = './order.html'
          })
    const languages = document.createElement('div')
        languages.className = 'languages'
        languages.innerHTML = `
            <i class="fa-solid fa-caret-down"></i>
            <img width="35px" height="30px" src="/public/img/vietnam.png">
        `
        header_btns.appendChild(languages)

}else {
    const loginBtn = document.createElement('button')
        loginBtn.className = 'loginBtn'
        loginBtn.textContent = 'Đăng nhập'
        loginBtn.addEventListener('click', () => {
            window.location.href = '/users/login'
        })
        header_btns.appendChild(loginBtn)
    const signupBtn = document.createElement('button')
        signupBtn.className = 'signUpBtn'
        signupBtn.textContent = 'Đăng ký'
        signupBtn.addEventListener('click', () => {
            window.location.href = '/users/register'
        })
        header_btns.appendChild(signupBtn)
    const languages = document.createElement('div')
        languages.className = 'languages'
        languages.innerHTML = `
            <i class="fa-solid fa-caret-down"></i>
            <img width="35px" height="30px" src="/public/img/vietnam.png">
        `
        header_btns.appendChild(languages)
}