import { getPagePagination } from "./api.js";

async function getProducts(page, limit){
    let data;
    if(page == '' && limit == ''){
        data = await getPagePagination('1', '6')
    }else{
        data = await getPagePagination(page, limit)
    }
    showProduct(data)
}

const productBoxes = [];
const productBoxElements = document.querySelectorAll('.productBox');

productBoxElements.forEach((productBoxElement) => {
    productBoxes.push(productBoxElement);

    productBoxElement.addEventListener('mouseenter', (e) => {
        productBoxes.forEach((box) => {
            if (box !== e.currentTarget) {
                box.childNodes[1].style.display = 'none';
            }
        });
        e.target.childNodes[1].style.display = 'flex';
    });
});
const productList = document.getElementById('dataList')
async function pages(){
    const data = await getPagePagination('1', '6')
    const totalPages = document.querySelector('.total-pages')
    for(let i = 1; i <= data.totalPages; i++){
        const page_link = document.createElement('a')
        page_link.href = `/src/products.html?page=${i}`
        page_link.className = `page${i}`
        page_link.innerHTML = `0${i}`
        totalPages.appendChild(page_link)
    }

    const page1 = document.querySelector('.page1')
    const page2 = document.querySelector('.page2')
    const page3 = document.querySelector('.page3')
    const url = new URL(document.location.href);
    const pageId = url.searchParams.get("page");
    if(!pageId || pageId == '1'){
        productList.innerHTML = ''
        getProducts('1','6')
        page1.setAttribute('id', 'activeLink')
    }else if(pageId == '2'){
        productList.innerHTML = ''
        getProducts('2','6')
        page2.setAttribute('id', 'activeLink')
    }else if(pageId == '3'){
        productList.innerHTML = ''
        getProducts('3','6')
        page3.setAttribute('id', 'activeLink')
    }
}
pages()
const showProduct = (data) => {
    const pageResult = document.querySelector('.page-show')
    pageResult.innerHTML = `Hiển thị ${data.startIndex + 1} - ${data.endIndex} của ${data.productLength} kết quả`
    data.products.forEach((item) => {
        const productBox = document.createElement('div')
        productBox.className = 'productBox'
        productList.appendChild(productBox)
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
        <a href="/src/detail.html?id=${item._id}">
            <span class="material-symbols-outlined">
            visibility
            </span>
        </a>
        `
        viewBtn.className = 'viewBtn'
        actionItems.appendChild(viewBtn)

        const img = document.createElement('img')
        img.src = `/public/img/${item.img_url}`
        img.width = 280
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
        categoryLink.href = `/src/categories.html?id=${cat.id}`
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

