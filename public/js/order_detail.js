import { getOrders, getOrdersById, getOrderDetailByOrderId, getDetailProduct, getComments, getOrderDetail } from "./api.js";

const userId = localStorage.getItem('userId')
const currentUrl = window.location.search;
const urlParams = new URLSearchParams(currentUrl);
const orderId = parseInt(urlParams.get('id'));
const cancelBtn = document.querySelector('.order-detail-btns > .cancel')
const skipBtn = document.querySelector('.order-detail-btns > .skip')
const tbody = document.querySelector('table > tbody')


function goToProductDetail(id) {
    window.location.href = `./detail.html?id=${id}`
}

const ma_don = document.querySelector('.order-id')
const order_status = document.querySelector('.order-status')
const note = document.querySelector('.note')
const paymentMethod = document.querySelector('.payment-method')
const total = document.querySelector('.total')
const needToPay = document.querySelector('.need-to-pay')

const customerName = document.querySelector('.customer-name')
const customerPhone = document.querySelector('.phone')
const customerAddress = document.querySelector('.address')
const showUserInfo = async () => {
    const user = await getOrdersById(orderId)
    user.forEach((item) => {
        customerName.innerHTML = `<b>${item.full_name}</b>`
        customerPhone.innerHTML = `Số điện thoại: ${item.phone}`
        customerAddress.innerHTML = `Địa chỉ: ${item.address}`
    })
}

const totalQuantityElement = document.querySelector('.total-quantity')
const subtotal = document.querySelector('.subtotalBox > .subtotal')
const discount = document.querySelector('.discount')
const order_detail = await getOrderDetailByOrderId(orderId)
const orders = await getOrders()
const myOrders = orders.filter((item) => item.user_id == userId && item.order_id == orderId)
const table = document.querySelector('table')
const showProduct = async () => {
    myOrders.forEach((res) => {
        if (res.admin) {
            ma_don.innerHTML = `
                <h3>Đơn hàng: <b>#${res.order_id}</b></h3>
                <p>${res.date} | <span>NV tư vấn: ${res.admin}</span></p>
            `
        } else {
            ma_don.innerHTML = `
                <h3>Đơn hàng: <b>#${res.order_id}</b></h3>
                <p>${res.date} | <span>NV tư vấn:</span></p>
            `
        }
        if (res.status === 0) {
            order_status.style.backgroundColor = 'rgb(34,34,221,0.15)'
            order_status.style.color = '#4959A5'
            order_status.innerHTML = `<h3>Đang chờ xác nhận</h3>`
        } else if (res.status === 1) {
            order_status.style.backgroundColor = '#FFEADD'
            order_status.style.color = '#C70039'
            order_status.innerHTML = `<h3>Đã xác nhận</h3>`
        } else if (res.status === 2) {
            order_status.style.backgroundColor = '#DDF2FD'
            order_status.style.color = '#427D9D'
            order_status.innerHTML = `<h3>Đang giao hàng</h3>`
        } else if (res.status === 3) {
            order_status.style.backgroundColor = '#FAFDD6'
            order_status.style.color = '#7A9D54'
            order_status.innerHTML = `<h3>Đã giao</h3>`
            cancelBtn.textContent = 'Mua lại'
            cancelBtn.addEventListener('click', () => {
                window.location.href = '/html/product.html'
            })
        } else {
            order_status.style.backgroundColor = '#D8D9DA'
            order_status.style.color = '#827E61'
            order_status.innerHTML = `<h3>Đã hủy</h3>`
            cancelBtn.textContent = 'Mua lại'
            cancelBtn.addEventListener('click', () => {
                window.location.href = '/html/product.html'
            })
        }
        note.innerHTML = `
            <h3>Ghi chú:</h3>
            <p>${res.note}</p>
        `
        paymentMethod.innerHTML = `
            <h3>${res.payment_method}</h3>
            <p>${parseInt(res.total, 10).toLocaleString()}&#8363;</p>
        `

        if (res.discount > 0) {
            let total_after = res.total - res.discount
            total.innerHTML = `
                <p>${parseInt(total_after, 10).toLocaleString()}&#8363;</p>
            `
            needToPay.innerHTML = `${parseInt(total_after, 10).toLocaleString()}&#8363;`
        } else {
            total.innerHTML = `
                <p>${parseInt(res.total, 10).toLocaleString()}&#8363;</p>
            `
            needToPay.innerHTML = `${parseInt(res.total, 10).toLocaleString()}&#8363;`
        }

        if (res.discount > 0) {
            discount.innerHTML = `
                <h4>Khuyến mãi</h4>
                <p>- ${parseInt(res.discount, 10).toLocaleString()}&#8363;</p>
            `
        }
        subtotal.innerHTML = `
            <p>${parseInt(res.total, 10).toLocaleString()}&#8363;</p>
        `
        totalQuantityElement.innerHTML = `
            <h3>Cần thanh toán</h3>
            <p>(Số lượng: ${res.quantity})</p>
        `
    })
}

