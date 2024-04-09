const url = new URL(document.location.href);
const id = url.searchParams.get("id");

import { getDetailProduct } from "./api.js";
import { getCart } from "./api.js";
import { numsInCart } from "./header.js";
import { cartExists } from "./api.js";
import { getCart as getCartAPI } from "./header.js";
import { getUser } from "./api.js";
import { getAllUser } from "./api.js";
const data = await getDetailProduct(id)
//thumbnails
const imgSlide = document.querySelectorAll('.slick-slide')
const imgAfter = document.querySelector('.img1')
const imgFeatured = document.getElementById('featured')
imgSlide.forEach((item) => {
    item.addEventListener('click', (e) => {
        imgFeatured.style.transform = 'translateX(-400px)'
        imgFeatured.style.transition = '.5s ease'
        imgFeatured.style.opacity = '0'
        imgFeatured.style.zIndex = '0'
        imgAfter.src = e.target.src
        imgAfter.style.transform = 'translateX(0)'
        imgAfter.style.zIndex = '9'
    })
})

const sizeBox = document.querySelectorAll('.size-box')

sizeBox.forEach((item) => {
    item.addEventListener('click', () => {
       sizeBox.forEach((val) => {
            val.childNodes[1].checked = false; 
            val.childNodes[3].style.color = 'black'
            val.style.backgroundColor = 'white' 
       })
       item.childNodes[1].checked = true
       item.childNodes[3].style.color = 'white'
       item.style.backgroundColor = 'black'
    })
})

const navName = document.querySelector('.nav-name')
navName.innerHTML = data.name

const slick_slide = document.querySelector('.slide > img:last-child')
slick_slide.src = `/public/img/${data.img_url}`

const img1 = document.querySelector('.img1')
img1.src = `/public/img/${data.img_url}`

const productName = document.querySelector('.product-name > h1')
productName.textContent = data.name

const luot_ban = document.querySelector('.luot_ban > span')
luot_ban.innerHTML = `Lượt bán: ${data.luot_ban}`

const prices = document.querySelector('.price')
if(data.promo_price){
    prices.innerHTML = `
        <h3><del>${data.promo_price.toLocaleString()}&#8363;</del></h3>
        <h2>${data.price.toLocaleString()}&#8363;</h2>
    `
}else{
    prices.innerHTML = `
        <h2>${data.price.toLocaleString()}&#8363;</h2>
    `
}

const mo_ta = document.querySelector('.mo_ta')
mo_ta.textContent = data.mo_ta

const prevDetail = document.querySelector('.prev-detail')
const nextDetail = document.querySelector('.next-detail')
prevDetail.addEventListener('click', () => {
    document.location.href = `/src/detail.html?id=${data.id - 1}`
})

nextDetail.addEventListener('click', () => {
    document.location.href = `/src/detail.html?id=${data.id + 1}`
})
 
const nextId = data.id + 1
const nextData = await getDetailProduct(nextId)
const nextProduct = document.querySelector('.next-product')

if(nextData.message !== 'Product not found'){
    nextProduct.innerHTML = `
        <img src="/public/img/${nextData.img_url}" width="70" height="70">
        <div>
            <h4>${nextData.name}</h4>
            <h5>${nextData.price ? nextData.price.toLocaleString() : ''}&#8363;</h5>
        </div>
    `
}else {
    nextProduct.style.width = 0
    nextProduct.style.height = 0
    nextDetail.disabled = true
}

nextDetail.addEventListener('mouseenter', () => {
    nextProduct.style.display = 'flex'
    setTimeout(() => {
        nextProduct.style.transform = 'translateX(0)'
    }, 500)
})

nextDetail.addEventListener('mouseleave', () => {
    nextProduct.style.transform = 'translateX(-100px)'
    setTimeout(() => {
        nextProduct.style.display = 'none'
    }, 500)
})

