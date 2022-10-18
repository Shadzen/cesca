//------------------------------ Slick ------------------------------//
$(document).ready(function () {
    // $('.index-slider').slick({
    //     dots: true,
    //     arrows: false,
    //     infinite: false,
    //     initialSlide: 0,
    //     fade: true,
    // });
    // $('.tech-slider').slick({
    //     dots: true,
    //     arrows: true,
    //     infinite: false,
    //     prevArrow: "<button type='button' class='slick-prev pull-left scale'><img class='arrow-img' src='img/slide-arrow.svg' alt='>' draggable='false'></button>",
    //     nextArrow: "<button type='button' class='slick-next pull-right scale'><img class='arrow-img' src='img/slide-arrow.svg' alt='>' draggable='false'></button>",
    //     initialSlide: 0,
    // });
    // $('.card-img').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     dots: false,
    //     arrows: true,
    //     prevArrow: "<button type='button' class='slick-prev pull-left scale'><img class='arrow-img' src='img/slide-arrow.svg' alt='>' draggable='false'></button>",
    //     nextArrow: "<button type='button' class='slick-next pull-right scale'><img class='arrow-img' src='img/slide-arrow.svg' alt='>' draggable='false'></button>",
    //     infinite: false,
    //     fade: true,
    //     asNavFor: '.card-nav'
    // });




    $('.slider-directions-nav').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: `
            <button type='button' class='slick-prev pull-left scale'>
                <img class='arrow-img' src='./img/arrow-1_white_border_medium.svg' alt='>' draggable='false'>
            </button>
        `,
        nextArrow: `
            <button type='button' class='slick-next pull-right scale'>
                <img class='arrow-img' src='./img/arrow-1_white_border_medium.svg' alt='>' draggable='false'>
            </button>
        `,
        // infinite: false,
        // fade: true,
        asNavFor: '.slider-directions-info',
    });
    $('.slider-directions-info').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        swipe: false,
        fade: true,
    });
    $(window).on('resize orientationchange', function() {
        $('.slider-directions-nav')[0].slick.refresh();
        $('.slider-directions-info')[0].slick.refresh();
    });




    // $('.card-nav').slick({
    //     slidesToShow: 2,
    //     slidesToScroll: 1,
    //     dots: false,
    //     arrows: false,
    //     infinite: false,
    //     initialSlide: 0,
    //     asNavFor: '.card-img',
    //     // centerMode: true,
    //     focusOnSelect: true
    // });
    // $('.card-img-wrap').find('.slide').on('click', function (e) {
    //     $('.card-sliders')[0].classList.add('_obs');
    //     $('.card-nav').slick('slickSetOption', {
    //         slidesToShow: 3
    //     }, true);
    //     $('.card-img')[0].slick.refresh();
    // });
    // $('.close-obs').on('click', function (e) {
    //     $('.card-sliders')[0].classList.remove('_obs');
    //     $('.card-nav').slick('slickSetOption', {
    //         slidesToShow: 2
    //     }, true);
    //     $('.card-img')[0].slick.refresh();
    // });
});

/* -------------------- Video Popup -------------------- */

// (function ($) {
//     $.fn.videoPopup = function () {
//         return this.each(function () {
//             var video = $(this).attr("data-media");
//             if (video) {
//                 $(this).on("click", function () {
//                     $("body").append(
//                         '<div class="card-video-popup">' +
//                         '<div class="close close-video-popup"></div>' +
//                         '<video autoplay><source src="' + video + '" type="video/mp4" />Your browser does not support this video format.</video>' +
//                         '</div>'
//                     );
//                 });
//             }
//             $(this).on('click', function (event) {
//                 event.preventDefault();
//                 $(".close-video-popup, .card-video-popup").click(function (event) {
//                     if (event.target.tagName !== 'VIDEO') $(".card-video-popup").remove();
//                 });
//             });
//             $(document).keyup(function (event) {
//                 if (event.keyCode === 27) {
//                     $(".card-video-popup").remove();
//                 }
//             });
//         });
//     };
// }(jQuery));
//
// $(".card-video-link").videoPopup();
// $(".instruction-link").videoPopup();

//------------------------------ Elements ------------------------------//

// $('.selected').on('click', function (e) {
//     var select = this.parentNode
//     if (select.classList.contains('close')) {
//         select.classList.remove('close');
//         select.classList.add('open');
//         select.style.height = $('.select-option').length * 100 + '%';
//     } else if (select.classList.contains('open')) {
//         select.classList.remove('open');
//         select.classList.add('close');
//         select.style.height = 100 + '%';
//     }
// });

function createEl({where = document.body, tag = 'div', elId,  classes, styles, innerHTML, innerText}) {
    let el = document.createElement(tag)
    if (elId) el.id = elId
    if (classes) el.className = classes
    if (styles) el.style.cssText = styles
    if (innerHTML) el.innerHTML = innerHTML
    if (innerText) el.innerText = innerText
    where.appendChild(el)
    return el
}

var popupOwners = document.querySelectorAll('._has-popup');

popupOwners.forEach(owner => {
    $(owner).on('click', e => {
        e.preventDefault();
        let popupBlock = owner.querySelector('.popup-content-inner');
        if (!popupBlock) return;
        let popupContent = popupBlock.innerHTML;
        if (popupContent) {
            let shadowLayer = createEl({
                classes: 'shadow-layer',
            });
            let popup = createEl({
                classes: 'popup-content',
            });
            let popupCloseButton = createEl({
                where: popup,
                classes: 'close-button',
            });
            createEl({
                where: popup,
                classes: 'popup-content-inner',
                innerHTML: popupContent,
            });
            $('body').addClass('_show-popup');
            let closePopup = () => {
                $('body').removeClass('_show-popup');
                shadowLayer.remove();
                popup.remove();
            }
            shadowLayer.onclick = () => closePopup();
            popupCloseButton.onclick = () => closePopup();
        }
    });
});





$('.menu-button').on('click', function (e) {
    $(this).toggleClass('menu-open');
    $('body').toggleClass('_lock');
    $('.header').toggleClass('_show-menu');
});

let submenuLinks = document.querySelectorAll('._submenu');
let submenus = document.querySelectorAll('.header-menu-submenu');

submenuLinks.forEach((link, idx) => {
    $(link).on('click', e => {
        submenus.forEach(menu => menu.style.display = 'none');
        submenus[idx].style.display = 'flex';
    });
});

// $('.become-partner-link').on('click', function (e) {
//     $('.form-popup').show();
// });
//
// $('.form-close').on('click', function (e) {
//     $('.form-popup').hide();
// });
//
// $('.policy-link').on('click', function (e) {
//     $('.policy-popup').show();
// });
//
// $('.policy-close').on('click', function (e) {
//     $('.policy-popup').hide();
// });