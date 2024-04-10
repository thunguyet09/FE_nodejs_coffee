import { getCartByUserId } from "./api.js"
import { getUser } from "./api.js"
import { getDetailProduct } from "./api.js"
import { getOrders } from "./api.js"
import { getOrderDetail } from "./api.js"
const userId = localStorage.getItem('userId')
const dialog_content = document.getElementById('dialog-content')
const dialog_icon = document.querySelector('#dialog-content > span')
const dialogText = document.querySelector('.dialog-text')
const subtotal = localStorage.getItem('subtotal')
const quantity = localStorage.getItem('quantity')
const discount = localStorage.getItem('discount')
async function getUserInfo() {
    const user = await getUser(userId)
    const cart = await getCartByUserId(userId)
    order(user, cart)
}
const userElement = document.querySelector('.user_info')
const userOrder = document.querySelector('.user-order')
const productOrder = document.querySelector('.product-order')
const productOrderRow1 = document.createElement('div')
productOrder.appendChild(productOrderRow1)
const productOrderRow2 = document.createElement('div')
productOrder.appendChild(productOrderRow2)
const order = (user, carts) => {
    userElement.innerHTML = ''
    const groupControl1 = document.createElement('div')
    groupControl1.className = 'groupControl'
    userOrder.appendChild(groupControl1)
    const p1 = document.createElement('p')
    p1.innerHTML = `Full Name <b>*</b>`
    groupControl1.appendChild(p1)
    const fullName = document.createElement('input')
    fullName.value = user.full_name
    fullName.id = 'fullName'
    fullName.type = 'text'
    fullName.required = true
    groupControl1.appendChild(fullName)
    const groupControl2 = document.createElement('div')
    groupControl2.className = 'groupControl'
    userOrder.appendChild(groupControl2)
    const p2 = document.createElement('p')
    p2.innerHTML = `Email Address <b>*</b>`
    groupControl2.appendChild(p2)
    const email = document.createElement('input')
    email.value = user.email
    email.id = 'email'
    email.type = 'email'
    email.required = true
    groupControl2.appendChild(email)
    const groupControl3 = document.createElement('div')
    groupControl3.className = 'groupControl'
    userOrder.appendChild(groupControl3)
    const p3 = document.createElement('p')
    p3.innerHTML = `Phone <b>*</b>`
    groupControl3.appendChild(p3)
    const phone = document.createElement('input')
    if (user.phone) {
        phone.value = user.phone
    } else {
        phone.value = ''
    }
    phone.id = 'email'
    phone.type = 'number'
    phone.required = true
    groupControl3.appendChild(phone)

    const groupControl4 = document.createElement('div')
    groupControl4.className = 'groupControl'
    userOrder.appendChild(groupControl4)
    const p5 = document.createElement('p')
    p5.innerHTML = `Address <b>*</b>`
    groupControl4.appendChild(p5)
    const address = document.createElement('input')
    if (user.address) {
        address.value = user.address
    } else {
        address.value = ''
    }
    address.type = 'text'
    address.required = true
    groupControl4.appendChild(address)
    
    const orderRow2Title = document.createElement('div')
    orderRow2Title.className = 'order-row2-title'
    productOrder.appendChild(orderRow2Title)
    const productTitle = document.createElement('h2')
    productTitle.textContent = 'Product'
    orderRow2Title.appendChild(productTitle)
    const totalTitle = document.createElement('h2')
    totalTitle.textContent = 'Total'
    orderRow2Title.appendChild(totalTitle)
    const hr = document.createElement('hr')
    productOrder.appendChild(hr)
    const productMain = document.createElement('div')
    productMain.className = 'productMain'
    productOrder.appendChild(productMain)

    carts.forEach(async (item) => {
        const product = await getDetailProduct(item.prod_id)
        const productBox = document.createElement('div')
        productBox.className = 'productBox'
        productMain.appendChild(productBox)
        const productItem = document.createElement('div')
        productBox.appendChild(productItem)
        const imgProd = document.createElement('img')
        imgProd.src = `/public/img/${product.img_url}`
        imgProd.width = '60'
        imgProd.height = '60'
        imgProd.className = 'imgProd'
        productItem.appendChild(imgProd)
        const quantity = document.createElement('span')
        quantity.className = 'prodQuantity'
        quantity.textContent = item.quantity
        productItem.appendChild(quantity)
        const prodName = document.createElement('p')
        prodName.textContent = product.name
        productItem.appendChild(prodName)
        if(item.size == 'M'){
            const price_box = document.createElement('h3')
            const price = item.quantity * product.price
            price_box.innerHTML = `${parseInt(price, 10).toLocaleString()}&#8363;`
            productBox.appendChild(price_box)
        }else{
            const price_box = document.createElement('h3')
            const price = item.quantity * (product.price + 20000)
            price_box.innerHTML = `${parseInt(price, 10).toLocaleString()}&#8363;`
            productBox.appendChild(price_box)
        }
    })
    const subtotalBox = document.createElement('div')
    subtotalBox.className = 'subtotalBox'
    productOrder.appendChild(subtotalBox)
    const subtotalName = document.createElement('span')
    subtotalName.textContent = 'Subtotal'
    subtotalBox.appendChild(subtotalName)
    const subTotal = document.createElement('span')
    subTotal.innerHTML = `${parseInt(subtotal, 10).toLocaleString()}&#8363;`
    subtotalBox.appendChild(subTotal)
    let total_num = 0
    if(discount){
        const discountBox = document.createElement('div')
        discountBox.className = 'discountBox'
        productOrder.appendChild(discountBox)
        const discountName = document.createElement('span')
        discountName.textContent = 'Discount'
        discountBox.appendChild(discountName)
        const discountSpan = document.createElement('span')
        discountSpan.innerHTML = '-' + `${parseInt(discount, 10).toLocaleString()}&#8363;`
        discountBox.appendChild(discountSpan)

        const totalBox = document.createElement('div')
        totalBox.className = 'totalBox'
        productOrder.appendChild(totalBox)
        const totalName = document.createElement('span')
        totalName.textContent = 'Total'
        totalBox.appendChild(totalName)
        const total = document.createElement('span')
        total_num = subtotal - discount
        total.innerHTML = `${parseInt(total_num, 10).toLocaleString()}&#8363;`
        totalBox.appendChild(total)
    }else{
        const totalBox = document.createElement('div')
        totalBox.className = 'totalBox'
        productOrder.appendChild(totalBox)
        const totalName = document.createElement('span')
        totalName.textContent = 'Total'
        totalBox.appendChild(totalName)
        const total = document.createElement('span')
        total_num = localStorage.getItem('subtotal')
        total.innerHTML = `${parseInt(total_num, 10).toLocaleString()}&#8363;`
        totalBox.appendChild(total)
    }
    const noteOrder = document.createElement('input')
    noteOrder.className = 'noteOrder'
    noteOrder.type = 'text'
    noteOrder.placeholder = '* Ghi chú về đơn hàng'
    productOrder.appendChild(noteOrder)

    const paymentTitle = document.createElement('h4')
    paymentTitle.className = 'paymentTitle'
    paymentTitle.textContent = 'Phương thức thanh toán'
    productOrder.appendChild(paymentTitle)
    const paymentMethod = ['momo', 'cod']
    let payment_method;
    let flag = false;
    paymentMethod.forEach((item) => {
        const paymentBox = document.createElement('div')
        paymentBox.className = 'paymentBox'
        productOrder.appendChild(paymentBox)
        const paymentElement = document.createElement('div')
        paymentElement.className = 'paymentElement'
        paymentBox.appendChild(paymentElement)
        const paymentRadio = document.createElement('input')
        paymentRadio.type = 'radio'
        paymentRadio.value = item
        paymentRadio.name = 'payment'
        paymentElement.appendChild(paymentRadio)
        paymentRadio.addEventListener('click', (e) => {
            const otherRadioButtons = document.querySelectorAll('input[type="radio"][name="payment"]');
            payment_method = paymentRadio.value
            paymentRadio.checked = true;
            flag = true;
            otherRadioButtons.forEach((radioButton) => {
                if (radioButton !== paymentRadio) {
                    radioButton.checked = false;
                }
            });
        })
        const paymentName = document.createElement('label')
        if (item === 'momo') {
            paymentName.textContent = 'Thanh toán qua ví Momo'
        } else {
            paymentName.textContent = 'Thanh toán khi nhận hàng (COD)'
        }
        paymentElement.appendChild(paymentName)
        const logoPayment = document.createElement('img')
        logoPayment.width = '25'
        logoPayment.height = '25'
        if (item === 'momo') {
            logoPayment.src = '/public/img/momo.webp'
        } else {
            logoPayment.src = '/public/img/cash.png'
        }
        paymentBox.appendChild(logoPayment)
    })

    const checkoutElement = document.createElement('div')
    checkoutElement.className = 'checkoutBtn'
    productOrder.appendChild(checkoutElement)
    const checkoutBtn = document.createElement('button')
    checkoutBtn.className = 'checkoutBtn'
    checkoutBtn.textContent = 'PLACE ORDER'
    checkoutElement.appendChild(checkoutBtn)

    let addressValue = ''
    address.addEventListener('change', (e) => {
        addressValue = e.target.value

        checkoutBtn.addEventListener('click', async(e) => {
            e.preventDefault()
            if(flag === false){
                dialog_content.style.backgroundColor = '#dc3545'
                dialog_icon.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`
                dialogText.textContent = 'Vui lòng chọn phương thức thanh toán';
                dialog_content.style.display = 'flex'
                setTimeout(() => {
                    dialog_content.style.display = 'none'
                }, 2000)
            }else if(fullName.value == '' || address.value == '' || phone.value == '' || email.value == ''){
                dialog_content.style.backgroundColor = '#dc3545'
                dialog_icon.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`
                dialogText.textContent = 'Chưa có thông tin giao hàng';
                dialog_content.style.display = 'flex'
                setTimeout(() => {
                    dialog_content.style.display = 'none'
                }, 2000)
            }else {
                const user = {
                    full_name: fullName.value,
                    phone: phone.value,
                    address: addressValue,
                }

                const userName = document.createElement('li')
                userName.innerHTML = `Họ và tên: ${user.full_name}`
                userElement.appendChild(userName)
                const userPhone = document.createElement('li')
                userPhone.innerHTML = `Số điện thoại: ${user.phone}`
                userElement.appendChild(userPhone)
                const userAddress = document.createElement('li')
                userAddress.innerHTML = `Địa chỉ: ${user.address}`
                userElement.appendChild(userAddress)
                localStorage.removeItem('discount')
                localStorage.removeItem('voucher')
                newOrder(total_num, quantity, noteOrder.value, payment_method, fullName.value, addressValue, phone.value)
            }
        })
    })
}

