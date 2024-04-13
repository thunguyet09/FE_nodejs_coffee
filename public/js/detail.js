const url = new URL(document.location.href);
const id = url.searchParams.get("id");

import { getAPI, getCommentReplies, getComments, getDetailProduct, getOrderDetail, getOrderDetailById } from "./api.js";
import { getCart } from "./api.js";
import { numsInCart } from "./header.js";
import { cartExists } from "./api.js";
import { getCart as getCartAPI } from "./header.js";
import { getUser } from "./api.js";
import { getAllUser } from "./api.js";
const data = await getDetailProduct(id)
//thumbnails
const imgSlide = document.querySelectorAll('.slick-slide')
const imgAfter = document.querySelector('.img1')
const imgFeatured = document.getElementById('featured')
imgSlide.forEach((item) => {
    item.addEventListener('click', (e) => {
        imgFeatured.style.transform = 'translateX(-400px)'
        imgFeatured.style.transition = '.5s ease'
        imgFeatured.style.opacity = '0'
        imgFeatured.style.zIndex = '0'
        imgAfter.src = e.target.src
        imgAfter.style.transform = 'translateX(0)'
        imgAfter.style.zIndex = '9'
    })
})

const sizeBox = document.querySelectorAll('.size-box')

sizeBox.forEach((item) => {
    item.addEventListener('click', () => {
        sizeBox.forEach((val) => {
            val.childNodes[1].checked = false;
            val.childNodes[3].style.color = 'black'
            val.style.backgroundColor = 'white'
        })
        item.childNodes[1].checked = true
        item.childNodes[3].style.color = 'white'
        item.style.backgroundColor = 'black'
    })
})

const navName = document.querySelector('.nav-name')
navName.innerHTML = data.name

const slick_slide = document.querySelector('.slide > img:last-child')
slick_slide.src = `/public/img/${data.img_url}`

const img1 = document.querySelector('.img1')
img1.src = `/public/img/${data.img_url}`

const productName = document.querySelector('.product-name > h1')
productName.textContent = data.name

const luot_ban = document.querySelector('.luot_ban > span')
luot_ban.innerHTML = `Lượt bán: ${data.luot_ban}`

const prices = document.querySelector('.price')
if (data.promo_price) {
    prices.innerHTML = `
        <h3><del>${data.promo_price.toLocaleString()}&#8363;</del></h3>
        <h2>${data.price.toLocaleString()}&#8363;</h2>
    `
} else {
    prices.innerHTML = `
        <h2>${data.price.toLocaleString()}&#8363;</h2>
    `
}

const mo_ta = document.querySelector('.mo_ta')
mo_ta.textContent = data.mo_ta

const prevDetail = document.querySelector('.prev-detail')
const nextDetail = document.querySelector('.next-detail')
prevDetail.addEventListener('click', () => {
    document.location.href = `/src/detail.html?id=${data.id - 1}`
})

nextDetail.addEventListener('click', () => {
    document.location.href = `/src/detail.html?id=${data.id + 1}`
})

const nextId = data.id + 1
const nextData = await getDetailProduct(nextId)
const nextProduct = document.querySelector('.next-product')

if (nextData.message !== 'Product not found') {
    nextProduct.innerHTML = `
        <img src="/public/img/${nextData.img_url}" width="70" height="70">
        <div>
            <h4>${nextData.name}</h4>
            <h5>${nextData.price ? nextData.price.toLocaleString() : ''}&#8363;</h5>
        </div>
    `
} else {
    nextProduct.style.width = 0
    nextProduct.style.height = 0
    nextDetail.disabled = true
}

nextDetail.addEventListener('mouseenter', () => {
    nextProduct.style.display = 'flex'
    setTimeout(() => {
        nextProduct.style.transform = 'translateX(0)'
    }, 500)
})

nextDetail.addEventListener('mouseleave', () => {
    nextProduct.style.transform = 'translateX(-100px)'
    setTimeout(() => {
        nextProduct.style.display = 'none'
    }, 500)
})

