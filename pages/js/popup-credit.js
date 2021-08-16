$(document).ready(function () {
  $("#credit-pop-up").hide();
  $("#open-credit-pop-up").click(() => {
    $("#credit-pop-up").show();
  });
  $(".close-credit-pop-up").click(() => {
    $("#credit-pop-up").hide();
  });

  $(".bank-item").click((e) => {
    $(".bank-item").removeClass("active");
    $(e.target.closest(".bank-item")).toggleClass("active");
  });
});