const orders = await getOrders()
const newOrder = async (total, quantity, noteOrder, paymentMethod, fullname, address, phone) => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()
    const hour = currentDate.getHours()
    const minute = currentDate.getMinutes()
    let formatDate;
    if(minute < 10 && minute < 10){
        formatDate = day + "/" + month + "/" + year + " " + "0"+ hour + ":" + "0" + minute
    }else if(hour < 10){
        formatDate = day + "/" + month + "/" + year + " " + "0"+ hour + ":" + minute
    }else if(minute < 10){
        formatDate = day + "/" + month + "/" + year + " " + hour + ":" + "0" + minute
    }else{
        formatDate = day + "/" + month + "/" + year + " " + hour + ":" + minute
    }
    
    const id = orders[orders.length - 1].order_id + 1
    const order = {
        date: formatDate,
        da_tra: paymentMethod == 'cod' ? 0 : '',
        discount: discount ? discount : 0,
        note: noteOrder,
        order_id: id,
        payment_method: paymentMethod,
        quantity: quantity,
        status: 0,
        user_id: userId,
        total: total,
        full_name: fullname,
        phone: phone,
        address: address
    }
    await fetch(`http://localhost:3000/api/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(() => {
        handleOrderDetail(id)
        dialog_content.style.backgroundColor = '#6B8A47'
        dialog_icon.innerHTML = `<span class="material-symbols-outlined">done</span>`
        dialogText.textContent = 'Đặt hàng thành công';
        dialog_content.style.display = 'flex'
        setTimeout(() => {
            dialog_content.style.display = 'none'
        }, 4000)
    })
}

const product = async () => {
    const product = await fetch('https://coffeejs-ac308-default-rtdb.firebaseio.com/products.json')
    const productData = await product.json()
    
    const cart = await fetch('https://coffeejs-ac308-default-rtdb.firebaseio.com/cart.json')
    const cartData = await cart.json()
    const cartArr = []
    for (const key in cartData) {
        if (cartData.hasOwnProperty(key)) {
            cartArr.push(cartData[key]);
        }
    }
    const matchingElements = []
    const elementNotNull = cartArr.filter((item => item !== null))
    productData.forEach((prod) => {
        elementNotNull.forEach((cart) => {
            if(prod.id === cart.prod_id && cart.user_id === userId){
                matchingElements.push(prod)
            }
        })
    })
}
const handleOrderDetail = async(orderId) => {
    const cart = await getCartByUserId(userId)
    for(let i = 0; i < cart.length; i++){
        const product = await getDetailProduct(cart[i].prod_id)
        if(cart[i].prod_id == product.id){
            const luotBan = parseInt(product.luot_ban) + parseInt(cart[i].quantity)
            const quantity = parseInt(product.quantity) - parseInt(cart[i].quantity)
            await fetch(`http://localhost:3000/api/products/${cart[i].prod_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({quantity: quantity, luot_ban: luotBan})
            })
            .then(async () => {
                await getDetailProduct(cart[i].prod_id)
            })
        }
    }
    orderDetailDataFunc(orderId, cart)
}

