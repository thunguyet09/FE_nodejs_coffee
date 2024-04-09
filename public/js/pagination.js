import { getPagePagination, searchProducts } from "./api.js";
import { getProductsByCategoryId } from "./api.js";
import { sortProductsAsc } from "./api.js";
import { sortProductsDesc } from "./api.js";
const urlParams = new URLSearchParams(window.location.search);
const searchValue = urlParams.get('search')
const sort = urlParams.get('sort')
const search = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn')

searchBtn.addEventListener('click', () => {
    document.location.href = `/src/products.html?search=${search.value}`
})

const sort_default = document.querySelector('.default')
async function getProducts(page, limit){
    let data;
  
    if(searchValue){
        const response = await searchProducts(searchValue)
        const all_products = await getPagePagination('1', '6')
        all_products.products = response
        data = all_products
    }else if(page == '' && limit == ''){
        data = await getPagePagination('1', '6')
    }else{
        data = await getPagePagination(page, limit)
    }

    showProduct(data)
}

const productList = document.getElementById('dataList')
async function pages(){
    const data = await getPagePagination('1', '6')
    const totalPages = document.querySelector('.total-pages')
    for(let i = 1; i <= data.totalPages; i++){
        const page_link = document.createElement('a')
        page_link.className = `page${i}`
        page_link.innerHTML = `0${i}`
        totalPages.appendChild(page_link)

        page_link.addEventListener('click', async (e) => {
            totalPages.childNodes.forEach((item) => {
                item.removeAttribute('id')
            })
            if(localStorage.getItem('sort')){
                e.target.setAttribute('id', 'activeLink')
                if(localStorage.getItem('sort') == '0'){
                    sort_default.value = 'Thứ tự mặc định'
                    productList.innerHTML = ''
                    const all_products = await getPagePagination(i, '6')
                    showProduct(all_products)
                }else if(localStorage.getItem('sort') == '1'){
                    sort_default.value = 'Thứ tự theo giá: từ thấp đến cao'
                    productList.innerHTML = ''
                    const response = await sortProductsAsc()
                    const all_products = await getPagePagination(i, '6')
                    let data = response.slice(all_products.startIndex, all_products.endIndex)
                    all_products.products = data
                    showProduct(all_products)
                }else if(localStorage.getItem('sort') == '2'){
                    sort_default.value = 'Thứ tự theo giá: cao xuống thấp'
                    productList.innerHTML = ''
                    const response = await sortProductsDesc()
                    const all_products = await getPagePagination(i, '6')
                    let data = response.slice(all_products.startIndex, all_products.endIndex)
                    all_products.products = data
                    showProduct(all_products)
                }
            }else{
                productList.innerHTML = ''
                getProducts(i.toString(), '6')
                e.target.setAttribute('id', 'activeLink')
            }
        })
    }

    const sortList = document.querySelector('.sort-list');
    sortList.childNodes.forEach((item) => {
        item.addEventListener('click', async (e) => {
            if(e.target.id == 'sort0'){
                localStorage.setItem('sort', '0')
                sort_default.value = e.target.textContent
                productList.innerHTML = ''
                const all_products = await getPagePagination('1', '6')
                showProduct(all_products)
            }else if(e.target.id == 'sort1'){
                localStorage.setItem('sort', '1')
                sort_default.value = e.target.textContent
                productList.innerHTML = ''
                const response = await sortProductsAsc()
                const all_products = await getPagePagination('1', '6')
                all_products.products = response.slice(all_products.startIndex, all_products.endIndex)
                let data = all_products
                showProduct(data)
            }else if(e.target.id == 'sort2'){
                localStorage.setItem('sort', '2')
                sort_default.value = e.target.textContent
                productList.innerHTML = ''
                const response = await sortProductsDesc()
                const all_products = await getPagePagination('1', '6')
                all_products.products = response.slice(all_products.startIndex, all_products.endIndex)
                let data = all_products
                showProduct(data)
            }
        });
    });

    const arrow_left = document.querySelector('.arrowLeft')
    const arrow_right = document.querySelector('.arrowRight')
    const arr = []
    arr.push(totalPages.childNodes)
    arrow_left.addEventListener('click', () => {
        productList.innerHTML = ''
        getProducts('1', '6')
        const lastPage =  document.querySelector('.page' + arr[0].length)
        lastPage.removeAttribute('id')
        totalPages.childNodes[0].setAttribute('id', 'activeLink')
    })

    arrow_right.addEventListener('click', () => {
        totalPages.childNodes[0].removeAttribute('id')
        productList.innerHTML = ''
        getProducts(arr[0].length.toString(), '6')
        const lastPage =  document.querySelector('.page' + arr[0].length)
        lastPage.setAttribute('id', 'activeLink')
    })
}

