"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons
  // Filter
  document
    .querySelector("[data-filter=cat]")
    .addEventListener("click", clickCatBtn);
  document
    .querySelector("[data-filter=dog]")
    .addEventListener("click", clickDogBtn);
  document
    .querySelector("[data-filter=all]")
    .addEventListener("click", clickAllBtn);

  // Sort
  document
    .querySelector("[data-sort=name]")
    .addEventListener("click", clickSortName);

  document
    .querySelector("[data-sort=desc]")
    .addEventListener("click", clickSortDesc);

  document
    .querySelector("[data-sort=type]")
    .addEventListener("click", clickSortType);

  document
    .querySelector("[data-sort=age]")
    .addEventListener("click", clickSortAge);

  loadJSON();
}

async function loadJSON() {
  console.log("loadJS");
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  console.log("prepareJSObjects");
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first
  displayList(allAnimals);
}

function preapareObject(jsonObject) {
  console.log("prepareJSObject");
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

// sort name
function compareName(a, b) {
  if (a.name < b.name) {
    return -1;
  } else {
    return 1;
  }
}

function compareDesc(a, b) {
  if (a.desc < b.desc) {
    return -1;
  } else {
    return 1;
  }
}

function compareType(a, b) {
  if (a.type < b.type) {
    return -1;
  } else {
    return 1;
  }
}

function compareAge(a, b) {
  if (a.age < b.age) {
    return -1;
  } else {
    return 1;
  }
}
function clickSortName() {
  const sortName = allAnimals.sort(compareName);
  displayList(sortName);
}

function clickSortDesc() {
  const sortDesc = allAnimals.sort(compareDesc);
  displayList(sortDesc);
}

function clickSortType() {
  const sortType = allAnimals.sort(compareType);
  displayList(sortType);
}

function clickSortAge() {
  const sortAge = allAnimals.sort(compareAge);
  displayList(sortAge);
}

function clickCatBtn() {
  const filterCats = allAnimals.filter(lookForCats);
  displayList(filterCats);
}
function clickDogBtn() {
  const filterDogs = allAnimals.filter(lookForDogs);
  displayList(filterDogs);
}
function clickAllBtn() {
  const filterAll = allAnimals.filter(lookForAllAnimals);
  displayList(filterAll);
}

function lookForCats(animal) {
  console.log("cat click");
  if (animal.type === "cat") {
    return true;
  } else {
    return false;
  }
}

function lookForDogs(animal) {
  console.log("dog click");
  if (animal.type === "dog") {
    return true;
  } else {
    return false;
  }
}

function lookForAllAnimals(animal) {
  console.log("all click");
  return true;
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
