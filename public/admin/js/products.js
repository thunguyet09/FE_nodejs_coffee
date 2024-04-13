import { getAPI, getCategoryById, getTheme, searchProducts } from "../../js/api.js"
const main_title = document.querySelectorAll('.main_title')
main_title.forEach((node) => {

    node.addEventListener('click', () => {
        main_title.forEach((item) => {
            item.nextElementSibling.childNodes[1].style.display = 'none'
        })
        node.nextElementSibling.childNodes[1].style.display = 'table-cell'
    })
})

const addBtn = document.querySelector('.addBtn')
const addModal = document.getElementById('myModal')
addBtn.addEventListener('click', () => {
    addModal.style.display = 'block'
})

const cancelBtn = document.querySelector('.cancelBtn')
cancelBtn.addEventListener('click', () => {
    addModal.style.display = 'none'
})

const closeBtn = document.querySelector('.close')
closeBtn.addEventListener('click', () => {
    addModal.style.display = 'none'
})

const imgFile = document.getElementById('imgFile')
const imgProd = document.getElementById('imgProd')
imgFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const img_url = URL.createObjectURL(file);
    imgProd.src = img_url
})

const dialog_content = document.getElementById('dialog-content')
const dialogIcon = document.querySelector('#dialog-content > span')
const dialogText = document.querySelector('.dialog-text')
const queryParams = new URLSearchParams(window.location.search);
const del = queryParams.get('del')
const id = queryParams.get('id')
const updateModal = document.getElementById('updateModal')
if(id){
    updateModal.style.display = 'block'
}else{
    updateModal.style.display = 'none'
}

const editBtn = document.querySelectorAll('.editBtn')
editBtn.forEach((item) => {
    item.addEventListener('click', () => {
        updateModal.style.display = 'block'
    })
})
const editBtn2 = document.querySelectorAll('.editBtn2')
editBtn2.forEach((item) => {
    item.addEventListener('click', () => {
        updateModal.style.display = 'block'
    })
})
const update_cancelBtn = document.querySelector('.update_cancelBtn')
const update_modal_close = document.querySelector('.update_modal_close')
update_cancelBtn.addEventListener('click', () => {
    updateModal.style.display = 'none'
})
update_modal_close.addEventListener('click', () => {
    updateModal.style.display = 'none'
})

const img = document.getElementById('update_imgFile')
const imgOld = document.getElementById('update_imgProd')
if(img){
    img.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const img_url = URL.createObjectURL(file);
        imgOld.src = img_url
    })
}


const search_product = document.getElementById('search_product')
const deleteConfirm = document.getElementById('delete-confirmation')
const delete_prodname = document.querySelector('.delete_prodname')

const update_prodName = document.getElementById('update_prodname')
const update_catalog = document.getElementById('update_catalog')
const update_price = document.getElementById('update_price')
const update_promoPrice = document.getElementById('update_promo_price')
const update_gia_von = document.getElementById('update_gia_von')
const update_stock = document.getElementById('update_stock')
const update_quantity = document.getElementById('update_quantity')
const moTa = document.getElementById('update_mo_ta')
const update_imgProd = document.getElementById('update_imgProd')
const update_imgFile = document.getElementById('update_imgFile')
const prodId = document.getElementById('prodId')
const update_likes = document.getElementById('likes')
const update_luot_ban = document.getElementById('luot_ban')
const update_luot_xem = document.getElementById('luot_xem')

