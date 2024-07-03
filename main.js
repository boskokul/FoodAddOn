console.log("radiii!!");

function hideLockedMenuItems() {
  let targetElements = document.getElementsByClassName("catering__section");
  Array.from(targetElements).forEach((targetElement) => {
    let menuItem = targetElement.children;

    for (let j = 0; j < menuItem.length; j++) {
      let meal = menuItem[j];

      let isItemAvailable = !meal.classList.contains("meal--locked");

      if (!isItemAvailable) {
        meal.style.display = "none";
      }
    }
  });
}

const targetDivs = document.getElementsByClassName("catering__section");

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "childList") {
      if (Array.from(targetDivs).some((div) => div.contains(mutation.target)))
        hideLockedMenuItems();
    }
  });
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

// Array.from(targetDivs).forEach((div) => {
//   observer.observe(div, {
//     childList: true,
//     subtree: true,
//   });
// });
