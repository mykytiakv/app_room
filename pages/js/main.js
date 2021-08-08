$(document).ready(function() {

    // popover
    $('[data-toggle="popover"]').popover();

    // b-custom-checkbox
    $('.b-custom-checkbox').each(function() {
        if ($(this).find('input').is(':checked')) {
            $(this).addClass('active');
        }
    });

    $(document).on('input', '.b-custom-checkbox input', function() {
       $(this).parents('.b-custom-checkbox').toggleClass('active');
    });

    // js-cart-action
    $('.js-cart-action').click(function() {
        $('.js-cart').toggleClass('active');
    });

    // mask
    $('[type="tel"]').mask('+380999999999');

    // b-faq-block
    $('.b-faq-block__question').click(function() {
        $(this).parent().toggleClass('active');
        $(this).next().slideToggle();
    });

    // js-number-spinner
    $(document).on('click', '.js-number-spinner button', function () {
        let btn = $(this),
            oldValue = btn.closest('.js-number-spinner').find('input').val().trim(),
            newVal = 1;

        if (btn.attr('data-dir') === 'up') {
            newVal = parseInt(oldValue) + 1;
            btn.parents('.js-number-spinner').find('button').removeAttr('disabled');
        } else {
            if (oldValue > 1) {
                newVal = parseInt(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }

        if (newVal === 1) btn.attr('disabled', true);
        btn.closest('.js-number-spinner').find('input').val(newVal);
    });

    // product-thumb
    const productItem = $('.b-product-item');

    function productItemActive($current) {
        if (window.matchMedia("(min-width: 768px)").matches) {
            let itemHeight = $current.find('.overlay-inner').innerHeight() + 20,
                $stage = $current.parents('.owl-stage');

            if ($current.find('.overlay').length) {
                $current.find('.overlay').css('height', 'calc(100% + ' + itemHeight + 'px)');
                $stage.height('auto').height($stage.height() + itemHeight);
            }
        }
    }

    productItem.mouseover(function() {
        productItemActive($(this));
    }).mouseout(function() {
        $(this).find('.overlay').removeAttr('style');
        $(this).parents('.owl-stage').css('height', 'auto');
    });

    // js-main-filter-action
    $('.js-main-filter-action').click(function() {
        $('.js-main-filter').toggleClass('active');
        $('body').toggleClass('overflow-hidden');
    });

    // js-main-filter
    $('.js-main-filter').each(function() {
        let $min = $(this).find('.min'),
            $max = $(this).find('.max'),
            $slider = $(this).find('.js-price-slider');

        $slider.slider({
            range: true,
            min: parseFloat($min.attr('min')),
            max: parseFloat($max.attr('max')),
            step: 1,
            values: [
                parseFloat($min.val().length ? $min.val() : $min.attr('min')),
                parseFloat($max.val().length ? $max.val() : $max.attr('max'))
            ],
            slide: function(event, ui) {
                let v = ui.values[0] === $(this).slider('option', 'min') ? '' : ui.values[0];
                $min.val(v);

                v = ui.values[1] === $(this).slider('option', 'max') ? '' : ui.values[1];
                $max.val(v);
            },
            stop: function(event, ui) {
                $min.change();
            }
        });

        $min.add($max).change(function() {
            let vMin = $min.val() === '' ? $slider.slider('option', 'min') : parseFloat($min.val());
            let vMax = $max.val() === '' ? $slider.slider('option', 'max') : parseFloat($max.val());
            if (vMax >= vMin) {
                $slider.slider('option', 'values', [vMin, vMax]);
            }
        });
    });

    // js-mobile-nav
    const $mobileNavAction = $('.js-mobile-nav-action'),
          $mobileNavBack = $('.js-mobile-nav-back'),
          $mobileNav = $('.js-mobile-nav');

    $mobileNavAction.click(function() {
        $(this).add($mobileNav).toggleClass('active');
        $('body').toggleClass('overflow-hidden');
    });

    $mobileNav.find('[data-child-id]').click(function () {
        let childId = $(this).data('child-id');

        let $check = $mobileNav.find('ul.child[data-id="' + childId + '"]');

        if($check.length) {
            $check.addClass('active');
            $mobileNav.find('ul.main').addClass('not-active');
        }
    });

    $mobileNavBack.click(function() {
        $mobileNav.find('ul').removeClass('active not-active');
    });

    // js-main-news
    const $mainNews = $('.js-main-news');

    if ($mainNews.length) {
        $mainNews.owlCarousel({
            autoplay: true,
            autoplayTimeout: 3000,
            items: 2,
            nav: false,
            dots: false,
            loop: false,
            margin: 30,
            responsive: {
                0: {
                    stagePadding: 50,
                    margin: 22,
                    items: 1
                },
                992: {
                    items: 2
                }
            },
            onInitialized: function () {
                updateSize($mainNews);
            },
            onRefreshed: function () {
                updateSize($mainNews);
            }
        });
    }

    const owlCustomNav = {
        navText: [
            '<i class="icon-slide-left">',
            '<i class="icon-slide-right">',
        ],
        onInitialized: function(event) {
            $(event.target).find('.owl-nav button:first')
                .after(`<div class="add-inform">
                             <div class="add-inform-prev">01</div>
                             <div class="add-inform-active">02</div>
                             <div class="add-inform-next">03</div>
                         </div>`);
        },
        onChanged: function(event) {
            let $current = $(event.target),
                index = event.item.index + 2;

            $current.find('.add-inform-prev').text(String(index - 1).padStart(2, '0'));
            $current.find('.add-inform-active').text(String(index).padStart(2, '0'));
            $current.find('.add-inform-next').text(String(index + 1).padStart(2, '0'));
        }
    };

    /* js-prod-carousel */
    const $prodCarousel = $('.js-prod-carousel');

    if ($prodCarousel.length) {
        $prodCarousel.owlCarousel(Object.assign({
            loop: false,
            autoplay: false,
            nav: true,
            dots: false,
            margin: 0,
            responsiveClass: true,
            responsive: {
                0: {
                    margin: 10,
                    items: 2
                },
                768: {
                    items: 4
                },
                992: {
                    items: 5
                }
            },
            onInitialized: function () {
                updateSize($prodCarousel);
            },
            onRefreshed: function () {
                updateSize($prodCarousel);
            }
        }, owlCustomNav));
    }

    /* js-prod-gallery */
    const $prodGallery = $('.js-prod-gallery');

    if ($prodGallery.length) {
        $prodGallery.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            loop: true,
            swipe: false,
            asNavFor: '.js-prod-thumbs',
        });
    }

    /* js-prod-thumbs */
    const $prodThumbs = $('.js-prod-thumbs');

    if ($prodThumbs.length) {
        $prodThumbs.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.js-prod-gallery',
            verticalSwiping: true,
            dots: false,
            focusOnSelect: true,
            arrows: false,
            vertical: true,
            loop: true,
        });
    }

    /* js-prod-set */
    const $prodSet = $('.js-prod-set');

    if ($prodSet.length) {
        $prodSet.slick({
            slidesToShow: 1,
            verticalSwiping: true,
            dots: false,
            focusOnSelect: true,
            vertical: true,
            loop: false,
            arrows: true,
            prevArrow: '<i class="icon-slide-left prev"></i>',
            nextArrow: '<i class="icon-slide-right next"></i>'
        });
    }

    // windResize
    function windResize() {

        // js-main-product
        let $mainProduct = $('.js-main-product');

        if (window.matchMedia("(max-width: 767px)").matches) {
            if (!$mainProduct.hasClass('owl-loaded')) {
                $mainProduct.removeClass('row').addClass('owl-carousel owl-theme');

                $mainProduct.each(function () {
                    let $mainProductChild = $(this).children('div');

                    for(let i = 0; i < $mainProductChild.length; i+=4) {
                        $mainProductChild.slice(i, i+4).wrapAll('<div class="row"/>');
                    }
                });

                $mainProduct.owlCarousel(Object.assign({
                    items: 1,
                    nav: true,
                    dots: false,
                    loop: false,
                }, owlCustomNav));
            }
        } else {
            if ($mainProduct.hasClass('owl-loaded')) {
                $mainProduct.owlCarousel('destroy');
                $mainProduct.addClass('row').removeClass('owl-carousel owl-theme');
                $mainProduct.find('.b-product-item').parent().unwrap();
            }
        }

        // js-full-width
        let windowWidth = $(window).width(),
            containerWith = $('#container').width(),
            $fullWith  = $('.b-prod-landing, .js-full-width');

        if (windowWidth > containerWith) {
            $fullWith.css({
                width: windowWidth,
                marginLeft: - ((windowWidth - containerWith) / 2)
            });
        } else {
            $fullWith[0].removeAttr('style');
        }

        // Fix height js-prod-gallery
        setTimeout(function() {
            $prodGallery.find('.slick-track').height($prodThumbs.height());
        }, 400);

        // Cart height set
        $('.b-cart__box').css('height', $(window).height() + 'px');

        // Move b-prod-service
        const $prodService = $('.b-prod-service');

        if (window.matchMedia("(max-width: 767px)").matches) {
            $prodService.appendTo('.js-prod-service-sm-right');
        } else if (window.matchMedia("(max-width: 1200px)").matches) {
            $prodService.appendTo('.js-prod-service-md-left');
        } else {
            $prodService.appendTo('.js-prod-service-right');
        }
    }

    windResize();

    $(window).resize(function() {
        windResize();
    });
});

