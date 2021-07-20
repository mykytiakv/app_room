$(document).ready(function() {

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
        let itemHeight = $current.find('.overlay-inner').innerHeight() + 20;

        if ($current.find('.overlay').length) {
            $current.find('.overlay').css('height', 'calc(100% + '+ itemHeight +'px)');
            $current.parents('.owl-stage').height($current.height() + itemHeight);
        }
    }

    productItem.on('touchstart', function () {
        productItemActive($(this));
    });

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
    $('.js-main-news').owlCarousel({
        items: 2,
        nav: false,
        dots: false,
        loop: false,
        margin: 30,
        responsive:{
            0:{
                margin: 22,
                items:1
            },
            992:{
                items:2
            }
        }
    });

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

// updateSize
function updateSize($carousel) {
    setTimeout(function () {
        $carousel.each(function() {
            let maxHeight = 0;

            $(this).find('.owl-item').each(function () {
                let $thisElement = $(this);

                // Max height
                let prevHeight = $thisElement.height(),
                    thisHeight = $thisElement.height('auto').height();

                $thisElement.height(prevHeight);
                maxHeight = (maxHeight > thisHeight ? maxHeight : thisHeight);
            });

            // Set equal height
            $(this).find('.owl-item').height(maxHeight);
        });
    }, 100);
}