const confirmOrder = document.getElementById('myModal')
const orderDetailDataFunc = async(orderId, cart) => {
    for(let i = 0; i < cart.length; i++){
        const product = await getDetailProduct(cart[i].prod_id)
        const order_detail = await getOrderDetail()
        const order_detail_id = order_detail[order_detail.length - 1].order_detail_id + 1
        let subtotal = 0;
        if(cart[i].size == 'M'){
            subtotal = product.price * cart[i].quantity
        }else{
            subtotal = (product.price + 20000) * cart[i].quantity
        }
        const newOrderDetail = {
          order_detail_id: order_detail_id,
          order_id: orderId,
          prod_id: product.id,
          product_name: product.name,
          product_price: cart[i].size == 'M' ? product.price : (product.price + 20000),
          product_quantity: cart[i].quantity,
          size: cart[i].size,
          subtotal: subtotal,
        };
        await fetch(`http://localhost:3000/api/orderdetail`,
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrderDetail),
            }
        )
        .then(async () => {
            await fetch(`http://localhost:3000/api/cart/${cart[i].id}`, {
                method: 'DELETE',
            })
        })
        .then(() => {
            confirmOrder.style.display = 'block'
        })
    }
}

const cart = document.querySelector('.shoppingCart > a')
cart.addEventListener('click', () => {
    window.location.href = '/src/cart.html'
})

const closeBtn = document.querySelector('.close')
closeBtn.addEventListener('click', () => {
    localStorage.removeItem('info')
   document.location.href = '/src/home.html'
})

const viewOrderBtn = document.querySelector('.view-order > button')
viewOrderBtn.addEventListener('click', async () => {
    const id = orders[orders.length - 1].order_id + 1
    localStorage.removeItem('info')
    document.location.href = `/src/order_detail.html?id=${id}`
})
product()
getUserInfo()

