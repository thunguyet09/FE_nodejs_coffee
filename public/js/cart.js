import { getCartByUserId, getUser } from "./api.js"
import { getDetailProduct } from "./api.js"
import { getVoucher } from "./api.js"
import { getVoucherByCode } from "./api.js"

const userId = localStorage.getItem('userId')
const getCart = async () => {
    const cart = await getCartByUserId(userId)
    cartTable(cart)
}

const dialogContent = document.getElementById('dialog-content')
const dialogIcon = document.querySelector('#dialog-content > span')
const dialogText = document.querySelector('.dialog-text')
const table = document.getElementById('table')
const checkout = document.querySelector('.checkout')
const subtotal = document.createElement('div')
    subtotal.className = 'subtotal'
    checkout.appendChild(subtotal)
const subtotal_text = document.createElement('h3')
    subtotal_text.textContent = 'Subtotal'
    subtotal.appendChild(subtotal_text)
const subtotal_num = document.createElement('p')
    subtotal.appendChild(subtotal_num)

const voucher = document.createElement('div')
    voucher.className = 'voucher'
    checkout.appendChild(voucher)
const voucher_text = document.createElement('h3')
    voucher.appendChild(voucher_text)
const voucher_num = document.createElement('span')
    voucher_num.className = 'discount'
    voucher.appendChild(voucher_num)
const checkout_quantity = document.createElement('div')
    checkout_quantity.className = 'quantity'
checkout.appendChild(checkout_quantity)
const checkout_quantity_text = document.createElement('h3')
    checkout_quantity_text.textContent = 'Quantity'
checkout_quantity.appendChild(checkout_quantity_text)
const checkout_quantity_num = document.createElement('p')
checkout_quantity.appendChild(checkout_quantity_num)

const shipping = document.createElement('div')
    shipping.className = 'shipping'
    checkout.appendChild(shipping)
const shipping_text = document.createElement('h3')
    shipping_text.textContent = 'Shipping'
    shipping.appendChild(shipping_text)
const shipping_fee = document.createElement('p')
    shipping_fee.innerHTML = `
        <p>Enter your address to view shipping options.</p>
        <h4>Calculate shipping</h4>
    `
    shipping.appendChild(shipping_fee)
const hr = document.createElement('hr')
    checkout.appendChild(hr)
const total = document.createElement('div')
    total.className = 'total'
    checkout.appendChild(total)
const total_text = document.createElement('h3')
    total_text.textContent = 'Total'
    total.appendChild(total_text)
const total_num = document.createElement('h2')
    total.appendChild(total_num)
const checkoutBtn = document.createElement('button')
    checkoutBtn.className = 'checkoutBtn'
    checkoutBtn.textContent = 'CHECKOUT'
    checkout.appendChild(checkoutBtn)

    checkoutBtn.addEventListener('click', () => {
        document.location.href = '/src/checkout.html'
    })
