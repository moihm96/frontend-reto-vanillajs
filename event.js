export function addItemToList(item, list, selectedItems, updateSelectedItems) {
  if (!list) return;

  let li = document.createElement("li");
  li.textContent = item;

  // ✅ If already selected, keep it selected after reload
  if (selectedItems.includes(item)) {
    li.classList.add("selected");
  }

  // ✅ Click to toggle selection
  li.addEventListener("click", function () {
    li.classList.toggle("selected");
    const isSelected = li.classList.contains("selected");

    // ✅ Update selected items in localStorage
    updateSelectedItems(item, isSelected, selectedItems);
  });

  // ✅ Double-click to delete the specific item
  li.addEventListener("dblclick", function () {
    deleteSingleItem(item, list);
  });

  list.appendChild(li);
}

export function updateSelectedItems(item, isSelected, selectedItems) {
  // Get selectedItems from localStorage to ensure it's always up-to-date
  selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

  if (isSelected) {
    if (!selectedItems.includes(item)) {
      selectedItems.push(item);
    }
  } else {
    selectedItems = selectedItems.filter((i) => i !== item);
  }

  // ✅ Save updated selectedItems
  localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
}

let lastSavedState = null; // Stores last savedItems and selectedItems
let lastSelectedState = null; // Stores last selectedItems

export function deleteSelectedItems(list, savedItems, selectedItems) {
  if (!list) return;

  // Ensure savedItems and selectedItems are valid arrays
  savedItems = JSON.parse(localStorage.getItem("items")) || [];
  selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

  // ✅ Store the previous state before deleting (for Undo)
  lastSavedState = [...savedItems];
  lastSelectedState = [...selectedItems];

  // ✅ Remove selected items
  savedItems = savedItems.filter((item) => !selectedItems.includes(item));

  // ✅ Clear selectedItems after deletion
  selectedItems = [];

  // ✅ Update localStorage
  localStorage.setItem("items", JSON.stringify(savedItems));
  localStorage.setItem("selectedItems", JSON.stringify(selectedItems));

  // ✅ Refresh the UI
  list.innerHTML = "";
  savedItems.forEach((item) =>
    addItemToList(item, list, selectedItems, updateSelectedItems)
  );
}

export function undoLastAction(list) {
  if (!lastSavedState || !lastSelectedState) return; // No action to undo

  // Restore last state
  let savedItems = [...lastSavedState];
  let selectedItems = [...lastSelectedState];

  // ✅ Save restored state to localStorage
  localStorage.setItem("items", JSON.stringify(savedItems));
  localStorage.setItem("selectedItems", JSON.stringify(selectedItems));

  // ✅ Refresh UI
  list.innerHTML = "";
  savedItems.forEach((item) =>
    addItemToList(item, list, selectedItems, updateSelectedItems)
  );

  // ✅ Clear last saved state to prevent double undo
  lastSavedState = null;
  lastSelectedState = null;
}

export function deleteSingleItem(item, list) {
  let savedItems = JSON.parse(localStorage.getItem("items")) || [];
  let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

  // ✅ Save current state for Undo before deleting
  lastSavedState = [...savedItems];
  lastSelectedState = [...selectedItems];

  // ✅ Remove the specific item
  savedItems = savedItems.filter((i) => i !== item);
  selectedItems = selectedItems.filter((i) => i !== item); // Remove if selected

  // ✅ Update localStorage
  localStorage.setItem("items", JSON.stringify(savedItems));
  localStorage.setItem("selectedItems", JSON.stringify(selectedItems));

  // ✅ Refresh UI
  list.innerHTML = "";
  savedItems.forEach((i) =>
    addItemToList(i, list, selectedItems, updateSelectedItems)
  );
}
