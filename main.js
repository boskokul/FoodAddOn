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

var button = document.createElement("button");
function addButtonToPage() {
  button.textContent = "Prikazi na dnu sve kolace izdvojeno";
  button.style.margin = "0 15px 10px 15px";
  button.addEventListener("click", function () {
    setTimeout(function () {
      extractDesserts();
    }, 2000);
    button.disabled = true;
  });

  let leftNavBar = document.querySelector(".catering__nav");
  if (leftNavBar.firstChild) {
    leftNavBar.insertBefore(button, leftNavBar.firstChild);
  } else {
    leftNavBar.appendChild(button);
  }
}

var dessertsWithPosition = [];
function extractDesserts() {
  let targetElements = document.querySelectorAll(".catering__section");
  let currentTypeOfMeal = "";
  let targetArray = Array.from(targetElements);
  for (let i = 0; i < targetArray.length; i++) {
    let menuItem = targetArray[i].children;

    for (let j = 1; j < menuItem.length; j++) {
      let meal = menuItem[j];
      if (meal.children.length === 0) {
        currentTypeOfMeal = meal.textContent;
        continue;
      }

      if (
        (currentTypeOfMeal === "Deserti" ||
          currentTypeOfMeal === "Palačinke" ||
          currentTypeOfMeal === "Ovsene kaše") &&
        meal.children.length === 3
      ) {
        let item = {
          mealNode: meal,
          x: i,
          y: j,
          pushedBack: false,
        };
        dessertsWithPosition.push(item);
      }
    }
  }

  setTimeout(function () {
    let newDiv = document.createElement("div");
    newDiv.textContent = "OVO SU SVI KOLACI";
    newDiv.style.padding = "10px 0 10px 0";
    newDiv.style.color = "black";
    newDiv.style.fontWeight = "bold";
    targetArray[targetArray.length - 1].appendChild(newDiv);
    dessertsWithPosition.forEach((item) => {
      targetArray[targetArray.length - 1].appendChild(item.mealNode);
    });
  }, 3000);
}

function setListenersLeftRightButtons() {
  let leftButton = document.querySelector(".menu-calendar__arrow--left");
  leftButton.addEventListener("click", function () {
    moveDessertsBack();
    setTimeout(function () {
      dessertsWithPosition = [];
      button.disabled = false;
    }, 500);
  });
  let rightButton = document.querySelector(".menu-calendar__arrow--right");
  rightButton.addEventListener("click", function () {
    moveDessertsBack();
    setTimeout(function () {
      dessertsWithPosition = [];
      button.disabled = false;
    }, 500);
  });
}

function moveDessertsBack() {
  let targetElements = document.querySelectorAll(".catering__section");
  let targetArray = Array.from(targetElements);
  for (let i = 0; i <= targetArray.length - 1; i++) {
    dessertsWithPosition.forEach((item) => {
      if (item.x === i && item.pushedBack === false) {
        item.pushedBack = true;
        targetArray[i].appendChild(item.mealNode);
      }
    });
    if (i === targetArray.length - 1) {
      let menuItem = targetArray[i].children;
      for (let j = 1; j < menuItem.length; j++) {
        let meal = menuItem[j];
        if (meal.textContent === "OVO SU SVI KOLACI") {
          meal.style.display = "none";
        }
      }
    }
  }
}