const prevProduct = document.querySelector('.prev-product')
if (id > 0) {
    const prevId = data.id - 1
    const prevData = await getDetailProduct(prevId)
    prevProduct.innerHTML = `
        <img src="/public/img/${prevData.img_url}" width="70" height="70">
        <div>
            <h4>${prevData.name}</h4>
            <h5>${prevData.price.toLocaleString()}&#8363;</h5>
        </div>
    `

    prevDetail.addEventListener('mouseenter', () => {
        prevProduct.style.display = 'flex'
        setTimeout(() => {
            prevProduct.style.transform = 'translateX(0)'
        }, 500)
    })

    prevDetail.addEventListener('mouseleave', () => {
        prevProduct.style.transform = 'translateX(-100px)'
        setTimeout(() => {
            prevProduct.style.display = 'none'
        }, 500)
    })
} else {
    prevProduct.style.width = 0
    prevProduct.style.height = 0
    prevDetail.disabled = true
}

let priceL = 0;
const sizeL = document.getElementById('sizeL')
sizeL.addEventListener('click', () => {
    priceL = data.price + 20000

    if (data.promo_price) {
        prices.innerHTML = `
            <h3><del>${data.promo_price.toLocaleString()}&#8363;</del></h3>
            <h2>${priceL.toLocaleString()}&#8363;</h2>
        `
    } else {
        prices.innerHTML = `
            <h2>${priceL.toLocaleString()}&#8363;</h2>
        `
    }
})

const sizeM = document.getElementById('sizeM')
sizeM.addEventListener('click', () => {
    if (data.promo_price) {
        prices.innerHTML = `
            <h3><del>${data.promo_price.toLocaleString()}&#8363;</del></h3>
            <h2>${data.price.toLocaleString()}&#8363;</h2>
        `
    } else {
        prices.innerHTML = `
            <h2>${data.price.toLocaleString()}&#8363;</h2>
        `
    }
})

const quantity = document.querySelector('.quantity-value')
const decrease = document.querySelector('.decrease')
const increase = document.querySelector('.increase')

let quantityValue = 0;
decrease.addEventListener('click', () => {
    if (quantity.value <= 1) {
        quantity.value = 1
    } else {
        quantityValue = parseInt(quantity.value) - 1
        quantity.value = quantityValue
    }
})

increase.addEventListener('click', () => {
    if (quantity.value >= data.quantity) {
        quantity.value = data.quantity
    } else {
        let quantityValue = parseInt(quantity.value) + 1
        quantity.value = quantityValue
    }
})

quantity.addEventListener('change', (e) => {
    quantityValue = e.target.value
})

const sizeBtns = document.querySelectorAll('.size-btns')
let size = ''
sizeBtns.forEach((item) => {
    item.addEventListener('click', (e) => {
        size = e.target.textContent
    })
})
const addToCart = document.querySelector('.addToCart')
const buyNow = document.querySelector('.buyNow')
const productBox = document.querySelector('.detail')
if (data.quantity == 0) {
    addToCart.style.opacity = '0.5'
    addToCart.disabled = true
    buyNow.style.opacity = '0.5'
    buyNow.disabled = true
    const soldout = document.createElement('div')
    productBox.appendChild(soldout)
    soldout.className = 'sold-out'
    const p = document.createElement('p')
    p.textContent = 'Sản phẩm này đã hết hàng'
    soldout.appendChild(p)
}
const carts = await getCart()
const dialogContent = document.getElementById('dialog-content')
const dialogIcon = document.querySelector('#dialog-content > span')
const dialogText = document.querySelector('.dialog-text')
const token = localStorage.getItem('token')