const prevProduct = document.querySelector('.prev-product')
if(id > 0){
    const prevId = data.id - 1
    const prevData = await getDetailProduct(prevId)
    prevProduct.innerHTML = `
        <img src="/public/img/${prevData.img_url}" width="70" height="70">
        <div>
            <h4>${prevData.name}</h4>
            <h5>${prevData.price.toLocaleString()}&#8363;</h5>
        </div>
    `

    prevDetail.addEventListener('mouseenter', () => {
        prevProduct.style.display = 'flex'
        setTimeout(() => {
            prevProduct.style.transform = 'translateX(0)'
        }, 500)
    })

    prevDetail.addEventListener('mouseleave', () => {
        prevProduct.style.transform = 'translateX(-100px)'
        setTimeout(() => {
            prevProduct.style.display = 'none'
        }, 500)
    })
}else {
    prevProduct.style.width = 0
    prevProduct.style.height = 0
    prevDetail.disabled = true
}

let priceL = 0;
const sizeL = document.getElementById('sizeL')
sizeL.addEventListener('click', () => {
    priceL = data.price + 20000

    if(data.promo_price){
        prices.innerHTML = `
            <h3><del>${data.promo_price.toLocaleString()}&#8363;</del></h3>
            <h2>${priceL.toLocaleString()}&#8363;</h2>
        `
    }else{
        prices.innerHTML = `
            <h2>${priceL.toLocaleString()}&#8363;</h2>
        `
    }
})

const sizeM = document.getElementById('sizeM')
sizeM.addEventListener('click', () => {
    if(data.promo_price){
        prices.innerHTML = `
            <h3><del>${data.promo_price.toLocaleString()}&#8363;</del></h3>
            <h2>${data.price.toLocaleString()}&#8363;</h2>
        `
    }else{
        prices.innerHTML = `
            <h2>${data.price.toLocaleString()}&#8363;</h2>
        `
    }
})

const quantity = document.querySelector('.quantity-value')
const decrease = document.querySelector('.decrease')
const increase = document.querySelector('.increase')

let quantityValue = 0;
decrease.addEventListener('click', () => {
    if(quantity.value <= 1){
        quantity.value = 1
    }else {
        quantityValue = parseInt(quantity.value) - 1
        quantity.value = quantityValue
    }
})

increase.addEventListener('click', () => {
    if(quantity.value >= data.quantity){
        quantity.value = data.quantity
    }else{
        let quantityValue = parseInt(quantity.value) + 1
        quantity.value = quantityValue
    }
})

quantity.addEventListener('change', (e) => {
    quantityValue = e.target.value
})

