$(document).ready(function () {
  const tabsContentClasses = [
    ".tab-profile",
    ".tab-orders",
    ".tab-affiliate-program",
  ];

  const initDefaultTab = () => {
    const tabsHeaders = $(".profile-tab-bth");
    tabsHeaders.removeClass("tab-active");
    $(tabsHeaders[0]).addClass("tab-active");
    $(tabsContentClasses[0]).show();
    $(tabsContentClasses[1]).hide();
    $(tabsContentClasses[2]).hide();
  };

  initDefaultTab();

  $("#profile-tabs-wrapper").click((event) => {
    const targetClickedElement = $(event.target).attr("href");
    $(".profile-tab-bth").removeClass("tab-active");
    $(event.target).closest(".profile-tab-bth").addClass("tab-active");
    const classIndetificator = "." + targetClickedElement.substring(1);
    const disabledTabs = tabsContentClasses.filter(
      (item) => item !== classIndetificator
    );
    $(classIndetificator).show();
    $(disabledTabs[0]).hide();
    $(disabledTabs[1]).hide();
  });
});
