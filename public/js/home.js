import { getAPI } from "./api.js";

const categoryBox = document.querySelector('.categoryBox')
const categoryAPI = await getAPI('categories')
categoryAPI.forEach((item) => {
    const categoryItem = document.createElement('div')
    categoryItem.className = 'categoryItem'
    categoryBox.appendChild(categoryItem)
    const img = document.createElement('img')
    img.src = `/public/img/${item.img_url}`
    img.width = 300
    img.height = 420
    categoryItem.appendChild(img)
    const layOut = document.createElement('div')
    layOut.className = 'layOut'
    categoryItem.appendChild(layOut)
    const categoryContent = document.createElement('div')
    categoryContent.className = 'categoryContent'
    categoryItem.appendChild(categoryContent)
    const categoryName = document.createElement('h2')
    categoryName.textContent = item.name
    categoryContent.appendChild(categoryName)
    const hr = document.createElement('hr')
    categoryContent.appendChild(hr)
    const viewCategory = document.createElement('button')
    viewCategory.textContent = 'Xem thêm'
    categoryContent.appendChild(viewCategory)
})

const latestBox = document.querySelector('.latestProductBox')
const latestProductAPI = await getAPI('/products/latest')
latestProductAPI.forEach((item) => {
    const latestItem = document.createElement('a')
    latestItem.className = 'productBox'
    latestItem.href = `/src/detail.html?id=${item._id}`
    latestBox.appendChild(latestItem)
    const img = document.createElement('img')
    img.src = `/public/img/${item.img_url}`
    img.width = 320
    img.height = 300
    latestItem.appendChild(img)
    const productName = document.createElement('h2')
    productName.textContent = item.name
    latestItem.appendChild(productName)
    const price = document.createElement('h3')
    price.innerHTML = item.price.toLocaleString()
    latestItem.appendChild(price)
    const latestBtn = document.createElement('div')
    latestBtn.className = 'divBtn'
    latestItem.appendChild(latestBtn)
    const addToCart = document.createElement('button')
    addToCart.className = 'addToCart'
    latestBtn.appendChild(addToCart)
    addToCart.innerHTML = `
        <p>Add to cart</p>
        <span>${item.id}</span>
        <span class="material-symbols-outlined">
            trending_flat
        </span>
    `
    const likeBtn = document.createElement('button')
    likeBtn.className = 'likes'
    likeBtn.innerHTML = `
        <span>${item.likes}</span>
        <span class="material-symbols-outlined">
            favorite
        </span>
    `
    latestBtn.appendChild(likeBtn)
})

const promoBox = document.querySelector('.promoProductBox')
const promoProductAPI = await getAPI('/products/promo')

promoProductAPI.forEach((item) => {
    const promoItem = document.createElement('a')
    promoItem.className = 'promoItem'
    promoItem.href = `/src/detail.html?id=${item._id}`
    promoBox.appendChild(promoItem)

    const img = document.createElement('img')
    img.src = `/public/img/${item.img_url}`
    img.width = 320
    img.height = 300
    promoItem.appendChild(img)

   if(item.promo_price){
    const discount = document.createElement('div')
    const calcPercent = Math.floor(((item.promo_price * 100)/item.price)/10)
    discount.className = 'percent'
    discount.innerHTML = `-${calcPercent}%`
    promoItem.appendChild(discount)
   }

   const productName = document.createElement('h2')
    productName.textContent = item.name
    promoItem.appendChild(productName)

    const promo_prices = document.createElement('div')
    promo_prices.className = 'promoPrices'
    promoItem.appendChild(promo_prices)
    promo_prices.innerHTML = `
        <h3>${item.promo_price.toLocaleString()}</h3>
        <h4>
            <del>${item.price.toLocaleString()}</del>
        </h4>
    `

    const promoBtns = document.createElement('div')
    promoBtns.className = 'promoBtns'
    promoItem.appendChild(promoBtns)

    const addToCart = document.createElement('button')
    addToCart.className = 'addToCart'
    promoBtns.appendChild(addToCart)
    addToCart.innerHTML = `
        <p>Add to cart</p>
        <span>${item.id}</span>
        <span class="material-symbols-outlined">
            trending_flat
        </span>
    `
    const likeBtn = document.createElement('button')
    likeBtn.className = 'likes'
    likeBtn.innerHTML = `
        <span>${item.likes}</span>
        <span class="material-symbols-outlined">
            favorite
        </span>
    `
    promoBtns.appendChild(likeBtn)
})