pages()
getProducts('1', '6')
const showProduct = (data) => {
    const pageResult = document.querySelector('.page-show')
    pageResult.innerHTML = `Hiển thị ${data.startIndex + 1} - ${data.endIndex} của ${data.productLength} kết quả`
    data.products.forEach((item) => {
        const productBox = document.createElement('div')
        productBox.className = 'productBox'
        productList.appendChild(productBox)
    
        productBox.addEventListener('mouseenter', (e) => {
            e.target.childNodes[0].style.display = 'flex'
        })

        productBox.addEventListener('mouseleave', (e) => {
            e.target.childNodes[0].style.display = 'none'
        })
        const actionItems = document.createElement('div')
        actionItems.className = 'actionItems'
        productBox.appendChild(actionItems)
        const addToCart = document.createElement('button')
        addToCart.innerHTML = ` <span class="material-symbols-outlined">local_mall</span>`
        addToCart.className = 'addToCart'
        actionItems.appendChild(addToCart)
        const likeBtn = document.createElement('button')
        likeBtn.innerHTML = `
            <p>
                ${item.likes}
            </p>
            <span class="material-symbols-outlined">
                favorite
            </span>
        `
        likeBtn.className = 'likeBtn'
        actionItems.appendChild(likeBtn)
        const viewBtn = document.createElement('button')
        viewBtn.innerHTML = `
        <a href="/src/detail.html?id=${item.id}">
            <span class="material-symbols-outlined">
            visibility
            </span>
        </a>
        `
        viewBtn.className = 'viewBtn'
        actionItems.appendChild(viewBtn)

        const img = document.createElement('img')
        img.src = `/public/img/${item.img_url}`
        img.width = 290
        img.height = 260
        productBox.appendChild(img)

        if(item.promo_price){
            const discount = document.createElement('div')
            discount.className = 'percent'
            const percent = Math.floor(((item.promo_price * 100) / item.price) / 10)
            discount.innerHTML = `
                -${percent}%
            `
        }

        const categoryName = document.createElement('h4')
        productBox.appendChild(categoryName)
        const catalogName = data.categories.find((cat) => cat.id == item.cat_id).name
        categoryName.innerHTML = `
            ${catalogName} - ${item.id}
        `

        const productName = document.createElement('h3')
        productName.className = 'prodName'
        productName.textContent = item.name
        productBox.appendChild(productName)
        const prices = document.createElement('h3')
        prices.className = 'price'
        productBox.appendChild(prices)
        prices.innerHTML = `
            Price - <b>${item.price.toLocaleString()}&#8363;</b> ${
            item.promo_price ? ` / <del>${item.promo_price.toLocaleString()}&#8363;</del>` : ""
        }`;
    })
}


const showCategories = async () => {
    const data = await getPagePagination('1', '6')
    const elementCounts = {};
    data.all_products.forEach((prod) => {
        const category = data.categories.find((val) => val.id == prod.cat_id);
        if (category) {
            const element = category.id;
        if (!elementCounts[element]) {
            elementCounts[element] = 0;
        }
            elementCounts[element]++;
        }
    });
    const categoryLength=[]; 
    data.categories.forEach((cat)=> {
        Object.keys(elementCounts).forEach((item) => {
        if (parseInt(item) == cat.id) {
            categoryLength.push({ id: cat.id, name: cat.name, length: elementCounts[item] });
        }
        });
    });

    const categoryList = document.getElementById('categoryList')
    categoryLength.forEach((cat) => {
        const categoryLink = document.createElement('a')
        categoryLink.id = cat.id
        categoryLink.addEventListener('click', async (e) => {
            productList.style.opacity = 0

            setTimeout(async() => {
                const response = await getProductsByCategoryId(e.target.id)
                const all_products = await getPagePagination('1', '6')
                all_products.products = response.slice(all_products.startIndex, all_products.endIndex)
                let data = all_products
                productList.innerHTML = ''
                showProduct(data)
                productList.style.opacity = 1
            }, 500)
        })
        categoryList.appendChild(categoryLink)
        const categoryName = document.createElement('p')
        categoryName.textContent = cat.name
        categoryLink.appendChild(categoryName)
        if(cat.length < 10){
            const category_length = document.createElement('h4')
            category_length.textContent = '0' + cat.length
            categoryLink.appendChild(category_length)
        }else{
            const category_length = document.createElement('h4')
            category_length.textContent = cat.length
            categoryLink.appendChild(category_length)
        }
    })
}

showCategories()

