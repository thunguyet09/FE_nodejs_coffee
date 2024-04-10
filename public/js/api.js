
export const getAPI = async (endpoint) => {
    const response = await fetch(`http://localhost:3000/api/${endpoint}`)
    const data = await response.json()
    return data
}

export const getLatestProducts = async () => {
    const response = await fetch(`http://localhost:3000/api/products/latest`, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    const data = await response.json()
    return data
}
export const getDetailProduct = async (id) => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`)
    const data = await response.json()
    return data
}

export const getPagePagination = async(page,limit) => {
    const response = await fetch(`http://localhost:3000/api/products/page/${page}/limit/${limit}`)
    const data = await response.json()
    return data
}

export const getProductsByCategoryId = async(id) => {
    const response = await fetch(`http://localhost:3000/api/products/categoryid/${id}`)
    const data = await response.json()
    return data
}

export const searchProducts = async(name) => {
    const response = await fetch(`http://localhost:3000/api/products/search/${name}`)
    const data = await response.json()
    return data
}

export const sortProductsAsc = async() => {
    const response = await fetch(`http://localhost:3000/api/products/sort/asc`)
    const data = await response.json()
    return data
}

export const sortProductsDesc = async() => {
    const response = await fetch(`http://localhost:3000/api/products/sort/desc`)
    const data = await response.json()
    return data
}

export const getUser = async (id) => {
    const response = await fetch(`http://localhost:3000/api/users/${id}`)
    const data = await response.json()
    return data
}

export const getCart = async () => {
    const response = await fetch(`http://localhost:3000/api/cart`)
    const data = await response.json()
    return data
}

export const getCartByUserId = async (userId) => {
    const response = await fetch(`http://localhost:3000/api/cart/${userId}`)
    const data = await response.json()
    return data
}

export const cartExists = async (productId,userId,size) => {
    const response = await fetch(`http://localhost:3000/api/cart/${productId}/${userId}/${size}`)
    const data = await response.json()
    return data
}

export const getVoucher = async () => {
    const response = await fetch(`http://localhost:3000/api/voucher`)
    const data = await response.json()
    return data
}

export const getAllUser = async () => {
    const response = await fetch(`http://localhost:3000/api/users`)
    const data = await response.json()
    return data
}

export const getVoucherByCode = async (code) => {
    const response = await fetch(`http://localhost:3000/api/voucher/${code}`)
    const data = await response.json()
    return data
}

export const getOrders = async () => {
    const response = await fetch(`http://localhost:3000/api/orders`)
    const data = await response.json()
    return data
}

export const getOrderDetail = async () => {
    const response = await fetch(`http://localhost:3000/api/orderdetail`)
    const data = await response.json()
    return data
}

export const getOrdersByUserId = async (id) => {
    const response = await fetch(`http://localhost:3000/api/orders/${id}`)
    const data = await response.json()
    return data
}

export const getOrdersById = async (id) => {
    const response = await fetch(`http://localhost:3000/api/order/${id}`)
    const data = await response.json()
    return data
}

export const getOrderDetailByOrderId = async (id) => {
    const response = await fetch(`http://localhost:3000/api/orderdetail/${id}`)
    const data = await response.json()
    return data
}

export const getComments = async () => {
    const response = await fetch(`http://localhost:3000/api/comments`)
    const data = await response.json()
    return data
}