console.log("radiii!!");

let menuContainers = document.getElementsByClassName(
  "menu-wrapper row justify-content-md-center menu-wrapper--menu"
);

if (menuContainers.length > 0) {
  let menuContainer = menuContainers[0];

  let menuItemContainer = menuContainer.children;
  let menuItems = menuItemContainer[0].children;

  for (let i = 0; i < menuItems.length; i++) {
    let menuItem = menuItems[i].children;
    console.log("radiii!!meniji");

    for (let i = 0; i < menuItem.length; i++) {
      let meal = menuItem[i];
      console.log("radiii!!deca");
    }
  }
}
