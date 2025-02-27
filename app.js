import {
  addItemToList,
  updateSelectedItems,
  deleteSelectedItems,
  undoLastAction,
} from "./event.js";

// 🌍 Global Variables
const list = document.querySelector(".todo-list");
const deleteButton = document.querySelector(".todo-delete-button");
const undoButton = document.querySelector(".todo-undo-button");

let savedItems = JSON.parse(localStorage.getItem("items")) || [];
let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

// 🚀 Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Load items from localStorage
  savedItems.forEach((item) =>
    addItemToList(item, list, selectedItems, updateSelectedItems)
  );

  // Handle delete button click
  if (deleteButton) {
    deleteButton.addEventListener("click", () =>
      deleteSelectedItems(list, savedItems, selectedItems)
    );
  }
  undoButton.addEventListener("click", function () {
    undoLastAction(list);
  });

  // Listen for storage changes from other pages
  window.addEventListener("storage", function (event) {
    if (event.key === "items") {
      list.innerHTML = "";
      savedItems = JSON.parse(event.newValue || "[]");
      savedItems.forEach((item) =>
        addItemToList(item, list, selectedItems, updateSelectedItems)
      );
    }
  });
});