const category_list = document.querySelector('.category_list')
const featured = document.getElementById('featured')
featured.addEventListener('change', async () => {
    if (featured.value === '1') {
        const products = await getAPI('products')
        const categories = await getAPI('categories')
        const lowToHigh = products.sort((a, b) => a.price - b.price)
        tbody.innerHTML = ''
        showTable(lowToHigh, categories)
        loadTheme()
    } else if (featured.value === '2') {
        const products = await getAPI('products')
        const categories = await getAPI('categories')
        const highToLow = products.sort((a, b) => b.price - a.price)
        tbody.innerHTML = ''
        showTable(highToLow, categories)
        loadTheme()
    } else {
        const products = await getAPI('products')
        const categories = await getAPI('categories')
        tbody.innerHTML = ''
        showTable(products, categories)
        loadTheme()
    }
})
search_product.addEventListener('input', async () => {
    const products = await getAPI('products')
    const categories = await getAPI('categories')
    const searchProduct = products.filter((prod) => prod.name.toLowerCase().includes(search_product.value.toLowerCase()))
    tbody.innerHTML = ''
    showTable(searchProduct, categories)
    loadTheme()
})

async function catalogDOM() {
    const products = await getAPI('products')
    const categories = await getAPI('categories')
    categories.forEach((cat) => {
        const groupControl = document.createElement('div')
        groupControl.className = 'groupControl'
        category_list.appendChild(groupControl)

        const input = document.createElement('input')
        input.type = 'radio'
        input.value = cat.id
        groupControl.appendChild(input)

        const label = document.createElement('label')
        label.textContent = cat.name
        groupControl.appendChild(label)
    })

    const catArr = Array.from(category_list.children)
    catArr.forEach((item) => {
        item.childNodes[0].addEventListener('click', async (e) => {
            const clickedElement = e.target;
            catArr.forEach((otherItem) => {
                const otherElement = otherItem.childNodes[0];
                if (otherElement !== clickedElement) {
                    otherElement.checked = false;
                }
            });
            clickedElement.checked = true;
            const filterData = products.filter((item) => item.cat_id == clickedElement.value)
            tbody.innerHTML = ''
            showTable(filterData, categories)
            loadTheme()
        });
    });
}

catalogDOM()
const filter = document.querySelector('.filter > div')
const filter_content = document.querySelector('.filter_content')
let isToggle = false;
filter.addEventListener('click', (e) => {
    isToggle = !isToggle;
    if (isToggle) {
        filter_content.style.visibility = 'visible'
        filter_content.style.opacity = '1'
        filter_content.style.zIndex = '2'
    } else {
        filter_content.style.visibility = 'hidden'
        filter_content.style.opacity = '0'
    }
})

const rowsPerPage = document.querySelector('.rows-per-page > ul > h4')
const rowsPerPageList = document.querySelector('.rows-per-page-list')

rowsPerPage.addEventListener('click', () => {
    isToggle = !isToggle
    if(isToggle){
        rowsPerPageList.style.display = 'block'
    }else{
        rowsPerPageList.style.display = 'none'
    }
})

const rowElement = document.querySelector('.rows-per-page > ul > h4')
const currentUrl = new URL(window.location.href);
const searchParams = currentUrl.searchParams;
const rowsValue = searchParams.get('rows');
const pageValue = searchParams.get('page');
if(rowsValue){
    rowElement.innerHTML = rowsValue
}

