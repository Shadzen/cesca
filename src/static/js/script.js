$(document).ready(function () {
    const headerMain = document.querySelector('.header-main')
    const headerMenuInner = document.querySelector('.header-menu-inner')
    const submenuOwners = headerMenuInner.querySelectorAll('._has-submenu')
    const submenusDesktop = headerMenuInner.querySelector('.submenus-desktop')
    let clonedSubmenus = []

    let isMobile = false

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

    // Resizable Boxes
    const resizableContainers = document.querySelectorAll('._resizable-boxes')

    const resizeProps = {
        duration: 0.5,
        get delay() {
            return this.duration * 1.5
        },
        // expand: 95.95,
        // shrink: 3.95,
        expand: 99.99,
        shrink: 0.01,
    }

    const resizedBoxes = new Set()

    Set.prototype.isAnimationActive = function() {
        let state = false
        this.forEach(i => {
            if ((i.tlExpand && i.tlExpand.isActive()) || (i.tlShrink && i.tlShrink.isActive())) state = true
        })
        return state
    }
    Set.prototype.normalize = function() {
        this.forEach(i => i.normalizeBox())
    }

    Element.prototype.expandBox = function() {
        if (this.shrinked) this.normalizeBox()

        resizedBoxes.add(this)

        this.expanded = true

        this.classList.add('_expand', '_disable-pointer-animations')
        let boxText = this.querySelector('.box-item-content-text')
        this.tlExpand = gsap.timeline({reversed: true, paused: true})
            .to(this, {
                height: 'auto',
                width: this.hasWidth100() || isMobile ? '100%' : resizeProps.expand + '%',
                duration: resizeProps.duration,
                delay: this.shrinked ? resizeProps.delay : 0.01,
                onReverseComplete: () => {
                    this.classList.remove('_disable-pointer-animations')
                    this.classList.remove('_expand')
                    this.removeAttribute('style')
                    boxText.removeAttribute('style')
                    this.tlExpand.pause().kill()
                    this.expanded = false
                },
            })
            .to(boxText, {opacity: 1, duration: resizeProps.duration / 2})
        this.tlExpand.play()
    }

    Element.prototype.shrinkBox = function() {
        if (this.expanded) this.normalizeBox()

        resizedBoxes.add(this)

        this.shrinked = true

        this.classList.add('_shrink')
        this.tlShrink = gsap.timeline({reversed: true, paused: true})
            .to(this, {
                width: resizeProps.shrink + '%',
                opacity: 0,
                duration: resizeProps.duration,
                delay: this.expanded ? resizeProps.delay : 0,
                onReverseComplete: () => {
                    this.removeAttribute('style')
                    this.classList.remove('_shrink')
                    this.tlShrink.pause().kill()
                    this.shrinked = false
                },
            })
        this.tlShrink.play()
    }
    Element.prototype.normalizeBox = function() {
        if (this.expanded) this.tlExpand.reverse()
        if (this.shrinked) this.tlShrink.reverse().delay(resizeProps.duration / 1.95)
    }

    resizableContainers.forEach(container => {
        container.onclick = (e) => {

            const target = e.target
            let currentBox

            if (target.closest('.box-item')) {
                currentBox = target.closest('.box-item')
                if (!currentBox) return
                if (currentBox.tagName === 'A') e.preventDefault()

                let prevBox = currentBox.previousElementSibling
                let nextBox = currentBox.nextElementSibling

                if (!currentBox.expanded) {
                    if (resizedBoxes.isAnimationActive()) return
                    if (!currentBox.shrinked && !isMobile) resizedBoxes.normalize()

                    currentBox.expandBox()

                    if (isNextResizable(prevBox, currentBox, nextBox)) {
                        nextBox.shrinkBox()
                    }

                    if (isPrevResizable(prevBox, currentBox, nextBox)) {
                        prevBox.shrinkBox()
                    }
                }
            }
            if (target.classList.contains('close-button') && currentBox) {
                isMobile ? currentBox.normalizeBox() : resizedBoxes.normalize()
            }

        }
    })

    Element.prototype.hasWidth100 = function() {
        return this.classList.contains('_width100')
    }

    const isPrevResizable = (prev, current, next) => {
        if (!prev || prev.hasWidth100() || current.hasWidth100() || isMobile) return false
        return !(current.offsetLeft === 0 && prev.offsetLeft > 0)
    }

    const isNextResizable = (prev, current, next) => {
        if (!next || next.hasWidth100() || current.hasWidth100() || isMobile) return false
        return (current.offsetLeft === 0 && next.offsetLeft > 0)
    }
    // Changes on mobile
    function updateOnMobileChange(m) {
        refreshDirectionsNavSlider()
        resizedBoxes.normalize()
        if (m.matches) {
            isMobile = true
            submenuOwners.forEach(owner => {
                $(owner).removeClass('_open-mobile-submenu _open-desktop-submenu')
            })
        } else {
            isMobile = false
            submenuOwners.forEach(owner => {
                $(owner).removeClass('_open-mobile-submenu _open-desktop-submenu')
                if (clonedSubmenus.length !== 0) {
                    $(submenuOwners[0]).addClass('_open-desktop-submenu')
                    clonedSubmenus.forEach(s => s.style.display = 'none')
                    clonedSubmenus[0].style.display = 'flex'
                }
            })
        }
    }

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

// const tl = gsap.timeline({reversed: true, paused:true})
//     .set(".open", {autoAlpha:0})
//     .to(".test", {height: "auto", duration: 0.5})
//     .from(".list", {autoAlpha:0, x:50, duration:1})
//
//
// document.querySelector(".test").addEventListener("click", toggle);
//
// function toggle() {
//     tl.reversed() ? tl.play() : tl.reverse();
// }
