console.log("radiii!!");

function hideLockedMenuItems() {
  let menuContainers = document.getElementsByClassName(
    "menu-wrapper row justify-content-md-center menu-wrapper--menu"
  );

  if (menuContainers.length > 0) {
    let menuContainer = menuContainers[0];

    let menuItemContainer = menuContainer.children;
    let menuItems = menuItemContainer[0].children;

    for (let i = 0; i < menuItems.length; i++) {
      let menuItem = menuItems[i].children;
      // console.log("radiii!!meniji" + menuItem.length);

      for (let j = 0; j < menuItem.length; j++) {
        let meal = menuItem[j];

        //   console.log("radiii!!deca");
        let isItemAvailable = !meal.classList.contains("meal--locked");

        if (!isItemAvailable) {
          console.log("radiii!!deca" + meal.classList);
          meal.style.display = "none";
        }
      }
    }
  }
}

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "childList") {
      hideLockedMenuItems();
    }
  });
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});
