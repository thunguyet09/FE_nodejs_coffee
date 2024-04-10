const orderTable = document.getElementById('order-table')
const userId = localStorage.getItem('userId')
import { getOrders, getOrdersByUserId} from "./api.js"

const getOrder = async() => {
    const myOrders = await getOrdersByUserId(userId)
    const allOrders = await getOrders()
    showTableOrder(myOrders)
    overview(allOrders)
}

const showTableOrder = async (orderData) => {
    if(orderData.length == 0){
        const thead = document.querySelector('#order-table > thead')
        thead.innerHTML = ''
        const none_orders = document.createElement('div')
        none_orders.className = 'none-orders'
        none_orders.innerHTML = 'Bạn chưa có đơn hàng nào.'
        orderTable.appendChild(none_orders)
    }
    let totalExpense = 0;
    orderData.forEach((item) => {
        const tbody = document.createElement('tbody')
        orderTable.appendChild(tbody)
        const orderId = document.createElement('td')
        orderId.textContent = "#"+ item.order_id
        tbody.appendChild(orderId)
        const createdDate = document.createElement('td')
        createdDate.textContent = item.date
        tbody.appendChild(createdDate)
        const quantity = document.createElement('td')
        quantity.textContent = item.quantity
        tbody.appendChild(quantity)
        const total = document.createElement('td')
        total.innerHTML = `${parseInt(item.total, 10).toLocaleString()}&#8363;`
        tbody.appendChild(total)
        const status = document.createElement('td')
            status.className = 'status'
        tbody.appendChild(status)
        const statusBox = document.createElement('div')
        if(item.status === 0){
            statusBox.textContent = 'Đang chờ xác nhận'
            statusBox.style.backgroundColor = 'rgb(34,34,221,0.15)'
            statusBox.style.color = '#4959A5'
        }else if(item.status === 1){
            statusBox.style.backgroundColor = '#FFEADD'
            statusBox.style.color = '#C70039'
            statusBox.textContent = 'Đã xác nhận'
        }else if(item.status === 2){
            statusBox.style.backgroundColor = '#DDF2FD'
            statusBox.style.color = '#427D9D'
            statusBox.textContent = 'Đang giao hàng'
        }else if(item.status === 3){
            statusBox.style.backgroundColor = '#FAFDD6'
            statusBox.style.color = '#7A9D54'
            statusBox.textContent = 'Đã giao'
        }else{
            statusBox.style.backgroundColor = '#D8D9DA'
            statusBox.style.color = '#827E61'
            statusBox.textContent = 'Đã hủy'
        }
        status.appendChild(statusBox)
        const viewDetail = document.createElement('td')
            viewDetail.className = 'viewDetail'
        tbody.appendChild(viewDetail)
        const viewDetailBtn = document.createElement('button')
        viewDetailBtn.textContent = 'Chi tiết đơn hàng'
        viewDetailBtn.addEventListener('click', () => {
            document.location.href = `/src/order_detail.html?id=${item.order_id}`
        })
        viewDetail.appendChild(viewDetailBtn)
        totalExpense += parseInt(item.total);
    })
    await fetch(`http://localhost:3000/api/users/total/${userId}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({total: totalExpense})
    })

    const spendingTitle = document.querySelector('.spending > h4')
    if(orderData.length >= 0 && orderData.length < 20) {
        spendingTitle.textContent = 'Để nâng thứ hạng Thành viên Bạc'
    }else if(orderData.length >= 20 && orderData.length < 50){
        spendingTitle.textContent = 'Để nâng thứ hạng Thành viên Vàng'
    }else {
        spendingTitle.textContent = 'Để nâng thứ hạng Thành viên Kim Cương'
    }
    const orderLength = document.querySelector('.total-orders > span')
    const orderRange = document.getElementById('orderRange')
    if(orderData.length >= 0 && orderData.length < 20){
        orderRange.max = '20'
    }else if(orderData.length >= 20 && orderData.length < 50){
        orderRange.max = '50'
    }else if(orderData.length >= 50 && orderData.length < 200){
        orderRange.max = '200'
    }else {
        orderRange.max = '500'
    }
    orderLength.innerHTML = `Đơn hàng: ${orderData.length}/${orderRange.max}`
    orderRange.value = orderData.length
    const expense = document.querySelector('.expenditure > span')
    const totalRange = document.getElementById('totalRange')
    if(totalExpense >= 0 && totalExpense < 5000000){
        totalRange.max = '5000000'
    }else if(totalExpense >= 5000000 && totalExpense < 20000000){
        totalRange.max = '20000000'
    }else if(totalExpense >= 20000000 && totalExpense < 100000000){
        totalRange.max = '100000000'
    }else {
        totalRange.max = '500000000'
    }
    expense.innerHTML = `Chi tiêu: &#8363;${parseInt(totalExpense, 10).toLocaleString()}/&#8363;${parseInt(totalRange.max, 10).toLocaleString()}`
    totalRange.value = totalExpense
    const membership = document.querySelector('.membership')
    if(orderData.length < 20 && totalExpense < 5000000){
        membership.textContent = 'Thành viên'
    }else if(orderData.length >= 20 && orderData.length < 50 && totalExpense >= 5000000 && totalExpense < 20000000){
        membership.textContent = 'Thành viên Bạc'
    }else if(orderData.length >= 50 && orderData.length < 200 && totalExpense >= 20000000 && totalExpense < 100000000){
        membership.textContent = 'Thành viên Vàng'
    }else {
        membership.textContent = 'Thành viên Kim Cương'
    }
}

const pending = document.querySelector('.pending')
const confirmed = document.querySelector('.confirmed')
const inTransit = document.querySelector('.in-transit')
const delivered = document.querySelector('.delivered')
const cancelled = document.querySelector('.cancelled')
const overview = (orderData) => {
    const pendingOrder = orderData.filter((order) => order.status === 0 && order.user_id === userId)
    pending.innerHTML = `
        <p>Chờ xác nhận</p>
        <h2>${pendingOrder.length}</h2>`
    const confirmedOrder = orderData.filter((order) => order.status === 1 && order.user_id === userId)
    confirmed.innerHTML = `
        <p>Đã xác nhận</p>
        <h2>${confirmedOrder.length}</h2>`
    const inTransitOrder = orderData.filter((order) => order.status === 2 && order.user_id === userId)
    inTransit.innerHTML = `
        <p>Đang giao</p>
        <h2>${inTransitOrder.length}</h2>`
    const deliveredOrder = orderData.filter((order) => order.status === 3 && order.user_id === userId)
    delivered.innerHTML = `<p>Đã giao</p>
        <h2>${deliveredOrder.length}</h2>`
    const cancelledOrder = orderData.filter((order) => order.status === 4 && order.user_id === userId)
    cancelled.innerHTML = `
        <p>Đã hủy</p> 
        <h2>${cancelledOrder.length}</h2>`
}
getOrder()