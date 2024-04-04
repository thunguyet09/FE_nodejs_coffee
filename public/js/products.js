
const sort = document.getElementById('sort')
const sortListBox = document.querySelector('#sort > div')
const sortIcon = document.querySelector('#sort > span')
let flag = false;
sort.addEventListener('click', () => {
    flag = !flag;
    if(flag){
        sortListBox.style.opacity = '1'
        sortListBox.style.visibility = 'visible'
        sortIcon.innerHTML = `<span class="material-symbols-outlined">arrow_drop_up</span>`
    }else{
        sortListBox.style.opacity = '0'
        sortListBox.style.visibility = 'hidden'
        sortIcon.innerHTML = `<span class="material-symbols-outlined">arrow_drop_down</span>`
    }
})



const navigation = document.querySelectorAll('.nav > li > a')
navigation.forEach((item) => {
    item.removeAttribute('id')
})
navigation[1].setAttribute('id', 'active')