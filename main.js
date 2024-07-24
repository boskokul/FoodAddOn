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
      } else {
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
    moveDessertsBack();
    setTimeout(function () {
      console.log("KliknutoL!");
      spisak = [];
      button.disabled = false;
    }, 500);
  });
  let rightButton = document.querySelector(".menu-calendar__arrow--right");
  rightButton.addEventListener("click", function () {
    moveDessertsBack();
    setTimeout(function () {
      console.log("KliknutoL!");
      spisak = [];
      button.disabled = false;
    }, 500);
  });
}

var spisak = [];
function extractDesserts() {
  let targetElements = document.querySelectorAll(".catering__section");
  let currentTypeOfMeal = "";
  let targetArray = Array.from(targetElements);
  console.log(targetArray.length);
  for (let i = 0; i < targetArray.length; i++) {
    // if (i === 5 || i === 2) {
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
        // || true
      ) {
        // console.log(meal.children.length);
        let item = {
          mealNode: meal,
          x: i,
          y: j,
          pushedBack: false,
        };
        spisak.push(item);
        // targetArray[i].removeChild(item.mealNode);
      }
      // }
    }
  }
  console.log(spisak);

  setTimeout(function () {
    console.log("SSSSSSSSSSSSSSSSSSSSSSS");
    let newDiv = document.createElement("div");
    newDiv.textContent = "OVO SU SVI KOLACI";
    newDiv.style.padding = "10px 0 10px 0";
    newDiv.style.color = "black";
    newDiv.style.fontWeight = "bold";
    targetArray[targetArray.length - 1].appendChild(newDiv);
    spisak.forEach((item) => {
      targetArray[targetArray.length - 1].appendChild(item.mealNode);
    });
  }, 3000);
}

function moveDessertsBack() {
  let targetElements = document.querySelectorAll(".catering__section");
  let targetArray = Array.from(targetElements);
  for (let i = 0; i <= targetArray.length - 1; i++) {
    // for (let j = 1; j < menuItem.length; j++) {
    spisak.forEach((item) => {
      if (item.x === i && item.pushedBack === false) {
        console.log(item.x, item.y);
        item.pushedBack = true;
        targetArray[i].appendChild(item.mealNode);
      }
    });
    if (i === targetArray.length - 1) {
      let menuItem = targetArray[i].children;
      for (let j = 1; j < menuItem.length; j++) {
        let meal = menuItem[j];
        // console.log("EHEEHEHHH");
        if (meal.textContent === "OVO SU SVI KOLACI") {
          meal.style.display = "none";
        }
      }
    }
    // }
  }
}

var button = document.createElement("button");
function addButtonToPage() {
  console.log("Button!");
  button.textContent = "Prikazi na dnu sve kolace izdvojeno";
  button.style.margin = "0 15px 10px 15px";
  button.addEventListener("click", function () {
    console.log("Kliknuto!");
    setTimeout(function () {
      extractDesserts();
    }, 2000);
    isClicked = true;
    button.disabled = true;
  });

  let leftNavBar = document.querySelector(".catering__nav");
  console.log(leftNavBar);
  if (leftNavBar.firstChild) {
    leftNavBar.insertBefore(button, leftNavBar.firstChild);
  } else {
    leftNavBar.appendChild(button);
  }
}