addToCart.addEventListener('click', async () => {
    if(token){
        if (size !== '') {
            const cartId = carts[carts.length - 1].id + 1
            const cart = {
                id: cartId,
                prod_id: data.id,
                quantity: parseInt(quantity.value),
                size: size,
                user_id: localStorage.getItem('userId')
            }
    
            let userId = localStorage.getItem('userId')
            const cart_exists = await cartExists(data.id, userId, size)
            if (cart_exists.message !== 'Not Found') {
                let new_quantity = parseInt(cart_exists.quantity) + parseInt(quantity.value)
                fetch(`http://localhost:3000/api/cart/${data.id}/${userId}/${size}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        quantity: new_quantity
                    })
                })
                    .then(async (res) => {
                        if (res.ok) {
                            dialogContent.style.display = 'flex';
                            dialogContent.style.backgroundColor = '#6B8A47';
                            dialogContent.style.color = 'white';
                            dialogText.textContent = 'Sản phẩm đã thêm vào giỏ hàng';
                            dialogIcon.innerHTML = `<span class="material-symbols-outlined">shopping_bag</span>`;
                            setTimeout(() => {
                                dialogContent.style.display = 'none';
                                dialogContent.style.backgroundColor = '';
                                dialogContent.style.color = '';
                                dialogText.textContent = '';
                                dialogIcon.innerHTML = '';
                            }, 4000);
                        }
                    })
                    .then(async () => {
                        await numsInCart()
                        await getCartAPI()
                    })
            } else {
                fetch('http://localhost:3000/api/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cart)
                })
                    .then(async (res) => {
                        if (res.ok) {
                            dialogContent.style.display = 'flex';
                            dialogContent.style.backgroundColor = '#6B8A47';
                            dialogContent.style.color = 'white';
                            dialogText.textContent = 'Sản phẩm đã thêm vào giỏ hàng';
                            dialogIcon.innerHTML = `<span class="material-symbols-outlined">shopping_bag</span>`;
                            setTimeout(() => {
                                dialogContent.style.display = 'none';
                                dialogContent.style.backgroundColor = '';
                                dialogContent.style.color = '';
                                dialogText.textContent = '';
                                dialogIcon.innerHTML = '';
                            }, 4000);
                        }
                    })
                    .then(async () => {
                        await numsInCart()
                        await getCartAPI()
                    })
            }
        } else {
            dialogContent.style.display = 'flex';
            dialogContent.style.backgroundColor = '#C5041B';
            dialogContent.style.color = 'white';
            dialogText.textContent = 'Vui lòng chọn size';
            dialogIcon.innerHTML = `<span class="material-symbols-outlined">close</span>`;
            setTimeout(() => {
                dialogContent.style.display = 'none';
                dialogContent.style.backgroundColor = '';
                dialogContent.style.color = '';
                dialogText.textContent = '';
                dialogIcon.innerHTML = '';
            }, 4000);
        }
    }else{
        document.location.href = '/src/login.html'
    }
})


const likeBtn = document.querySelector('.like-btn')
const userId = localStorage.getItem('userId')
const user = await getUser(userId)
const likesArr = user.products_fav

const updateLikes = async () => {
    const all_users = await getAllUser()
    let elements = []
    all_users.forEach((item) => {
        if (item.products_fav.length !== 0) {
            elements.push(item.products_fav)
        }
    })

    const commonElements = elements.reduce((acc, arr) => {
        return acc.filter(element => arr.includes(element));
    });

    const commonElementsWithLength = commonElements.map(element => ({
        productId: element,
        likes: elements.reduce((acc, arr) => acc + (arr.includes(element) ? 1 : 0), 0)
    }));

    const numsOfFavorite = document.querySelector('.nums-of-favorite')
    commonElementsWithLength.forEach((item) => {
        if (item.productId == id) {
            numsOfFavorite.innerHTML = `(${item.likes})`
        }
    })

    const notCommonElements = elements.flatMap(item => {
        return item.filter(res => !commonElementsWithLength.some(val => val.productId === res));
    });

    notCommonElements.forEach((item) => {
        if (item == id) {
            numsOfFavorite.innerHTML = `(1)`
        }
    })
}

likeBtn.addEventListener('click', async (e) => {
    e.stopPropagation()
    let favoriteArr = []
    likesArr.forEach((item) => {
        favoriteArr.push(item)
    })

    if (likesArr.includes(data.id)) {
        dialogContent.style.display = 'flex';
        dialogContent.style.backgroundColor = '#6B8A47';
        dialogContent.style.color = 'white';
        dialogText.textContent = 'Sản phẩm đã được thêm vào danh sách yêu thích';
        dialogIcon.innerHTML = `<span class="material-symbols-outlined">favorite</span>`;
        setTimeout(() => {
            dialogContent.style.display = 'none';
            dialogContent.style.backgroundColor = '';
            dialogContent.style.color = '';
            dialogText.textContent = '';
            dialogIcon.innerHTML = '';
        }, 1000);
    } else {
        favoriteArr.push(data.id)
        await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                products_fav: favoriteArr
            })
        })
            .then(() => {
                likeBtn.style.color = 'red'
                dialogContent.style.display = 'flex';
                dialogContent.style.backgroundColor = '#6B8A47';
                dialogContent.style.color = 'white';
                dialogText.textContent = 'Sản phẩm đã được thêm vào danh sách yêu thích';
                dialogIcon.innerHTML = `<span class="material-symbols-outlined">favorite</span>`;
                setTimeout(() => {
                    updateLikes()
                    dialogContent.style.display = 'none';
                    dialogContent.style.backgroundColor = '';
                    dialogContent.style.color = '';
                    dialogText.textContent = '';
                    dialogIcon.innerHTML = '';
                }, 1000);
            })
    }
})

if(likesArr){
    likesArr.forEach((item) => {
        if (item == data.id) {
            likeBtn.style.color = 'red'
        }
    })
}

async function getCommentsAPI() {
    const reviews = await getComments()
    const filterReview = reviews.filter((item) => item.prod_id == id)
    showReview(filterReview)
    handleDividedReview(filterReview)
}

const reviewBox = document.querySelector('.reviewBox')
const commentMainBox = document.querySelector('.commentMainBox')
const dividedReview = document.querySelector('.dividedReview')
const handleDividedReview = async (filterReview) => {
    const averagePoint = document.createElement('div')
    averagePoint.className = 'avgPoint'
    dividedReview.appendChild(averagePoint)
    const starArr = []
    let totalStar = 0
    filterReview.forEach((item) => {
        starArr.push(item.stars)
        totalStar += item.stars
    })
    const avgStars = totalStar / (starArr.length)
    const avgPoint = document.createElement('h2')
    const averageStar = document.createElement('div')
    if (filterReview.length == 0) {
        avgPoint.textContent = '0' + " / 5"
        averageStar.innerHTML = `
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        `
    }

    if (avgStars) {
        avgPoint.textContent = avgStars.toFixed(1) + " / 5"
    }
    averagePoint.appendChild(avgPoint)

    if (avgStars == 5) {
        averageStar.innerHTML = `
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
        `
    }
    if (avgStars >= 4 && avgStars < 5) {
        averageStar.innerHTML = `
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <div>
                <i class="fa-regular fa-star"></i>
                <span>
                    <i class="fa-solid fa-star"></i>
                </span>
            </div>
        `
    }
    if (avgStars >= 3 && avgStars < 4) {
        averageStar.innerHTML = `
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <div>
                <i class="fa-regular fa-star"></i>
                <span>
                    <i class="fa-solid fa-star"></i>
                </span>
            </div>
            <i class="fa-regular fa-star"></i>
        `
    }
    averagePoint.appendChild(averageStar)

    if (avgStars >= 4 && avgStars < 5) {
        averageStar.childNodes[9].id = 'last'
        console.log(averageStar.childNodes[9].childNodes[3])
        const calc = Math.floor((avgStars * 100) / 5) + 10
        averageStar.childNodes[9].childNodes[3].style.width = calc + "%"
    }

    if (avgStars >= 3 && avgStars < 4) {
        averageStar.childNodes[7].id = 'last'
        const calc = Math.floor((avgStars * 100) / 5) - 6
        averageStar.childNodes[7].childNodes[3].style.width = calc + "%"
    }

    const allStar = document.createElement('button')
    dividedReview.appendChild(allStar)
    allStar.innerHTML = `
        (${filterReview.length}) Tất cả
    `
    allStar.addEventListener('click', () => {
        commentMainBox.innerHTML = ''
        showReview(filterReview)
    })
    const fiveStar = document.createElement('button')
    const fiveStarLength = filterReview.filter((item) => parseInt(item.stars) === 5)
    fiveStar.innerHTML = `
        (${fiveStarLength.length}) 5 sao
    `
    dividedReview.appendChild(fiveStar)
    fiveStar.addEventListener('click', () => {
        commentMainBox.innerHTML = ''
        showReview(fiveStarLength)
    })
    const fourStar = document.createElement('button')
    dividedReview.appendChild(fourStar)
    const fourStarLength = filterReview.filter((item) => parseInt(item.stars) === 4)
    fourStar.innerHTML = `
        (${fourStarLength.length}) 4 sao
    `
    fourStar.addEventListener('click', () => {
        commentMainBox.innerHTML = ''
        showReview(fourStarLength)
    })
    const threeStar = document.createElement('button')
    dividedReview.appendChild(threeStar)
    const threeStarLength = filterReview.filter((item) => parseInt(item.stars) === 3)
    threeStar.innerHTML = `
        (${threeStarLength.length}) 3 sao
    `
    threeStar.addEventListener('click', () => {
        commentMainBox.innerHTML = ''
        showReview(threeStarLength)
    })
    const twoStar = document.createElement('button')
    dividedReview.appendChild(twoStar)
    const twoStarLength = filterReview.filter((item) => parseInt(item.stars) === 2)
    twoStar.innerHTML = `
        (${twoStarLength.length}) 2 sao
    `
    twoStar.addEventListener('click', () => {
        commentMainBox.innerHTML = ''
        showReview(twoStarLength)
    })
    const oneStar = document.createElement('button')
    dividedReview.appendChild(oneStar)
    const oneStarLength = filterReview.filter((item) => parseInt(item.stars) === 1)
    oneStar.innerHTML = `
        (${oneStarLength.length}) 1 sao
    `
    oneStar.addEventListener('click', () => {
        commentMainBox.innerHTML = ''
        showReview(oneStarLength)
    })
}
async function showReview(filterReview) {
    if (filterReview.length == 0) {
        const commentBox = document.createElement('div')
        commentBox.className = 'noCommentBox'
        commentMainBox.appendChild(commentBox)
        const noCommentImg = document.createElement('img')
        noCommentImg.src = `/public/img/no_comments.png`
        noCommentImg.width = 150
        commentBox.appendChild(noCommentImg)
        const noCommentText = document.createElement('h3')
        noCommentText.textContent = 'Chưa có đánh giá'
        commentBox.appendChild(noCommentText)
    }
    filterReview.forEach(async (item) => {
        const orderDetail = await getOrderDetailById(item.order_detail_id)
        const userData = await getUser(item.user_id)
        const commentBox = document.createElement('div')
        commentBox.className = 'commentBox'
        commentMainBox.appendChild(commentBox)
        const imgAvatar = document.createElement('img')
        imgAvatar.width = '60'
        imgAvatar.height = '60'
        if (typeof userData.avatar !== 'undefined') {
            imgAvatar.src = `/public/img/${userData.avatar}`
        } else {
            imgAvatar.src = '/public/img/avatar.jpg'
        }
        commentBox.appendChild(imgAvatar)
        const commentElement = document.createElement('div')
        commentBox.appendChild(commentElement)
        const commentUserName = document.createElement('div')
        commentUserName.className = 'commentName'
        commentElement.appendChild(commentUserName)
        const userName = document.createElement('h4')
        userName.textContent = userData.full_name
        commentUserName.appendChild(userName)
        orderDetail.forEach((val) => {
            const commentDate = document.createElement('p')
            commentDate.className = 'comment-date'
            commentDate.innerHTML = item.date + ` | Phân loại hàng: ${val.size}`
            commentElement.appendChild(commentDate)
        })
        const stars = document.createElement('span')
        stars.className = 'commentStars'
        if (item.stars === 1) {
            stars.innerHTML = `<i class="fa-solid fa-star"></i>`
        } else if (item.stars === 2) {
            stars.innerHTML = `
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            `
        } else if (item.stars === 3) {
            stars.innerHTML = `
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            `
        } else if (item.stars === 4) {
            stars.innerHTML = `
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            `
        } else {
            stars.innerHTML = `
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            `
        }
        commentElement.appendChild(stars)
        const commentContent = document.createElement('p')
        commentContent.className = 'commentContent'
        commentContent.textContent = item.content
        commentElement.appendChild(commentContent)
        const commentBtns = document.createElement('div')
        commentBtns.className = 'commentBtns'
        commentElement.appendChild(commentBtns)
        const likeComment = document.createElement('button')
        likeComment.className = 'likeComment'
        likeComment.innerHTML = `
            <i class="fa-solid fa-thumbs-up"></i>
            Hữu ích
        `
        commentBtns.appendChild(likeComment)
        const replyBtn = document.createElement('button')
        replyBtn.className = 'replyBtn'
        replyBtn.textContent = 'Trả lời'
        commentBtns.appendChild(replyBtn)
        let toggle = false;
        const childCommentBox = document.createElement('div')
        commentElement.appendChild(childCommentBox)
        const commentResponse = await getCommentReplies()
        const commentChildFilter = commentResponse.filter((cmt) => cmt.user_id === userData._id && cmt.prod_id === parseInt(id) && cmt.comment_id === item.id)
        const commentReplyId = commentResponse[commentResponse.length - 1].id + 1
        commentChildFilter.forEach(async (child) => {
            const commentChild = document.createElement('div')
            commentChild.className = 'commentChild'
            childCommentBox.appendChild(commentChild)
            const resUser = await getUser(child.user_reply_id)
            const imgUser = document.createElement('img')
            imgUser.width = '60'
            imgUser.height = '60'
            if (resUser.avatar) {
                imgUser.src = `/public/img/${resUser.avatar}`
            } else {
                imgUser.src = '/public/img/avatar.jpg'
            }
            commentChild.appendChild(imgUser)
            const commentChildElement = document.createElement('div')
            commentChildElement.className = 'commentChildElement'
            commentChild.appendChild(commentChildElement)
            const commentChildDate = document.createElement('div')
            commentChildElement.appendChild(commentChildDate)
            const commentChildName = document.createElement('h4')
            commentChildName.textContent = resUser.full_name
            commentChildDate.appendChild(commentChildName)
            const cmtDate = document.createElement('p')
            cmtDate.textContent = child.date
            commentChildDate.appendChild(cmtDate)
            const cmtRole = document.createElement('h5')
            cmtRole.textContent = resUser.role
            commentChildElement.appendChild(cmtRole)
            const childContent = document.createElement('p')
            childContent.textContent = child.content
            commentChildElement.appendChild(childContent)
        })
        const replyBox = document.createElement('div')
        replyBox.className = 'replyBox'
        commentElement.appendChild(replyBox)
        const replyInput = document.createElement('input')
        replyInput.type = 'text'
        replyInput.placeholder = 'Nhập trả lời của bạn'
        replyInput.className = 'reply-input'
        replyBox.appendChild(replyInput)
        const sendReply = document.createElement('button')
        sendReply.className = 'send-reply'
        sendReply.textContent = 'Trả lời'
        replyBox.appendChild(sendReply)


        replyBtn.addEventListener('click', () => {
            toggle = !toggle
            if (userId && toggle) {
                replyBtn.textContent = 'Đóng'
                replyBox.style.display = 'flex'
            } else {
                replyBtn.textContent = 'Trả lời';
                replyBox.style.display = 'none';
            }
        })

        sendReply.addEventListener('click', async () => {
            const currentDate = new Date()
            const year = currentDate.getFullYear()
            const month = currentDate.getMonth() + 1
            const day = currentDate.getDate()
            let formatDate = day + "/" + month + "/" + year
            const newComment = {
                id: commentReplyId,
                comment_id: item.id,
                date: formatDate,
                content: replyInput.value,
                prod_id: item.prod_id,
                user_id: userData._id,
                user_reply_id: userId
            }

            await fetch(`http://localhost:3000/api/commentreplies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment)
            })
                .then(() => {
                    reviewBox.innerHTML = ''
                    reviewBox.style.opacity = 0
                })
                .then(() => {
                    dialogContent.style.display = 'flex';
                    dialogContent.style.backgroundColor = '#6B8A47';
                    dialogContent.style.color = 'white';
                    dialogText.textContent = 'Bình luận của bạn đã được gửi';
                    dialogIcon.innerHTML = `<span class="material-symbols-outlined">done</span>`;
                    setTimeout(() => {
                        getCommentsAPI()
                        reviewBox.style.opacity = 1
                        reviewBox.style.transition = '.3s linear'
                    }, 1000);

                    setTimeout(() => {
                        dialogContent.style.display = 'none';
                        dialogContent.style.backgroundColor = '';
                        dialogContent.style.color = '';
                        dialogText.textContent = '';
                        dialogIcon.innerHTML = '';
                    }, 2000)
                })
        })

    })
}

