$(document).ready(function () {
  // question accordion
  $(".plus-icon-wrapper").click((event) => {
    $(event.target)
      .closest(".container")
      .children($(".answer"))
      .toggleClass("open");
  });
});