const comments = await getComments()
const reviewModal = document.getElementById('myModal')
const modalProduct = document.querySelector('.modal-product')
const stars = document.querySelectorAll('.star')
const modalText = document.querySelector('.modal-text')
const sendReview = document.querySelector('.send-review > button')

const dialog_content = document.getElementById('dialog-content')
const dialog_icon = document.querySelector('#dialog-content > span')
const dialogText = document.querySelector('.dialog-text')
const review = async () => {
    order_detail.forEach(async (item) => {
        const product = await getDetailProduct(item.prod_id)
        const tr = document.createElement('tr')
        tbody.appendChild(tr)
        const image = document.createElement('td')
        image.style.cursor = 'pointer'
        image.addEventListener('click', () => goToProductDetail(item.prod_id))
        tr.appendChild(image)
        const imageElement = document.createElement('img')
        imageElement.src = `/public/img/${product.img_url}`
        imageElement.width = '70'
        imageElement.height = '70'
        image.appendChild(imageElement)
        const productName = document.createElement('td')
        productName.className = 'prodName'
        productName.textContent = item.product_name
        tr.appendChild(productName)
        productName.addEventListener('click', () => goToProductDetail(prod.id))
        const quantity = document.createElement('td')
        quantity.textContent = item.product_quantity
        tr.appendChild(quantity)
        const price = document.createElement('td')
        price.innerHTML = `${parseInt(item.product_price, 10).toLocaleString()}&#8363;`
        tr.appendChild(price)
        const subtotal = document.createElement('td')
        subtotal.innerHTML = `${parseInt(item.subtotal, 10).toLocaleString()}&#8363;`
        tr.appendChild(subtotal)
        myOrders.forEach(async (res) => {
            if (res.status === 3) {
                const filterComment = comments.filter((val) => val.prod_id == item.prod_id && val.user_id == userId && val.order_id == orderId && val.order_detail_id == item.order_detail_id)
                if (filterComment.length === 0) {
                    const reviewElement = document.createElement('td')
                    tr.appendChild(reviewElement)
                    const reviewBtn = document.createElement('button')
                    reviewBtn.className = 'reviewBtn'
                    reviewElement.appendChild(reviewBtn)
                    reviewElement.style.width = '170px'
                    const thead = document.querySelector('thead > tr')
                    const write_reviews_th = document.createElement('th')
                    thead.appendChild(write_reviews_th)
                    reviewBtn.innerHTML = `
                            <span class="material-symbols-outlined">edit_note</span>
                            <p>Viết đánh giá</p>
                        `
                    reviewBtn.addEventListener('click', async () => {
                        modalProduct.innerHTML = ''
                        reviewModal.style.display = 'block'
                        const product = await getDetailProduct(item.prod_id)
                        const img = document.createElement('img')
                        img.src = `/public/img/${product.img_url}`
                        img.width = 100
                        img.height = 120
                        modalProduct.appendChild(img)
                        const productElement = document.createElement('div')
                            productElement.className = 'productElement'
                            modalProduct.appendChild(productElement)
                            const productName = document.createElement('div')
                            productElement.appendChild(productName)
                            const prodName = document.createElement('h3')
                            prodName.textContent = product.name
                            productName.appendChild(prodName)
                            const quantity = document.createElement('p')
                            quantity.textContent = "x" + item.product_quantity
                            productName.appendChild(quantity)
                            const price = document.createElement('h4')
                            price.innerHTML = `${parseInt(item.product_price, 10).toLocaleString()}&#8363; / ${item.size}`
                            productElement.appendChild(price)

                            sendReview.addEventListener('click', async () => {
                                tbody.innerHTML = ''
                                const contentValue = modalText.childNodes[3].value;
                                const currentDate = new Date()
                                const year = currentDate.getFullYear()
                                const month = currentDate.getMonth() + 1
                                const day = currentDate.getDate()
                                const commentDate = day + "/" + month + "/" + year
                                const comments = await getComments()
                                const commentId = comments[comments.length - 1].id + 1
                                const comment = {
                                    order_id: orderId,
                                    order_detail_id: item.order_detail_id,
                                    date: commentDate,
                                    content: contentValue === '' ? '' : contentValue,
                                    id: commentId,
                                    prod_id: item.prod_id,
                                    stars: value,
                                    user_id: userId
                                }
                                await fetch(`http://localhost:3000/api/comments`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(comment)
                                })
                                .then(() => {
                                    reviewElement.style.width = '0px';
                                    reviewModal.style.display = 'none';
                                    dialog_content.style.backgroundColor = '#FFCC70';
                                    dialog_content.style.color = 'black';
                                    dialog_icon.innerHTML = '<i class="fa-solid fa-check"></i>';
                                    dialogText.textContent = 'Bình luận của bạn đã được gửi';
                                    dialog_content.style.display = 'flex';
                                    setTimeout(() => {
                                        window.location.href = `/src/order_detail.html?id=${orderId}`;
                                        dialog_content.style.display = 'none';
                                    }, 2000);
                                })
                            })

                        modalText.innerHTML = `
                            <h3>Viết đánh giá</h3>
                            <textarea cols="61" rows="5" placeholder="Viết đánh giá của bạn..."></textarea>
                        `
                        let value = 0
                        stars.forEach((star) => {
                            star.addEventListener('click', (e) => {
                                value = parseInt(e.target.getAttribute('data-value'))
                                stars.forEach((item) => {
                                    if (parseInt(item.childNodes[0].getAttribute('data-value')) <= value) {
                                        item.classList.add('active')
                                    } else {
                                        item.classList.remove('active')
                                    }
                                })
                            })
                        })
                    })
                }
            }
        })
    })
}