const indexPage = document.querySelector('.index-page')
const navigationPage = document.querySelector('.navigation-page')
const getProductsData = async () => {
    const products = await getAPI('products')
    const categories = await getAPI('categories')
    const itemsPerPage = rowsValue ? rowsValue : 8;
    const pageNumber = pageValue ? pageValue : 1
    const startIndex = (pageNumber - 1) * parseInt(itemsPerPage);
    const endIndex = startIndex + parseInt(itemsPerPage);
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / parseInt(itemsPerPage));

    if(endIndex > totalProducts){
        indexPage.innerHTML = `${startIndex + 1} - ${totalProducts} of ${products.length}`
    }else{
        indexPage.innerHTML = `${startIndex + 1} - ${endIndex} of ${products.length}`
    }

    const firstPage = document.createElement('a')
    firstPage.className = 'first-page'
    firstPage.href = `?rows=${itemsPerPage}&page=1`
    firstPage.innerHTML = ` <span class="material-symbols-outlined">first_page</span>`
    navigationPage.appendChild(firstPage)

    if(pageNumber == 1){
        const page1 = document.createElement('a')
        page1.className = 'previous-page'
        page1.href = `?rows=${itemsPerPage}&page=1`
        page1.innerHTML = ` <span class="material-symbols-outlined">keyboard_arrow_left</span>`
        navigationPage.appendChild(page1)
    }else{
        const page1 = document.createElement('a')
        page1.className = 'previous-page'
        page1.href = `?rows=${itemsPerPage}&page=${pageNumber - 1}`
        page1.innerHTML = ` <span class="material-symbols-outlined">keyboard_arrow_left</span>`
        navigationPage.appendChild(page1)
    }

    if(pageNumber == totalPages){
        const nextPage = document.createElement('a')
        nextPage.className = 'previous-page'
        nextPage.href = `?rows=${itemsPerPage}&page=${totalPages}`
        nextPage.innerHTML = `<span class="material-symbols-outlined">navigate_next</span>`
        navigationPage.appendChild(nextPage)
    }else{
        const nextPage = document.createElement('a')
        nextPage.className = 'previous-page'
        nextPage.href = `?rows=${itemsPerPage}&page=${parseInt(pageNumber) + 1}`
        nextPage.innerHTML = `<span class="material-symbols-outlined">navigate_next</span>`
        navigationPage.appendChild(nextPage)
    }

    const lastPage = document.createElement('a')
    lastPage.innerHTML = `<span class="material-symbols-outlined">last_page</span>`
    lastPage.className = 'last-page'
    lastPage.href = `?rows=${itemsPerPage}&page=${totalPages}`
    navigationPage.appendChild(lastPage)

    let productData = products.slice(startIndex, endIndex);
    showTable(productData, categories)
}

