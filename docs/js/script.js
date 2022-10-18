$(document).ready(function () {
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
    })

    const sliderDirectionsInfo = document.querySelector('.slider-directions-info')
    let sliderDirectionsInfoSlides
    if (sliderDirectionsInfo) {
        sliderDirectionsInfoSlides = sliderDirectionsInfo.querySelectorAll('.slide')
    }
    const sliderDirectionsContent = document.querySelector('.slider-directions-content')
    let sliderDirectionsContentSlides
    if (sliderDirectionsContent) {
        sliderDirectionsContentSlides = sliderDirectionsContent.querySelectorAll('.slide')
    }

    $('.slider-directions-nav').on('click', function(e) {
        let activeSlide = $(this).find('.slick-active').attr('data-slick-index')
        if (sliderDirectionsInfoSlides) {
            sliderDirectionsInfoSlides.forEach(slide => slide.style.display = 'none')
            if (sliderDirectionsInfoSlides[activeSlide]) {
                sliderDirectionsInfoSlides[activeSlide].style.display = 'flex'
            }
        }
        if (sliderDirectionsContentSlides) {
            sliderDirectionsContentSlides.forEach(slide => slide.style.display = 'none')
            if (sliderDirectionsContentSlides[activeSlide]) {
                sliderDirectionsContentSlides[activeSlide].style.display = 'block'
            }
        }
    })

    const allContentSwitchers = document.querySelectorAll('._content-switcher')
    let currentSwitcher = null
    let currentSwitcherIdx = null

    allContentSwitchers.forEach((switcher, idx) => {
        $(switcher).on('click', e => {
            e.preventDefault()
            let currentBlock = switcher.closest('.slide-direction-content')
            if (!currentBlock) return
            let blockContentSwitchers = currentBlock.querySelectorAll('._content-switcher')
            let blockSwitchContents = currentBlock.querySelectorAll('.switch-content')
            if (!blockContentSwitchers || !blockSwitchContents) return

            blockContentSwitchers.forEach((blockSwitcher, idx) => {
                if (blockSwitcher === switcher) {
                    currentSwitcher = switcher
                    currentSwitcherIdx = idx
                    $(currentSwitcher).addClass('_active')
                } else {
                    $(blockSwitcher).removeClass('_active')
                }
                blockSwitchContents.forEach(block => block.style.display = 'none')
                if (currentSwitcherIdx !== null && blockSwitchContents[currentSwitcherIdx]) {
                    blockSwitchContents[currentSwitcherIdx].style.display = 'block'
                }
            })
        })
    })

    $(window).on('resize orientationchange', function() {
        $('.slider-directions-nav')[0].slick.refresh()
    })
})

/* -------------------- Video Popup -------------------- */

// (function ($) {
//     $.fn.videoPopup = function () {
//         return this.each(function () {
//             var video = $(this).attr("data-media")
//             if (video) {
//                 $(this).on("click", function () {
//                     $("body").append(
//                         '<div class="card-video-popup">' +
//                         '<div class="close close-video-popup"></div>' +
//                         '<video autoplay><source src="' + video + '" type="video/mp4" />Your browser does not support this video format.</video>' +
//                         '</div>'
//                     )
//                 })
//             }
//             $(this).on('click', function (event) {
//                 event.preventDefault()
//                 $(".close-video-popup, .card-video-popup").click(function (event) {
//                     if (event.target.tagName !== 'VIDEO') $(".card-video-popup").remove()
//                 })
//             })
//             $(document).keyup(function (event) {
//                 if (event.keyCode === 27) {
//                     $(".card-video-popup").remove()
//                 }
//             })
//         })
//     }
// }(jQuery))
//
// $(".card-video-link").videoPopup()
// $(".instruction-link").videoPopup()

//------------------------------ Elements ------------------------------//

// $('.selected').on('click', function (e) {
//     var select = this.parentNode
//     if (select.classList.contains('close')) {
//         select.classList.remove('close')
//         select.classList.add('open')
//         select.style.height = $('.select-option').length * 100 + '%'
//     } else if (select.classList.contains('open')) {
//         select.classList.remove('open')
//         select.classList.add('close')
//         select.style.height = 100 + '%'
//     }
// })

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

const popupOwners = document.querySelectorAll('._has-popup')

popupOwners.forEach(owner => {
    $(owner).on('click', e => {
        e.preventDefault()
        let additionalPopupClasses = ''
        let popupContentBackground = ''
        if (owner.classList.contains('_news')) {
            additionalPopupClasses += ' _news _darken'
            popupContentBackground = owner.querySelector('.box-item-image').style.backgroundImage
        }
        let popupBlock = owner.querySelector('.popup-content-inner')
        if (!popupBlock) return
        let popupContent = popupBlock.innerHTML
        if (popupContent) {
            let shadowLayer = createEl({
                classes: 'shadow-layer',
            })
            let popup = createEl({
                classes: 'popup-content' + additionalPopupClasses,
                styles: `
                    background-image: ${popupContentBackground};
                `,
            })
            let popupCloseButton = createEl({
                where: popup,
                classes: 'close-button',
            })
            createEl({
                where: popup,
                classes: 'popup-content-inner',
                innerHTML: popupContent,
            })
            $('body').addClass('_show-popup')
            let closePopup = () => {
                $('body').removeClass('_show-popup')
                shadowLayer.remove()
                popup.remove()
            }
            shadowLayer.onclick = () => closePopup()
            popupCloseButton.onclick = () => closePopup()
        }
    })
})





$('.menu-button').on('click', function (e) {
    $(this).toggleClass('menu-open')
    $('body').toggleClass('_lock')
    $('.header').toggleClass('_show-menu')
})

let submenuLinks = document.querySelectorAll('._submenu')
let submenus = document.querySelectorAll('.header-menu-submenu')

submenuLinks.forEach((link, idx) => {
    $(link).on('click', e => {
        e.preventDefault()
        submenus.forEach(menu => menu.style.display = 'none')
        submenus[idx].style.display = 'flex'
    })
})

// $('.become-partner-link').on('click', function (e) {
//     $('.form-popup').show()
// })
//
// $('.form-close').on('click', function (e) {
//     $('.form-popup').hide()
// })
//
// $('.policy-link').on('click', function (e) {
//     $('.policy-popup').show()
// })
//
// $('.policy-close').on('click', function (e) {
//     $('.policy-popup').hide()
// })