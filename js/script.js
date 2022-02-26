/*==========================================================================================================================================================================*/
/* Проверка устройства, на котором открыта страница */
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};


function isIE() {
    ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
}
if (isIE()) {
    document.querySelector("body").classList.add("ie");
}
if (isMobile.any()) {
    document.querySelector("body").classList.add("_touch");
}



/*==========================================================================================================================================================================*/
/* Проверка браузера на поддержку формата webp */
function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support == true) {
        document.querySelector("body").classList.add("_webp");
    } else {
        document.querySelector("body").classList.add("_no-webp");
    }
});



/*==========================================================================================================================================================================*/
/* Menu Burger */
const iconMenu = document.querySelector(".menu-header__icon");
const menuBody = document.querySelector(".header__menu");
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle("_lock");
        iconMenu.classList.toggle("_active");
        menuBody.classList.toggle("_active");
    });
}


function menu_close() {
    let iconMenu = document.querySelector(".menu-header__icon");
    let menuBody = document.querySelector(".menu__body");
    iconMenu.classList.remove("_active");
    menuBody.classList.remove("_active");
}



/*==========================================================================================================================================================================*/
/* Плавная прокрутка до раздела сайта при клике на ссылку или пункт меню */
const menuLinks = document.querySelectorAll("[data-goto]");
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
}


function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        let gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
        if ((window.innerWidth > 767.98) && (window.pageYOffset > gotoBlockValue)) {
            gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector("header").offsetHeight;
        }
        if (window.innerWidth < 767.98) {
            gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector("header").offsetHeight;
            console.log(document.querySelector("header").offsetHeight);
        }
        if (iconMenu.classList.contains("_active")) {
            document.body.classList.remove("_lock");
            iconMenu.classList.remove("_active");
            menuBody.classList.remove("_active");
        }
        window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
        });
        e.preventDefault();
    }
}



/*==========================================================================================================================================================================*/
/* Скрытие header при скролле и показ при обратном скролле */
if (window.innerWidth > 767.98) {
    let header = document.querySelector(".header");
    let scrollTop = 0;
    window.addEventListener("scroll", function () {
        let scrolling = this.scrollY;
        if (scrolling > 150 && scrolling > scrollTop) {
            header.classList.add("_hidden");
        } else {
            header.classList.remove("_hidden");
        }
        scrollTop = scrolling;
    });
}



/*==========================================================================================================================================================================*/
/* Slider */
let slideshow = document.getElementById("slider");
let slides = slideshow.querySelectorAll(".slide");
let index = 0;
let slideshowText = document.getElementById("sliderText");
let slidesText = slideshowText.querySelectorAll("._slide-text");
let indexText = 0;


function prevSlide() {
    slides[index].classList.remove("_active");
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add("_active");
}


function nextSlide() {
    slides[index].classList.remove("_active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("_active");
}


function prevSlideText() {
    slidesText[indexText].classList.remove("_active");
    indexText = (indexText - 1 + slidesText.length) % slidesText.length;
    slidesText[indexText].classList.add("_active");
}


function nextSlideText() {
    slidesText[indexText].classList.remove("_active");
    indexText = (indexText + 1) % slidesText.length;
    slidesText[indexText].classList.add("_active");
}


let arrowPrev = document.querySelector(".slider-text__arrow-prev");
let arrowNext = document.querySelector(".slider-text__arrow-next");
arrowPrev.addEventListener("click", someFuncPrev);
arrowNext.addEventListener("click", someFuncNext);


function someFuncPrev() {
    prevSlide();
    prevSlideText();
}


function someFuncNext() {
    nextSlide();
    nextSlideText();
}



/*==========================================================================================================================================================================*/
/* Slider Swiper */
window.onload = function() {
    if (document.querySelector(".barbers-slider")) {
        let sliderBarbers = new Swiper(".barbers-slider", {
            navigation: {
                prevEl: ".barbers-slider .swiper-button-prev",
                nextEl: ".barbers-slider .swiper-button-next",
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
                pageUpDown: true,
            },
            effect: "fade",
            fadeEffect: {																		
                crossFade: true																
            },                                                               
            speed: 800,                                                              
            slidesPerView: 1,                                                                                                                                   
            centeredSlides: true,
            // autoHeight: true,
            // breakpoints: {
            //     992: {						
            //         autoHeight: false,											
            //     },
            // },
        })
    };


    if (document.querySelector(".reviews-slider")) {
        let myMiniSlider = new Swiper(".reviews-slider", {										
            pagination: {														
                el: ".reviews-slider .swiper-pagination",												
                type: "bullets",															
                clickable: true,																													
            },
            keyboard: {																
                enabled: true,                                                                
                onlyInViewport: true,													
                pageUpDown: true,																
            },	                                                                                                                              
            centeredSlides: true, 
            effect: "fade",
            fadeEffect: {																		
                crossFade: true																
            },
            speed: 800,                                                             
        })
    }
};