const tbody = document.querySelector('table > tbody')
function showTable(product, catalog) {
    const trArr = []
    product.forEach((prod) => {
        const catData = catalog.find(cat => cat.id === prod.cat_id)
        if (catData) {
            const price = parseInt(prod.price, 10)
            const promo_price = parseInt(prod.promo_price, 10)
            const gia_von = parseInt(prod.gia_von, 10)

            const tr1 = document.createElement('tr')
            trArr.push(tr1)
            tr1.className = 'main_title'
            tbody.appendChild(tr1)

            tr1.addEventListener('click', () => {
                trArr.forEach((node) => {
                    node.nextElementSibling.childNodes[0].style.display = 'none'
                })
                tr1.nextElementSibling.childNodes[0].style.display = 'table-cell'
            })

            const td1 = document.createElement('td')
            td1.className = 'productImg'
            tr1.appendChild(td1)
            td1.innerHTML = `
                <h3>#${prod.id}</h3>
                <img src="/public/img/${prod.img_url}" width="100px" height="102px">
            `
            const td2 = document.createElement('td')
            td2.className = 'prodName'
            if(prod.quantity === 0){
                td2.innerHTML = `
                    ${prod.name}
                    <p class="sold-out">Hết hàng</p>
                `
            }else{
                td2.textContent = prod.name
            }
            tr1.appendChild(td2)
            const td3 = document.createElement('td')
            td3.innerHTML = `${price.toLocaleString()}&#8363;`
            tr1.appendChild(td3)
            const td4 = document.createElement('td')
            td4.innerHTML = `${gia_von.toLocaleString()}&#8363;`
            tr1.appendChild(td4)
            const td5 = document.createElement('td')
            td5.textContent = prod.stock
            if (prod.stock === 'In Stock') {
                td5.style.color = 'green'
            } else {
                td5.style.color = 'red'
            }
            tr1.appendChild(td5)
            const td6 = document.createElement('td')
            td6.textContent = prod.quantity
            tr1.appendChild(td6)

            const td7 = document.createElement('td')
            td7.className = 'btns'
            const deleteBtn = document.createElement('button')
            deleteBtn.className = 'deleteBtn'
            deleteBtn.textContent = 'Xóa'
            td7.appendChild(deleteBtn)
            deleteBtn.addEventListener('click', async () => {
                deleteConfirm.style.display = 'flex'
                document.getElementById('prod_id').value = prod._id
                delete_prodname.innerHTML = `
                        Bạn có chắc chắn xóa sản phẩm <i>${prod.name}</i> ?
                    `
            })

            const editBtn = document.createElement('button')
            editBtn.className = 'editBtn'
            editBtn.textContent = 'Cập nhật'
            editBtn.addEventListener('click', () => {
                updateFunction(prod)
            })
            td7.appendChild(editBtn)
            tr1.appendChild(td7)

            //tr2
            const tr2 = document.createElement('tr')
            tr2.className = 'vice_title'
            tbody.appendChild(tr2)
            const td_vice = document.createElement('td')
            td_vice.colSpan = '10'
            td_vice.className = 'sub_title'
            tr2.appendChild(td_vice)
            const sub_title_heading = document.createElement('div')
            td_vice.appendChild(sub_title_heading)
            const sub_title_h2 = document.createElement('h2')
            sub_title_h2.textContent = 'Thông tin'
            sub_title_heading.appendChild(sub_title_h2)
            const vice_title_h3 = document.createElement('h3')
            vice_title_h3.textContent = prod.name
            td_vice.appendChild(vice_title_h3)
            const sub_title_body = document.createElement('div')
            sub_title_body.className = "sub_title_body"
            td_vice.appendChild(sub_title_body)
            const row1 = document.createElement('div')
            const sub_title_img = document.createElement('img')
            sub_title_img.src = `/public/img/${prod.img_url}`
            sub_title_img.width = '350'
            sub_title_img.height = '350'
            row1.appendChild(sub_title_img)
            sub_title_body.appendChild(row1)
            const row2 = document.createElement('div')
            row2.className = 'row2'
            sub_title_body.appendChild(row2)

            const info1 = document.createElement('div')
            if (prod.promo_price) {
                info1.innerHTML = `
                    <p class="text">Loại hàng: ${catData.name}</p>
                    <p class="text">Giá bán: ${price.toLocaleString()}&#8363;</p>
                    <p class="text">Giá gốc: ${promo_price.toLocaleString()}&#8363;</p>
                    <p class="text">Giá vốn: ${gia_von.toLocaleString()}&#8363;</p>
                    <p class="text">Lượt xem: ${prod.luot_xem}</p>
                    <p class="text">Tình trạng: ${prod.stock}</p>
                `
            } else {
                info1.innerHTML = `
                    <p class="text">Loại hàng: ${catData.name}</p>
                    <p class="text">Giá bán: ${price.toLocaleString()}&#8363;</p>
                    <p class="text">Giá vốn: ${gia_von.toLocaleString()}&#8363;</p>
                    <p class="text">Lượt xem: ${prod.luot_xem}</p>
                    <p class="text">Tình trạng: ${prod.stock}</p>
                `
            }
            row2.appendChild(info1)
            const info2 = document.createElement('div')
            info2.className = 'info2'
            info2.innerHTML = `
                    <p class="text">Tồn kho: ${prod.quantity}</p>
                    <p class="text">Lượt bán: ${prod.luot_ban}</p>
                    <p class="text">Mô tả:</p>
                    <p class="mo_ta">${prod.mo_ta}</p>
                `
            row2.appendChild(info2)
            const actionBtn = document.createElement('div')
            actionBtn.className = 'actionBtn'
            info2.appendChild(actionBtn)
            const editBtn2 = document.createElement('button')
            editBtn2.className = 'editBtn2'
            editBtn2.innerHTML = `
                    <i class="fa-solid fa-square-check"></i>
                    <p>Cập nhật</p>
                `
            actionBtn.appendChild(editBtn2)
            editBtn2.addEventListener('click', () => {
                updateFunction(prod)
            })
            const blockBtn = document.createElement('button')
            blockBtn.className = 'blockBtn'
            blockBtn.innerHTML = `
                    <i class="fa-solid fa-xmark"></i>
                    <p>Ngừng kinh doanh</p>
                `
            actionBtn.appendChild(blockBtn)

            blockBtn.addEventListener('click', (e) => {
                console.log(prod.id)
            })
            const deleteBtn2 = document.createElement('button')
            deleteBtn2.className = 'deleteBtn2'
            deleteBtn2.innerHTML = `
                    <i class="fa-solid fa-trash"></i>
                    <p>Xóa</p>
                `
            deleteBtn2.addEventListener('click', async () => {
                deleteConfirm.style.display = 'flex'
                document.getElementById('prod_id').value = prod._id
                delete_prodname.innerHTML = `
                        Bạn có chắc chắn xóa sản phẩm <i>${prod.name}</i> ?
                        <ul class="delete-note">
                            <li>- Tất cả thông tin như doanh thu, báo cáo, thống kê đều sẽ bị ảnh hưởng.</li>
                        </ul>
                    `
            })
            actionBtn.appendChild(deleteBtn2)

        }
    })
}