const sizeBtns = document.querySelectorAll('.size-btns')
let size = ''
sizeBtns.forEach((item) => {
    item.addEventListener('click', (e) => {
        size = e.target.textContent
    })
})
const addToCart = document.querySelector('.addToCart')
const carts = await getCart()
const dialogContent = document.getElementById('dialog-content')
const dialogIcon = document.querySelector('#dialog-content > span')
const dialogText = document.querySelector('.dialog-text')
addToCart.addEventListener('click', async () => {
    if(size !== ''){
        const cartId = carts[carts.length - 1].id + 1
        const cart = {
            id: cartId,
            prod_id: data.id,
            quantity: parseInt(quantity.value),
            size: size,
            user_id: localStorage.getItem('userId')
        }

        let userId = localStorage.getItem('userId')
        const cart_exists = await cartExists(data.id, userId, size)
        if(cart_exists.message !== 'Not Found'){
            let new_quantity = parseInt(cart_exists.quantity) + parseInt(quantity.value)
            fetch(`http://localhost:3000/api/cart/${data.id}/${userId}/${size}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: new_quantity
                })
            })
            .then(async (res) => {
                if(res.ok){
                    dialogContent.style.display = 'flex';
                    dialogContent.style.backgroundColor = '#6B8A47';
                    dialogContent.style.color = 'white';
                    dialogText.textContent = 'Sản phẩm đã thêm vào giỏ hàng';
                    dialogIcon.innerHTML = `<span class="material-symbols-outlined">shopping_bag</span>`;
                    setTimeout(() => {
                        dialogContent.style.display = 'none';
                        dialogContent.style.backgroundColor = '';
                        dialogContent.style.color = '';
                        dialogText.textContent = '';
                        dialogIcon.innerHTML = '';
                    }, 4000);
                }
            })
            .then(async () => {
                await numsInCart()
                await getCartAPI()
            })
        }else {
            fetch('http://localhost:3000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cart)
            })
            .then(async (res) => {
                if(res.ok){
                    dialogContent.style.display = 'flex';
                    dialogContent.style.backgroundColor = '#6B8A47';
                    dialogContent.style.color = 'white';
                    dialogText.textContent = 'Sản phẩm đã thêm vào giỏ hàng';
                    dialogIcon.innerHTML = `<span class="material-symbols-outlined">shopping_bag</span>`;
                    setTimeout(() => {
                        dialogContent.style.display = 'none';
                        dialogContent.style.backgroundColor = '';
                        dialogContent.style.color = '';
                        dialogText.textContent = '';
                        dialogIcon.innerHTML = '';
                    }, 4000);
                }
            })
            .then(async () => {
                await numsInCart()
                await getCartAPI()
            })
        }
    }else{
        dialogContent.style.display = 'flex';
        dialogContent.style.backgroundColor = '#C5041B';
        dialogContent.style.color = 'white';
        dialogText.textContent = 'Vui lòng chọn size';
        dialogIcon.innerHTML = `<span class="material-symbols-outlined">close</span>`;
        setTimeout(() => {
            dialogContent.style.display = 'none';
            dialogContent.style.backgroundColor = '';
            dialogContent.style.color = '';
            dialogText.textContent = '';
            dialogIcon.innerHTML = '';
        }, 4000);
    }
})

const likeBtn = document.querySelector('.like-btn')
const userId = localStorage.getItem('userId')
const user = await getUser(userId)
const likesArr = user.products_fav

const updateLikes = async () => {
    const all_users = await getAllUser()
    let elements = []
    all_users.forEach((item) => {
    if(item.products_fav.length !== 0){
        elements.push(item.products_fav)
    }
    })

    const commonElements = elements.reduce((acc, arr) => {
        return acc.filter(element => arr.includes(element));
    });

    const commonElementsWithLength = commonElements.map(element => ({
        productId: element,
        likes: elements.reduce((acc, arr) => acc + (arr.includes(element) ? 1 : 0), 0)
    }));

    const numsOfFavorite = document.querySelector('.nums-of-favorite')
    commonElementsWithLength.forEach((item) => {
        if(item.productId == id){
            numsOfFavorite.innerHTML = `(${item.likes})`
        }
    })

    const notCommonElements = elements.flatMap(item => {
        return item.filter(res => !commonElementsWithLength.some(val => val.productId === res));
    });

    notCommonElements.forEach((item) => {
        if(item == id){
            numsOfFavorite.innerHTML = `(1)`
        }
    })
}

likeBtn.addEventListener('click',async (e) => {
    e.stopPropagation()
    let favoriteArr = []
    likesArr.forEach((item) => {
        favoriteArr.push(item)
    })

    if(likesArr.includes(data.id)){
        dialogContent.style.display = 'flex';
        dialogContent.style.backgroundColor = '#6B8A47';
        dialogContent.style.color = 'white';
        dialogText.textContent = 'Sản phẩm đã được thêm vào danh sách yêu thích';
        dialogIcon.innerHTML = `<span class="material-symbols-outlined">favorite</span>`;
        setTimeout(() => {
            dialogContent.style.display = 'none';
            dialogContent.style.backgroundColor = '';
            dialogContent.style.color = '';
            dialogText.textContent = '';
            dialogIcon.innerHTML = '';
        }, 1000);
    }else{
        favoriteArr.push(data.id)
        await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                products_fav: favoriteArr
            })
        })
        .then(() => {
            likeBtn.style.color = 'red'
            dialogContent.style.display = 'flex';
            dialogContent.style.backgroundColor = '#6B8A47';
            dialogContent.style.color = 'white';
            dialogText.textContent = 'Sản phẩm đã được thêm vào danh sách yêu thích';
            dialogIcon.innerHTML = `<span class="material-symbols-outlined">favorite</span>`;
            setTimeout(() => {
                updateLikes()
                dialogContent.style.display = 'none';
                dialogContent.style.backgroundColor = '';
                dialogContent.style.color = '';
                dialogText.textContent = '';
                dialogIcon.innerHTML = '';
            }, 1000);
        })
    }
})

likesArr.forEach((item) => {
    if(item == data.id){
        likeBtn.style.color = 'red'
    }
})

updateLikes()
