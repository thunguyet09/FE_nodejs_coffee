
export const getAPI = async (endpoint) => {
    const response = await fetch(`http://localhost:3000/api/${endpoint}`)
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