skipBtn.addEventListener('click', () => {
    document.location.href = '/src/orders.html'
})

cancelBtn.addEventListener('click', async () => {
    const order = await fetch(`https://coffeejs-ac308-default-rtdb.firebaseio.com/orders/${orderId}.json`)
    const orderData = await order.json()
    if (orderData.status === 0) {
        await fetch(`https://coffeejs-ac308-default-rtdb.firebaseio.com/orders/${orderId}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order_id: orderId, status: 4 })
        })
            .then(async () => {
                const orderDetail = await fetch(`https://coffeejs-ac308-default-rtdb.firebaseio.com/order_detail.json`)
                const orderDetailResponse = await orderDetail.json()
                const filteredOrderDetail = orderDetailResponse.filter((item) => item.order_id === orderId)
                return filteredOrderDetail
            })
            .then((orderDetailData) => {
                orderDetailData.forEach(async (item) => {
                    const product = await fetch(`https://coffeejs-ac308-default-rtdb.firebaseio.com/products.json`)
                    const productData = await product.json()
                    const productItems = productData.filter((prod) => prod.id === item.prod_id)
                    let quantityUpdate = item.product_quantity
                    productItems.forEach(async (prod) => {
                        await fetch(`https://coffeejs-ac308-default-rtdb.firebaseio.com/products/${prod.id}.json`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ id: prod.id, quantity: parseInt(prod.quantity + quantityUpdate), luot_ban: parseInt(prod.luot_ban - quantityUpdate) })
                        })
                    })
                })
            })
            .then(() => {
                dialog_content.style.backgroundColor = '#C7A17A'
                dialog_icon.innerHTML = `<i class="fa-solid fa-check"></i>`
                dialogText.textContent = 'Đơn hàng đã bị hủy';
                dialog_content.style.display = 'flex'
                setTimeout(() => {
                    dialog_content.style.display = 'none'
                }, 2000)
            })
            .then(() => {
                setTimeout(() => {
                    document.location.href = '/html/order.html'
                }, 5000)
            })
    } else {
        cancelBtn.disabled = true
        dialog_content.style.backgroundColor = '#dc3545'
        dialog_icon.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`
        dialogText.textContent = 'Đơn hàng không thể hủy';
        dialog_content.style.display = 'flex'
        setTimeout(() => {
            dialog_content.style.display = 'none'
        }, 2000)
    }
})


const closeBtn = document.querySelector('.close')
closeBtn.addEventListener('click', () => {
    tbody.innerHTML = ''
    table.style.opacity = 0
    review()
    setTimeout(() => {
        table.style.opacity = 1
        table.style.transition = '.3s ease'
    }, 500)
    reviewModal.style.display = 'none'
})
showUserInfo()
showProduct()
review()
