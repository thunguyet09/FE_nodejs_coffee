let buttonLeft = document.getElementById('slideLeft');
let buttonRight = document.getElementById('slideRight');

buttonLeft.addEventListener('click', function () {
    document.getElementById('slide').scrollLeft -= 360;
})

buttonRight.addEventListener('click', function () {
    document.getElementById('slide').scrollLeft += 360;
})

