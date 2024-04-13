import { getAPI, getOrderDetail, getOrders } from "../../js/api.js"
const products = await getAPI('products')
const orderDetail = await getOrderDetail()
const sortedProducts = products.sort((a,b) => b.luot_ban - a.luot_ban)
const orders = await getOrders()
const thisMonth = () => {
    const filteredOrder = orders.filter((val) => { 
        const dateParts = val.date.split('/');
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);
    
        const date = new Date(year, month, day);
        const currentDate = new Date();
    
        return date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
    });
    
    let prodName = []
    sortedProducts.forEach((val) => {
        prodName.push(val.name)
    })
    
    let filteredResults = [];
    
    filteredOrder.forEach((item) => {
        const filterOrderDetail = orderDetail.filter((val) => {
            return val.order_id == item.order_id;
        });
    
        filteredResults.push(...filterOrderDetail);
    });
    
    const summedArray = Object.values(
        filteredResults.reduce((accumulator, current) => {
            const { prod_id, product_quantity, product_name } = current;
            
            if (accumulator.hasOwnProperty(prod_id)) {
            accumulator[prod_id].product_quantity += product_quantity;
            } else {
            accumulator[prod_id] = { prod_id, product_quantity, product_name };
            }
            
            return accumulator;
        }, {})
    );
    
    const dataName = []
    const dataQuantity = []
    const ordersRevenue = orders.reduce((acc, cur) => acc + cur.total, 0);
    summedArray.forEach((item) => {
        dataName.push(item.product_name)
        dataQuantity.push(item.product_quantity)
    })
    const order_revenue = document.querySelector('.order-revenue')
    order_revenue.innerHTML = `${ordersRevenue.toLocaleString()}`
    const ctx = document.getElementById('myChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0.2, '#33b1ee'); 
    gradient.addColorStop(0.8, '#7366ff'); 
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataName,
            datasets: [{
                label: 'Lượt bán',
                data: dataQuantity,
                borderWidth: 1,
                backgroundColor: gradient
            }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
}

        //APEX CHARTS
        const chartData = {
        series: [
            {
                name: 'Series 1',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            },
        ],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
        };

        const chartOptions = {
            chart: {
                type: 'line',
            },
            series: chartData.series,
            xaxis: chartData.xaxis,
        };

        const chart = new ApexCharts(document.querySelector('#order-chart'), chartOptions);
        chart.render();


import { getTheme } from "../../js/api.js";
const highestProduct = document.querySelector('.checked')
const highestProductUl = document.querySelector('.times > ul')
let flag = false;
highestProduct.addEventListener('click', () => {
    flag = !flag
    if(flag){
        highestProductUl.style.visibility = 'visible'
        highestProductUl.style.opacity = '1'
    }else{
        highestProductUl.style.visibility = 'hidden'
        highestProductUl.style.opacity = '0'
    }
})

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

const loadTheme = async () => {
    const theme = await getTheme()
    theme.forEach((theme) => {
        header.style.backgroundColor = theme.color 
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
thisMonth()