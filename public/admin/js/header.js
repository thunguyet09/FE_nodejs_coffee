const showHeader = () => {
    const header = document.getElementById('header')
    header.innerHTML = `
    <div>
    <img src="/public/img/logo.png">
    </div>

    <div class="header_row2">
    <div class="pallete">
        <div>
            <span class="material-symbols-outlined">
                palette
            </span>
            <p>Chủ đề</p>
        </div>

        <div class="palleteBox">
            <div>
                <p class="yellow"></p>
                <p class="pink"></p>
                <p class="blue"></p>
            </div>

            <div>
                <p class="green"></p>
                <p class="purple"></p>
                <p class="light-blue"></p>
            </div>
            <div>
                <p class="nude"></p>
                <p class="grey"></p>
                <p class="violet"></p>
            </div>
        </div>
    </div>

    <div class="bell">
        <span class="material-symbols-outlined">
            notifications_active
        </span>
    </div>

    <div class="avatar">
        <div class="avatarBox">
            <img src="/public/img/avatar.webp">
            <div>
                <h4 class="user_name">Emma Jason</h4>
                <p class="admin_down"> 
                    <span class="admin_title">Admin</span>
                    <span id="downIcon" class="material-symbols-outlined">
                        stat_minus_1
                    </span>
                </p>
            </div>
        </div>

        <ul>
            <li><a>
                <i class="fa-regular fa-user"></i>
                <p>Account</p>
            </a></li>

            <li><a>
                <i class="fa-regular fa-envelope"></i>
                <p>Inbox</p>
            </a></li>

            <li class="logoutBtn"><a>
                <span class="material-symbols-outlined">
                    logout
                </span>
                <p>Log Out</p>
            </a></li>
        </ul>
    </div>
    </div>
    </div>

    <div class="sidebar">
        <span id="sidebar_next" class="material-symbols-outlined">
        menu_open
        </span>
    <ul class="sidebar-wrapper">
    <h4>GENERAL</h4>
    <li class="general">
        <a class="activeLink">
            <div class="menu-link">
                <span class="material-symbols-outlined">
                    home
                </span>
                <p>Dashboard</p>
            </div>
            <div>
                <span class="material-symbols-outlined">
                    keyboard_arrow_right
                </span>
            </div>
        </a>

        <ul class="general_submenu">
            <li class="active"><a href="/admin">Default</a></li>
            <li><a>E-Commerce</a></li>
        </ul>
    </li>

    <hr>
    <h4>APPLICATIONS</h4>
    <li class="apps">
        <a>
            <div class="menu-link">
                <span class="material-symbols-outlined">
                    storefront
                </span>
                <p>Ecommerce</p>
            </div>
            <div>
                <span class="material-symbols-outlined">
                    keyboard_arrow_right
                </span>
            </div>
        </a>

        <ul class="general_submenu">
            <li><a>Category</a></li>
            <li class="product-page"><a href="/src/admin/products.html">Products</a></li>
        </ul>
    </li>

    <li class="apps">
        <a>
            <div class="menu-link">
                <span class="material-symbols-outlined">
                    manage_accounts
                </span>
                <p>Users</p>
            </div>
            <div>
                <span class="material-symbols-outlined">
                    keyboard_arrow_right
                </span>
            </div>
        </a>

        <ul class="general_submenu">
            <li><a href="/admin/users">User Edit</a></li>
        </ul>
    </li>

    <li class="apps">
        <a>
            <div class="menu-link">
                <span class="material-symbols-outlined">
                    payments
                </span>
                <p>Transaction</p>
            </div>
            <div>
                <span class="material-symbols-outlined">
                    keyboard_arrow_right
                </span>
            </div>
        </a>

        <ul class="general_submenu">
            <li><a>Invoice</a></li>
            <li><a>Sales</a></li>
            <li><a>Return</a></li>
        </ul>
    </li>

    <li class="apps">
        <a>
            <div class="menu-link">
                <i class="fa-solid fa-square-poll-vertical"></i>
                <p>Analysis</p>
            </div>
            <div>
                <span class="material-symbols-outlined">
                    keyboard_arrow_right
                </span>
            </div>
        </a>

        <ul class="general_submenu">
            <li><a>Products</a></li>
            <li><a>Users</a></li>
        </ul>
    </li>

    <li class="apps">
        <a>
            <div class="menu-link" id="comment">
                <span class="material-symbols-outlined">
                    mark_unread_chat_alt
                </span>
                <p>Comments</p>
            </div>
        </a>
    </li>
    </ul>
    </div>

    <div class="mini_sidebar">
    <span id="menu_icon" class="material-symbols-outlined">
    menu
    </span>
    <ul class="mini_wrapper">
    <li>
        <a>
            <span class="material-symbols-outlined">
                home
            </span>

            <span class="material-symbols-outlined">
                keyboard_arrow_right
            </span>
        </a>
    </li>

    <li>
        <a>
            <span class="material-symbols-outlined">
                storefront
            </span>

            <span class="material-symbols-outlined">
                keyboard_arrow_right
            </span>
        </a>
    </li>

    <li>
        <a>
            <span class="material-symbols-outlined">
                manage_accounts
            </span>

            <span class="material-symbols-outlined">
                keyboard_arrow_right
            </span>
        </a>
    </li>

    <li>
        <a>
            <span class="material-symbols-outlined">
                payments
            </span>

            <span class="material-symbols-outlined">
                keyboard_arrow_right
            </span>
        </a>
    </li>

    <li>
        <a>
            <i class="fa-solid fa-square-poll-vertical"></i>

            <span class="material-symbols-outlined">
                keyboard_arrow_right
            </span>
        </a>
    </li>

    <li>
        <a>
            <span class="material-symbols-outlined" style="font-size: 22px;">
                mark_unread_chat_alt
            </span>
        </a>
    </li>
    </ul>
`

}

