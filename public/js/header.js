import { getUser } from "./api.js";
import { getCartByUserId } from "./api.js";
import { getDetailProduct } from "./api.js";
const header = document.getElementById('header')
const dialogContent = document.getElementById('dialog-content')
const dialogIcon = document.querySelector('#dialog-content > span')
const dialogText = document.querySelector('.dialog-text')

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
        <a href="/src/cart.html">
            <p class="numsInCart"></p>
            <span class="material-symbols-outlined">
                local_mall
            </span>
        </a>
        <ul id="cartBox"></ul>
    </div>
</div>
`


const header_btns = document.querySelector('.subHeader_btns')
// function getCookie(name) {
//     const cookieString = document.cookie;
//     const cookies = cookieString.split(';');
  
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
  
//       // Check if the cookie starts with the provided name
//       if (cookie.startsWith(name + '=')) {
//         // Extract and return the cookie value
//         return cookie.substring(name.length + 1);
//       }
//     }
  
//     // Cookie not found
//     return null;
//   }
  
//   const token = getCookie('_jwt');
//   const userId = getCookie('id')
const token = localStorage.getItem('token')
const userId = localStorage.getItem('userId')
if(token){
    const data = await getUser(userId)
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
            <li class="logout"><a>
                <span class="material-symbols-outlined">
                    logout
                </span>
                <p>Log Out</p>
            </a></li>
          `
          header_btns.appendChild(ul)
          ul.childNodes[5].addEventListener('click', () => {
                localStorage.clear()
                window.location.href = '/src/home.html'
          })
          ul.childNodes[3].addEventListener('click', () => {
            window.location.href = './order.html'
          })
    const languages = document.createElement('div')
        languages.className = 'languages'
        languages.innerHTML = `
            <span class="material-symbols-outlined">
                arrow_drop_down
            </span>
            <img width="35px" height="30px" src="/public/img/vietnam.png">
        `
        header_btns.appendChild(languages)

}else {
    const loginBtn = document.createElement('button')
        loginBtn.className = 'loginBtn'
        loginBtn.textContent = 'Đăng nhập'
        loginBtn.addEventListener('click', () => {
            window.location.href = '/src/login.html'
        })
        header_btns.appendChild(loginBtn)
    const signupBtn = document.createElement('button')
        signupBtn.className = 'signUpBtn'
        signupBtn.textContent = 'Đăng ký'
        signupBtn.addEventListener('click', () => {
            window.location.href = '/src/register.html'
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


export const numsInCart = async () => {
    const numsInCart = document.querySelector('.numsInCart')
    const cart = await getCartByUserId(userId)
    numsInCart.innerHTML = `(${cart.length})`
}

numsInCart()

export const getCart = async () => {
    const data = await getCartByUserId(userId)
    showCart(data)
}
export async function showCart(data){
    const cartBox = document.getElementById('cartBox')
    cartBox.innerHTML = ''
    data.forEach(async (item) => {
        const product = await getDetailProduct(item.prod_id)

        const itemCart = document.createElement('li')
        cartBox.appendChild(itemCart)

        const imgCart = document.createElement('img')
        imgCart.src = `/public/img/${product.img_url}`
        imgCart.width = '100'
        imgCart.height = '100'
        itemCart.appendChild(imgCart)

        const itemBox = document.createElement('div')
        itemBox.className = 'itemBox'
        let price = 0;
        if(item.size == 'M'){
            price = product.price
        }else{
            price = product.price + 20000
        }
        itemBox.innerHTML = `
            <div>
                <h4>${product.name}</h4>
                <span class="material-symbols-outlined">
                    close
                </span>
            </div>
            <span>Quantity: ${item.quantity} / Size: ${item.size}</span>
            <p>${price.toLocaleString()}&#8363;</p>
        `
        itemCart.appendChild(itemBox)
        itemBox.childNodes[1].childNodes[3].addEventListener('click', async() => {
            await fetch(`http://localhost:3000/api/cart/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
                dialogContent.style.backgroundColor = '#6B8A47'
                dialogIcon.innerHTML = `<span class="material-symbols-outlined">shopping_bag</span>`
                dialogText.textContent = 'Sản phẩm đã được xoá khỏi giỏ hàng';
                dialogContent.style.display = 'flex'
                setTimeout(() => {
                    dialogContent.style.display = 'none'
                }, 5000)
                getCart()
                numsInCart()
            })
        })
    })
}

getCart()