const deleteConfirmBtn = document.querySelector('.deleteConfirmBtn')
deleteConfirmBtn.addEventListener('click', async () => {
    try{
        tbody.innerHTML = ''
        navigationPage.innerHTML = ''
        tbody.style.opacity = 0
        tbody.style.transition = '.3s ease'
        const productId = document.getElementById('prod_id').value
        await fetch(`http://localhost:3000/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(() => {
            deleteConfirm.style.display = 'none'
            dialog_content.style.display = 'flex'
            dialog_content.style.backgroundColor = '#6B8A47'
            dialogIcon.innerHTML = `<i class="fa-solid fa-check"></i>`
            dialogText.textContent = 'Sản phẩm đã được xóa';
            setTimeout(() => {
                getProductsData()
                tbody.style.opacity = 1
            }, 500)
            setTimeout(() => {
                dialog_content.style.display = 'none'
            }, 2000)
        })
    }catch(err){
        console.error(err)
    }
})
const prodName = document.getElementById('prodname')
const price = document.getElementById('price')
const catalog = document.getElementById('catalog')
const gia_goc = document.getElementById('promo_price')
const gia_von = document.getElementById('gia_von')
const stock = document.getElementById('stock')
const quantity_add = document.getElementById('quantity')
const mo_ta = document.getElementById('mo_ta')
const errMsg = document.querySelector('.errMsg')
const addSaveBtn = document.querySelector('.add-btns > .saveBtn')

const categories = await getAPI('categories')
    categories.forEach((val) => {
        const option = document.createElement('option')
        option.value = val.id
        option.textContent = val.name
        catalog.appendChild(option)
    })
addSaveBtn.addEventListener('click', async () => {
    let flag = true;
    const products = await getAPI('products')
    const matchingName = products.find(prod => prod.name === prodName.value)

    if (parseInt(gia_von.value) > parseInt(price.value)) {
        console.log(true)
        errMsg.innerHTML = `<p>Giá nhập đang lớn hơn giá bán<p>`
        flag = false;
    }

    if (matchingName) {
        flag = false;
        dialog_content.style.display = 'flex'
        dialog_content.style.backgroundColor = '#dc3545'
        dialogIcon.innerHTML = `<span class="material-symbols-outlined">close</span>`
        dialogText.textContent = 'Sản phẩm này đã tồn tại';
        setTimeout(() => {
            dialog.style.display = 'none'
        }, 2000)
    }

    const quantity = document.getElementById('quantity')
    if (quantity.value < 1) {
        flag = false;
        dialog_content.style.display = 'flex'
        dialog_content.style.backgroundColor = '#dc3545'
        dialogIcon.innerHTML = `<span class="material-symbols-outlined">close</span>`
        dialogText.textContent = 'Tồn kho phải lớn hơn 0';
        setTimeout(() => {
            dialog_content.style.display = 'none'
        }, 2000)
    }

    if (flag == true) {
        tbody.innerHTML = ''
        const index = products[products.length - 1].id + 1
        const newProduct = {
            cat_id: parseInt(catalog.value),
            name: prodName.value,
            gia_von: parseInt(gia_von.value),
            img_url: imgFile.files[0] ? imgFile.files[0].name : 'avatar.jpg',
            mo_ta: mo_ta.value,
            price: parseInt(price.value),
            quantity: parseInt(quantity_add.value),
            stock: stock.value,
            id: index,
        };

        await fetch(`http://localhost:3000/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(() => {
            navigationPage.innerHTML = ''
            addModal.style.display = "none";
            dialog_content.style.display = 'flex'
            dialog_content.style.backgroundColor = '#6B8A47'
            dialogIcon.innerHTML = `<i class="fa-solid fa-check"></i>`
            dialogText.textContent = 'Sản phẩm được thêm thành công';
            setTimeout(() => {
                dialog_content.style.display = 'none'
            }, 2000)

            prodName.value = ''
            gia_von.value = ''
            mo_ta.value = ''
            imgProd.src = ''
            price.value = ''
            quantity.value = ''
        })
        .then(() => {
            getProductsData()
        })
        .catch(err => console.log('Error', err));
    }
})