// numberAnimation
const time = 1000;
const step = 100;

function numberAnimation(num, e) {
    let n = 0;

    num = num.replace(/ /g, '');

    let t = Math.round(time / (num / step));
    let interval = setInterval(() => {
        n = n + step;
        if (n > num) {
            clearInterval(interval);
            n = num;
        }
        e.innerHTML = parseFloat(n).toLocaleString();
    }, t);
}

document.querySelectorAll('[data-num-animate]').forEach(e => {
    numberAnimation(e.dataset.numAnimate, e);
});

// countDown
function countDown(time, e) {
    let countDownDate = new Date(time).getTime(),
        x = setInterval(function() {
            let now = new Date().getTime(),
                distance = countDownDate - now;

            let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds = Math.floor((distance % (1000 * 60)) / 1000);

            e.innerHTML = '' +
                '<div><span>' + days + '</span> днів</div>' +
                '<div><span>' + hours + '</span> годин</div>' +
                '<div><span>' + minutes + '</span> хвилин</div>' +
                '<div><span>' + seconds + '</span> секунд</div>';

            if (distance < 0) {
                clearInterval(x);
                e.innerHTML = 'Завершено!';
            }
        }, 1000);
}

document.querySelectorAll('[data-count-down]').forEach(e => {
    countDown(e.dataset.countDown, e);
});

// updateSize
function updateSize($carousel) {
    setTimeout(function () {
        $carousel.each(function() {
            let maxHeight = 0;

            $(this).find('.owl-item').each(function () {
                let $thisElement = $(this);

                // Max height
                let thisHeight = $thisElement.height('auto').height();
                maxHeight = (maxHeight > thisHeight ? maxHeight : thisHeight);
            });

            // Set equal height
            $(this).find('.owl-item').height(maxHeight);
        });
    }, 100);
}