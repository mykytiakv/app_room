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

  var slider = $("input[type='range']").rangeslider({
    polyfill: false,
    // Callback function
    onInit: function() {
      var $rangeEl = this.$range;

      // get range index labels
      var min = parseInt(this.$element.attr("min"));
      var max = parseInt(this.$element.attr("max"));
      var step = parseInt(this.$element.attr("step"));
      var rangeLabels = range(min, max, step);

      // add labels
      $rangeEl.append("<div class='rangeslider__labels'></div>");
      $(rangeLabels).each(function(index, value) {
        $rangeEl.find(".rangeslider__labels").append("<span class='rangeslider__labels__label'>" + value + "</span>");
      })
    },
  });

  $("input[name='duration']").on('change', function(e) {
    slider.attr("max", e.target.value);
    slider.rangeslider("update", true);
    var min = parseInt(slider.attr("min"));
    var max = parseInt(slider.attr("max"));
    var step = parseInt(slider.attr("step"));

    var rangeLabels = range(min, max, step);
    var domLabels = $(".rangeslider").find(".rangeslider__labels");

    domLabels.empty();

    $(rangeLabels).each(function(index, value) {
      domLabels.append("<span class='rangeslider__labels__label'>" + value + "</span>");
    });
  })

});

function range(start, stop, step=1) {
  return Array(Math.ceil((stop + 1 - start) / step)).fill(start).map((x, y) => x + y * step);
}