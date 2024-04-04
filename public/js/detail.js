const url = new URL(document.location.href);
const id = url.searchParams.get("id");

import { getDetailProduct } from "./api.js";

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