const updateFunction = async (prod) => {
    const category = await getCategoryById(prod.cat_id)
    const option = document.createElement('option')
        option.value = category.id
        option.textContent = category.name
        update_catalog.appendChild(option)

    const categories = await getAPI('categories')
    categories.forEach((val) => {
        const option = document.createElement('option')
        option.value = val.id
        option.textContent = val.name
        update_catalog.appendChild(option)
    })
    updateModal.style.display = 'block'
    update_prodName.value = prod.name
    update_catalog.value = prod.cat_id
    update_price.value = prod.price
    update_gia_von.value = prod.gia_von
    update_stock.value = prod.stock
    update_quantity.value = prod.quantity
    moTa.value = prod.mo_ta
    update_imgProd.src = `/public/img/${prod.img_url}`
    prodId.value = prod.id
    update_likes.value = prod.likes
    update_luot_ban.value = prod.luot_ban
    update_luot_xem.value = prod.luot_xem
    if (prod.promo_price > 0) {
        update_promoPrice.value = prod.promo_price
    } else {
        update_promoPrice.value = 0
    }

    update_imgFile.addEventListener('change', (e) => {
        const selectedFile = e.target.files
        const urlFile = URL.createObjectURL(selectedFile[0])
        update_imgProd.src = urlFile
    })
    const saveUpdateBtn = document.querySelector('.updateBtns > .saveBtn') 
    saveUpdateBtn.addEventListener('click', async () => {
        tbody.innerHTML = ''
        tbody.style.opacity = 0
        tbody.style.transition = '.3s ease'
        const id = parseInt(prodId.value);
        const updatedItem = {
            name: update_prodName.value,
            cat_id: parseInt(update_catalog.value),
            price: parseInt(update_price.value),
            gia_von: parseInt(update_gia_von.value),
            promo_price: parseInt(update_promoPrice.value),
            stock: update_stock.value,
            quantity: parseInt(update_quantity.value),
            mo_ta: moTa.value,
            img_url: update_imgFile.files[0] ? update_imgFile.files[0].name : prod.img_url,
            likes: parseInt(update_likes.value),
            luot_ban: parseInt(update_luot_ban.value),
            luot_xem: parseInt(update_luot_xem.value)
        }

        await fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        })
        .then(() => {
            navigationPage.innerHTML = ''
            update_catalog.innerHTML = ''
            updateModal.style.display = 'none'
            getProductsData()
            dialog_content.style.display = 'flex'
            dialog_content.style.backgroundColor = '#6B8A47'
            dialogIcon.innerHTML = `<span class="material-symbols-outlined">done</span>`
            dialogText.textContent = 'Sản phẩm đã được cập nhật';
            setTimeout(() => {
                tbody.style.opacity = 1
            }, 500)
            setTimeout(() => {
                dialog_content.style.display = 'none'
            }, 2000)
        })
    })
}

