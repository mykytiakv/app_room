$(document).ready(function () {
  const pages = $(".news-wrapper");
  console.log("pages", pages[0]);
  pages.hide();
  $(pages[0]).show();
  $(".page-bth").click((event) => {
    $(".page-bth").removeClass("active");
    $(event.target).addClass("active");
    const id = $(event.target).attr("href");
    $(".news-wrapper").hide();
    $(id).show();
  });
});
