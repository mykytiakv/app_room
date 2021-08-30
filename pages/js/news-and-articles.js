$(document).ready(function () {
  const owlCustomNav = {
    navText: ['<i class="icon-slide-left">', '<i class="icon-slide-right">'],
    onInitialized: function (event) {
      $(event.target).find(".owl-nav button:first")
        .after(`<div class="add-inform">
                                 <div class="add-inform-prev">01</div>
                                 <div class="add-inform-active">02</div>
                                 <div class="add-inform-next">03</div>
                             </div>`);
    },
    onChanged: function (event) {
      let $current = $(event.target),
        index = event.item.index + 2;

      $current
        .find(".add-inform-prev")
        .text(String(index - 1).padStart(2, "0"));
      $current.find(".add-inform-active").text(String(index).padStart(2, "0"));
      $current
        .find(".add-inform-next")
        .text(String(index + 1).padStart(2, "0"));
    },
  };

  /* js-prod-carousel */
  const $newsAndArticlesCarousel = $(".js-news-and-articles-carousel");

  if ($newsAndArticlesCarousel.length) {
    $newsAndArticlesCarousel.owlCarousel(
      Object.assign(
        {
          loop: false,
          autoplay: false,
          nav: true,
          dots: false,
          margin: 0,
          responsiveClass: true,
          slidesToShow: 1,
          responsive: {
            0: {
              items: 1,
            },
            768: {
              items: 1,
            },
            992: {
              items: 1,
            },
          },
          onInitialized: function () {
            updateSize($newsAndArticlesCarousel);
          },
          onRefreshed: function () {
            updateSize($newsAndArticlesCarousel);
          },
        },
        owlCustomNav
      )
    );
  }
});