const cancelConfirmBtn = document.querySelector('.cancelConfirmBtn')
cancelConfirmBtn.addEventListener('click', () => {
    deleteConfirm.style.display = 'none'
})

getProductsData()

const header = document.getElementById('header')
const yellowTheme = document.querySelector('.yellow')
const pinkTheme = document.querySelector('.pink')
const greenTheme = document.querySelector('.green')
const blueTheme = document.querySelector('.blue')
const purpleTheme = document.querySelector('.purple')
const lightBlueTheme = document.querySelector('.light-blue')
const nudeTheme = document.querySelector('.nude')
const violetTheme = document.querySelector('.violet')
const greyTheme = document.querySelector('.grey')

const yellow = 'rgb(255, 255, 218)'
const pink = 'rgb(255, 228, 232)'
const blue = '#e6f1fe'
const green = '#f8ffd9'
const purple = 'rgb(232, 232, 255)'
const lightBlue = 'rgb(227, 245, 248)'
const nude = 'rgb(255, 235, 224)'
const grey = 'rgb(218,220,224)'
const violet = 'rgb(242, 232, 255)'

const modalHeading = document.querySelectorAll('.modal-heading')
const saveBtn = document.querySelectorAll('.saveBtn')

const loadTheme = async () => {
    const theme = await getTheme()
    theme.forEach((theme) => {
        modalHeading.forEach((item) => {
            item.style.backgroundColor = theme.color
        })
        saveBtn.forEach((item) => {
            item.style.backgroundColor = theme.color
        })
        header.style.backgroundColor = theme.color 
        addBtn.style.backgroundColor = theme.color
    })
}

yellowTheme.addEventListener('click', async () => {
    console.log(yellow)
    await fetch(`http://localhost:3000/api/theme/0`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({color: yellow})
    })
    .then(() => {
        loadTheme()
    })
})

pinkTheme.addEventListener('click', async () => {
    await fetch(`http://localhost:3000/api/theme/0`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({color: pink})
    })
    .then(() => {
        loadTheme()
    })
})

greenTheme.addEventListener('click', async () => {
    await fetch(`http://localhost:3000/api/theme/0`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({color: green})
    })
    .then(() => {
        loadTheme()
    })
})


blueTheme.addEventListener('click', async () => {
    await fetch(`http://localhost:3000/api/theme/0`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({color: blue})
    })
    .then(() => {
        loadTheme()
    })
})

purpleTheme.addEventListener('click', async () => {
    await fetch(`http://localhost:3000/api/theme/0`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({color: purple})
    })
    .then(() => {
        loadTheme()
    })
})

lightBlueTheme.addEventListener('click', async () => {
    await fetch(`http://localhost:3000/api/theme/0`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({color: lightBlue})
    })
    .then(() => {
        loadTheme()
    })
})

nudeTheme.addEventListener('click', async () => {
    await fetch(`http://localhost:3000/api/theme/0`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({color: nude})
    })
    .then(() => {
        loadTheme()
    })
})

greyTheme.addEventListener('click', async () => {
    await fetch(`http://localhost:3000/api/theme/0`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({color: grey})
    })
    .then(() => {
        loadTheme()
    })
})

violetTheme.addEventListener('click', async () => {
    await fetch(`http://localhost:3000/api/theme/0`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({color: violet})
    })
    .then(() => {
        loadTheme()
    })
})

loadTheme()