import { getAPI } from "./api.js";

const categories = await getAPI('categories')
const footer = document.getElementById('footer')
footer.innerHTML = `
<div>
    <button class="toTop">
        <span class="material-symbols-outlined">
            north
        </span>
    </button>
</div>
<div class="footer1">
    <div>
        <img width="20px" src="/public/img/phone.png">
        <h4>PHONE:</h4>
        <p>(+84) 935 - 695 - 626</p>
    </div>

    <div>
        <img width="20px" src="/public/img/location.png">
        <h4>ADDRESS:</h4>
        <p>13 Nguyễn Du, Quận 1, Hồ Chí Minh</p>
    </div>

    <span>
        <h5>GET THE LATEST UPDATES</h5>
        <input type="text" placeholder="Enter your email">
        <button>
            <span id="send-icon" class="material-symbols-outlined">
                send
            </span>
        </button>
    </span>
</div>

<div class="footer2">
    <img src="/public/img/logo.png" width="150">
    <div>
        <h3>Our Categories</h3>
        ${categories ? categories.map((item) => `<p>${item.name}</p>`).join(' ') : ''}
    </div>
    <div>
        <h3>Working Hours</h3>
        <div>
            <p>Monday - Friday</p>
            <p>09:00 - 22:00</p>
        </div>
        <div>
            <p>Saturday</p>
            <p>11:00 - 00:00</p>
        </div>
        <div>
            <p>Sunday</p>
            <p>11:00 - 23:00</p>
        </div>
    </div>
</div>
<div class="copyright">
<p>© 2020, Lac Thu Nguyet. All rights reserved</p>
</div>
`


const goTopButton = document.querySelector('.toTop')
goTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});