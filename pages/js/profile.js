$(document).ready(function () {
  // const tabsContentClasses = [
  //   ".tab-profile",
  //   ".tab-orders",
  //   ".tab-affiliate-program",
  // ];

  // const initDefaultTab = () => {
  //   const tabsHeaders = $(".profile-tab-bth");
  //   tabsHeaders.removeClass("tab-active");
  //   $(tabsHeaders[0]).addClass("tab-active");
  //   $(tabsContentClasses[0]).show();
  //   $(tabsContentClasses[1]).hide();
  //   $(tabsContentClasses[2]).hide();
  //   $("#edit-profile-form").hide();
  // };

  const chanheProfileTabLayout = (layout1, layout2) => {
    $(layout1).hide();
    $(layout2).show();
  };

  initDefaultTab();

  // $("#profile-tabs-wrapper").click((event) => {
  //   const targetClickedElement = $(event.target).attr("href");
  //   $(".profile-tab-bth").removeClass("tab-active");
  //   $(event.target).closest(".profile-tab-bth").addClass("tab-active");
  //   const classIndetificator = "." + targetClickedElement.substring(1);
  //   const disabledTabs = tabsContentClasses.filter(
  //     (item) => item !== classIndetificator
  //   );
  //   $(classIndetificator).show();
  //   $(disabledTabs[0]).hide();
  //   $(disabledTabs[1]).hide();
  // });

  $("#cancel-edit-profile-bth").click((event) => {
    event.stopPropagation();
    chanheProfileTabLayout("#edit-profile-form", "#profile-content");
  });

  $("#edit-profile-bth").click((event) => {
    event.stopPropagation();
    chanheProfileTabLayout("#profile-content", "#edit-profile-form");
  });
});