showHeader()

const palette = document.querySelector('.pallete > div:first-child')
const palleteBox = document.querySelector('.palleteBox')
const fullName = localStorage.getItem('fullname')
const userName = document.querySelector('.user_name')
let isToggled = false;
palette.addEventListener('click', (e) => {
    isToggled = !isToggled;
    if (isToggled) {
        palleteBox.style.display = 'flex'
    } else {
        palleteBox.style.display = 'none'
    }
})

const header_btns = document.querySelector('.subHeader_btns')
// function getCookie(name) {
//     const cookieString = document.cookie;
//     const cookies = cookieString.split(';');

//     for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();

//         // Check if the cookie starts with the provided name
//         if (cookie.startsWith(name + '=')) {
//             // Extract and return the cookie value
//             return cookie.substring(name.length + 1);
//         }
//     }

//     return null;
// }

// const token = getCookie('_jwt');
// const userId = getCookie('id')

import { getUser } from "../../js/api.js"
const token = localStorage.getItem('token')
const userId = localStorage.getItem('userId')
const avatar = document.querySelector('.avatarBox > img')
if (token) {
    const data = await getUser(userId)
    userName.textContent = data.full_name
    avatar.src = `/public/img/${data.avatar}`
}
const general = document.querySelector('.general')
general.addEventListener('click', () => {
    isToggled = !isToggled;
    if (isToggled) {
        general.childNodes[3].style.display = 'block'
    } else {
        general.childNodes[3].style.display = 'none'
    }

})

const apps = document.querySelectorAll('.apps')
apps.forEach((item) => {
    item.addEventListener('click', () => {
        isToggled = !isToggled;
        if (isToggled) {
            item.childNodes[3].style.display = 'block'
        } else {
            item.childNodes[3].style.display = 'none'
        }
    })
})
const sidebar_wrapper = document.querySelectorAll('.sidebar-wrapper > li')
sidebar_wrapper.forEach((item) => {
    item.addEventListener('click', () => {
        sidebar_wrapper.forEach((item) => {
            item.childNodes[1].classList.remove('activeLink')
            item.childNodes[1].classList.add('unactive')
        })
        item.childNodes[1].classList.add('activeLink')
    })
})

const sidebar_close = document.getElementById('sidebar_next')
const sidebar = document.querySelector('.sidebar')
sidebar_close.addEventListener('click', () => {
    mini_sidebar.style.left = '0px'
    sidebar.style.left = '-200px'
})

const mini_sidebar = document.querySelector('.mini_sidebar')
mini_sidebar.addEventListener('mouseenter', () => {
    sidebar.style.left = '0px'
    mini_sidebar.style.left = '-70px'
})

window.addEventListener('scroll', function () {
    if (this.scrollY > 66) {
        mini_sidebar.style.top = 0;
    } else {
        mini_sidebar.style.top = '66px'
    }
})

const logoutBtn = document.querySelector('.logoutBtn')
logoutBtn.addEventListener('click', () => {
    localStorage.clear()
    document.location.href = '/src/login.html'
})