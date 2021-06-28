$(document).ready(function () {
  $("#credit-pop-up").hide();
  $("#open-credit-pop-up").click(() => {
    $("#credit-pop-up").show();
  });
  $(".close-credit-pop-up").click(() => {
    $("#credit-pop-up").hide();
  });
});
