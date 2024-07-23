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

var setAlready = false;
const targetDivs1 = document.getElementsByClassName("catering__section");

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "childList") {
      if (
        Array.from(targetDivs1).some((div) => div.contains(mutation.target))
      ) {
        hideLockedMenuItems();
        if (!setAlready) {
          addButtonToPage();
          setListenersLeftRightButtons();
          setAlready = true;
        }
      }
    }
  });
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

function setListenersLeftRightButtons() {
  let leftButton = document.querySelector(".menu-calendar__arrow--left");
  leftButton.addEventListener("click", function () {
    console.log("KliknutoL!");
    hideDesserts();
  });
  let rightButton = document.querySelector(".menu-calendar__arrow--right");
  rightButton.addEventListener("click", function () {
    console.log("KliknutoR!");
    hideDesserts();
  });
}

function addButtonToPage() {
  console.log("Button!");
  var button = document.createElement("button");
  button.textContent = "Prikazi kolace izdvojeno";
  button.style.margin = "0 0 10px 0";
  button.addEventListener("click", function () {
    console.log("Kliknuto!");
    extract();
  });

  let leftNavBar = document.querySelector(".catering__nav");
  console.log(leftNavBar);
  if (leftNavBar.firstChild) {
    leftNavBar.insertBefore(button, leftNavBar.firstChild);
  } else {
    leftNavBar.appendChild(button);
  }
}

// setTimeout(addButtonToPage, 3000);

function extract() {
  let meals = {};
  meals["Deserti"] = [];
  meals["Palačinke"] = [];
  meals["Ovsene kaše"] = [];
  let targetElements = document.getElementsByClassName("catering__section");

  for (let targetElement of targetElements) {
    let menuItem = targetElement.children;

    let currentTypeOfMeal = "";
    for (let j = 1; j < menuItem.length; j++) {
      let meal = menuItem[j];

      if (meal.children.length === 0) {
        let title = meal.textContent;
        currentTypeOfMeal = title;
        if (!(title in meals)) {
          meals[title] = [];
        }
        continue;
      }
      // console.log(meal);

      let mealCloned = meal.cloneNode(true);
      meals[currentTypeOfMeal].push(mealCloned);
    }
  }
  console.log(meals);

  setTimeout(function () {
    let targetArray = Array.from(targetElements);
    let newDiv = document.createElement("div");
    newDiv.textContent = "OVO SU SVI KOLACI";
    newDiv.style.padding = "10px 0 10px 0";
    newDiv.style.color = "black";
    newDiv.style.fontWeight = "bold";
    targetArray[targetArray.length - 1].appendChild(newDiv);
    if (meals["Deserti"].length > 0)
      for (let dessert of meals["Deserti"]) {
        targetArray[targetArray.length - 1].appendChild(dessert);
      }
    if (meals["Palačinke"].length > 0)
      for (let dessert of meals["Palačinke"]) {
        targetArray[targetArray.length - 1].appendChild(dessert);
      }
    if (meals["Ovsene kaše"].length > 0)
      for (let dessert of meals["Ovsene kaše"]) {
        targetArray[targetArray.length - 1].appendChild(dessert);
      }
  }, 3000);
}

function hideDesserts() {
  let found = false;
  let targetElements = document.getElementsByClassName("catering__section");
  for (let targetElement of targetElements) {
    let menuItem = targetElement.children;

    for (let j = 1; j < menuItem.length; j++) {
      let meal = menuItem[j];

      if (meal.children.length === 0) {
        let title = meal.textContent;
        if (title === "OVO SU SVI KOLACI") {
          found = true;
          meal.style.display = "none";
        }
      }
      if (found === true) meal.style.display = "none";
    }
  }
}