const products = await getAPI('products')
const relatedProducts = products.filter((item) => item.cat_id == data.cat_id)
const prevButton = document.querySelector('.related-left')
const nextButton = document.querySelector('.related-right')
const carouselContainer = document.querySelector('.carousel-container')
let currentIndex = 0;
function showItem(index) {
    if (index < 0 || index >= relatedProducts.length) {
        return;
    } else {
        carouselContainer.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
    }
}
function showPrevItem() {
    showItem(currentIndex - 1);
}

function showNextItem() {
    showItem(currentIndex + 1);
}
prevButton.addEventListener("click", showPrevItem);
nextButton.addEventListener("click", showNextItem);
const relatedProductsFunction = () => {
    relatedProducts.forEach((item) => {
        const carouselItem = document.createElement('div')
        carouselItem.className = 'productItem'
        carouselItem.addEventListener('click', () => {
            document.location.href = `/src/detail.html?id=${item.id}`
        })
        carouselContainer.appendChild(carouselItem)
        const carouselImg = document.createElement('img')
        carouselImg.src = `/public/img/${item.img_url}`
        carouselImg.width = 250
        carouselImg.height = 250
        carouselItem.appendChild(carouselImg)
        const carouselContent = document.createElement('div')
        carouselContent.className = 'carouselContent'
        carouselItem.appendChild(carouselContent)
        const name = document.createElement('h4')
        name.textContent = item.name
        carouselContent.appendChild(name)
        const carouselPrice = document.createElement('div')
        carouselPrice.className = 'carouselPrice'
        carouselContent.appendChild(carouselPrice)
        const price = document.createElement('h4')
        price.innerHTML = `${item.price.toLocaleString()}&#8363;`
        carouselPrice.appendChild(price)
        const sold = document.createElement('span')
        sold.innerHTML = `Đã bán: ${item.luot_ban}`
        carouselPrice.appendChild(sold)
        if (item.promo_price) {
            const discount = document.createElement('div')
            discount.className = 'percent'
            const percent = Math.floor(((item.promo_price * 100) / item.price) / 10)
            discount.innerHTML = `
                -${percent}%
            `
            carouselContent.appendChild(discount)
        }

    })
}

relatedProductsFunction()
getCommentsAPI()
updateLikes()
