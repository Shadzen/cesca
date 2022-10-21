$(document).ready(function () {
    const headerMain = document.querySelector('.header-main')
    const headerMenuInner = document.querySelector('.header-menu-inner')
    const submenuOwners = headerMenuInner.querySelectorAll('._has-submenu')
    const submenusDesktop = headerMenuInner.querySelector('.submenus-desktop')
    let clonedSubmenus = []

    // let isWideScreen = false
    let isMobile = false

    // let matchWideScreen = window.matchMedia('(min-aspect-ratio: 21/9)')
    let matchMobile = window.matchMedia('(max-width: 480px)')

    // Menu
    function cloneMenuElements() {
        const supportButton = headerMain.querySelector('.button')
        const contactLinks = headerMain.querySelector('.header-contact-links')
        const langs = headerMain.querySelector('.langs')
        headerMenuInner.prepend(contactLinks.cloneNode(true))
        headerMenuInner.appendChild(supportButton.cloneNode(true))
        headerMenuInner.appendChild(langs.cloneNode(true))

        const submenus = headerMenuInner.querySelectorAll('.submenu')
        submenus.forEach(submenu => {
            let clone = submenu.cloneNode(true)
            clonedSubmenus.push(clone)
            submenusDesktop.appendChild(clone)
        })
    }

    cloneMenuElements()
    submenuOwners.forEach((owner, idx) => {
        $(owner).on('click', e => {
            e.preventDefault()
            if (isMobile) {
                $(owner).toggleClass('_open-mobile-submenu')
            } else {
                $(submenuOwners).removeClass('_open-desktop-submenu')
                $(owner).addClass('_open-desktop-submenu')
                clonedSubmenus.forEach(s => s.style.display = 'none')
                clonedSubmenus[idx].style.display = 'flex'
            }
        })
    })
    $('.menu-button').on('click', function (e) {
        $(this).toggleClass('_menu-open')
        $('body').toggleClass('_lock _disable-scrolling')
        $('.header').toggleClass('_show-menu')
    })

    // Directions Page
    const sliderDirectionsNav = $('.slider-directions-nav')
    sliderDirectionsNav.slick({
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

    const refreshDirectionsNavSlider = () => {
        if (sliderDirectionsNav && sliderDirectionsNav[0]) sliderDirectionsNav[0].slick.refresh()
    }

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

    sliderDirectionsNav.on('click', function(e) {
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

    // $(window).on('resize orientationchange', function() {
    //     if (sliderDirectionsNav && sliderDirectionsNav[0]) sliderDirectionsNav[0].slick.refresh()
    // })



    // function updateOnWideScreenChange(m) {
    //     if (m.matches) {
    //         isWideScreen = true
    //     } else {
    //         isWideScreen = false
    //     }
    // }

    function updateOnMobileChange(m) {
        refreshDirectionsNavSlider()
        if (m.matches) {
            isMobile = true
            submenuOwners.forEach(owner => {
                $(owner).removeClass('_open-mobile-submenu _open-desktop-submenu')
            })
        } else {
            isMobile = false
            submenuOwners.forEach(owner => {
                $(owner).removeClass('_open-mobile-submenu _open-desktop-submenu')
                $(submenuOwners[0]).addClass('_open-desktop-submenu')
                clonedSubmenus.forEach(s => s.style.display = 'none')
                clonedSubmenus[0].style.display = 'flex'
            })
        }
    }

    // updateOnWideScreenChange(matchWideScreen)
    // matchWideScreen.addEventListener('change', updateOnWideScreenChange)
    updateOnMobileChange(matchMobile)
    matchMobile.addEventListener('change', updateOnMobileChange)
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
            $('body').addClass('_disable-scrolling')
            let closePopup = () => {
                $('body').removeClass('_disable-scrolling')
                shadowLayer.remove()
                popup.remove()
            }
            shadowLayer.onclick = () => closePopup()
            popupCloseButton.onclick = () => closePopup()
        }
    })
})






// function myFunction(x) {
//     if (x.matches) { // If media query matches
//         document.body.style.backgroundColor = "yellow"
//     } else {
//         document.body.style.backgroundColor = "pink"
//     }
// }
//
// var x = window.matchMedia("(min-aspect-ratio: 21/9)")
// myFunction(x) // Call listener function at run time
// x.addEventListener('change', myFunction) // Attach listener function on state changes
//


// let submenuLinks = document.querySelectorAll('._submenu')
// let submenus = document.querySelectorAll('.header-menu-submenu')
//