const cartTable = (data) => {
    if(data.length === 0){
        table.innerHTML = '<h3 class="no-items-in-cart">Chưa có sản phẩm trong giỏ hàng.</h3>'
        checkoutBtn.disabled = true;
    }
    data.forEach(async (item) => {
        const product = await getDetailProduct(item.prod_id)
        const tbody = document.createElement('tbody')
        table.appendChild(tbody)

        const td1 = document.createElement('td')
            td1.className = 'removeBtn'
            td1.innerHTML = `<i class="fa-solid fa-trash"></i>`
            td1.childNodes[0].addEventListener('click', async() => {
                    await fetch(`https://coffeejs-ac308-default-rtdb.firebaseio.com/cart/${item.id}.json`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(() => {
                    table.innerHTML = ''
                    cartBox.innerHTML = ''
                    getCart()
                    itemsInCart()
                    showCheckout()
                })
            })
            tbody.appendChild(td1)
        const td2 = document.createElement('td')
            td2.className = 'td2'
        const img = document.createElement('img')
            img.src = `/public/img/${product.img_url}`
            img.width = '80'
            td2.appendChild(img)
        const cartName = document.createElement('h3')
            cartName.textContent = product.name 
            td2.appendChild(cartName)
            tbody.appendChild(td2)
            cartName.addEventListener('click', () => {
                document.location.href = `/src/detail.html?id=${product.id}`
            })

        const size = document.createElement('td')
            size.className = 'size'
            size.textContent = item.size
            tbody.appendChild(size)
        if(item.size == 'M'){
            const td3 = document.createElement('td')
            const price = parseInt(product.price, 10);
            td3.innerHTML = `${price.toLocaleString()}&#8363;`
            tbody.appendChild(td3)
        }else{
            const td3 = document.createElement('td')
            let priceL = product.price + 20000
            const price = parseInt(priceL, 10);
            td3.innerHTML = `${price.toLocaleString()}&#8363;`
            tbody.appendChild(td3)
        }
        const td4 = document.createElement('td')
            td4.className = 'quantity'
            const inputQuantity = document.createElement('input')
            inputQuantity.type = 'number'
            inputQuantity.value = item.quantity 
            td4.appendChild(inputQuantity)
            tbody.appendChild(td4)

            const td5 = document.createElement('td')
            td5.className = 'td5'
            tbody.appendChild(td5)  
            if(item.size == 'M'){
                const subtotal = inputQuantity.value * product.price
                const formattedSubtotal = parseInt(subtotal, 10);
                td5.innerHTML = `${formattedSubtotal.toLocaleString()}&#8363;`
            }else{
                const subtotal = inputQuantity.value * (product.price + 20000)
                const formattedSubtotal = parseInt(subtotal, 10);
                td5.innerHTML = `${formattedSubtotal.toLocaleString()}&#8363;`
            }
            inputQuantity.addEventListener('change', async() => {   
                if(inputQuantity.value < 1) {
                    inputQuantity.value = 1;
                    showCheckout()
                }else {
                    console.log(item.prod_id)
                    let new_quantity = parseInt(inputQuantity.value)
                    await fetch(`http://localhost:3000/api/cart/${item.prod_id}/${userId}/${item.size}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            quantity: new_quantity
                        })
                    })
                    .then((res) => res.json())
                    .then(() => {
                        cartBox.innerHTML = '';
                        showCheckout()
                    })
                }
                if(item.size == 'M'){
                    const subtotal = inputQuantity.value * product.price
                    const formattedSubtotal = parseInt(subtotal, 10);
                    td5.innerHTML = `${formattedSubtotal.toLocaleString()}&#8363;`
                }else{
                    const subtotal = inputQuantity.value * (product.price + 20000)
                    const formattedSubtotal = parseInt(subtotal, 10);
                    td5.innerHTML = `${formattedSubtotal.toLocaleString()}&#8363;`
                }
            })
    }) 
}

const voucher_data = await getVoucher()
const currentDate = new Date()
const showCheckout = async () => {
    let total = 0;
    let subTotal = 0;
    let so_luong = 0;
    let price = 0

    const cart = await getCartByUserId(userId)
    cart.forEach(async (item) => {
        const product = await getDetailProduct(item.prod_id)
        if(item.size == 'M'){
            price = product.price
        }else{
            price = product.price + 20000
        }

        subTotal += item.quantity * price
        so_luong += item.quantity 
        total = subTotal 
        if(localStorage.getItem('discount')){
            total = total - localStorage.getItem('discount')
            updateCheckout(localStorage.getItem('discount'), subTotal, so_luong, total)
        }else{
            let discount = 0
            updateCheckout(discount, subTotal, so_luong, total)
        }
    })

    const voucher_code = document.getElementById('coupon_code')
    const voucherBtn = document.getElementById('apply-coupon')
    const user = await getUser(userId)
    voucherBtn.addEventListener('click', async () => {
        let vouchers = []
        user.vouchers.forEach((item) => {
            vouchers.push(item)
        })
        vouchers.push(voucher_code.value)
        const voucherByCode = await getVoucherByCode(voucher_code.value)
        const newDate = voucherByCode.expiredDate
            const splitDate = newDate.split(' ')
            const splitDate2 = splitDate[0].split('/')
            const date = new Date(splitDate2[2], splitDate2[1] - 1, splitDate2[0])
            if(voucher_code.value == voucherByCode.voucher_code && currentDate <= date){
                await fetch(`http://localhost:3000/api/users/voucher/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        vouchers: vouchers
                    })
                })
                localStorage.setItem('voucher', voucherByCode.voucher_code)
                localStorage.setItem('subtotal', total)
                let discount = (total * voucherByCode.discount) / 100
                total = subTotal - discount
                localStorage.setItem('discount', discount)

                dialogContent.style.display = 'flex';
                dialogContent.style.backgroundColor = '#6B8A47';
                dialogContent.style.color = 'white';
                dialogText.textContent = 'Voucher đã được áp dụng';
                dialogIcon.innerHTML = `<span class="material-symbols-outlined">done</span>`;
                setTimeout(() => {
                    dialogContent.style.display = 'none';
                    dialogContent.style.backgroundColor = '';
                    dialogContent.style.color = '';
                    dialogText.textContent = '';
                    dialogIcon.innerHTML = '';
                }, 4000);
                updateCheckout(discount, subTotal, so_luong, total)
            }else{
                console.log(total)
                let discount = 0
                voucher_text.textContent = ''
                voucher_num.innerHTML = ''
                localStorage.removeItem('voucher');
                localStorage.removeItem('discount')
                dialogContent.style.display = 'flex';
                dialogContent.style.backgroundColor = '#C5041B';
                dialogContent.style.color = 'white';
                dialogText.textContent = 'Voucher đã hết hạn sử dụng';
                dialogIcon.innerHTML = `<span class="material-symbols-outlined">error</span>`;
                setTimeout(() => {
                    dialogContent.style.display = 'none';
                    dialogContent.style.backgroundColor = '';
                    dialogContent.style.color = '';
                    dialogText.textContent = '';
                    dialogIcon.innerHTML = '';
                }, 4000);
                updateCheckout(discount, subTotal, so_luong, total)
            }
    })
}

const updateCheckout = (discount, subTotal, so_luong, total) => {
    localStorage.setItem('quantity', so_luong)
    localStorage.setItem('subtotal', subTotal)
    if(localStorage.getItem('voucher')){
        voucher_text.textContent = 'Voucher'
        voucher_num.innerHTML = `- ${parseInt(discount,10).toLocaleString()}&#8363;`
    }
    subtotal_num.innerHTML = `${parseInt(subTotal,10).toLocaleString()}&#8363;`
    checkout_quantity_num.textContent = so_luong
    total_num.innerHTML =  `${parseInt(total,10).toLocaleString()}&#8363;`
}

showCheckout()
getCart()

