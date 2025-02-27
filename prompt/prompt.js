//Selectors
const entryInput = document.querySelector(".entry-input");
const addEntryButton = document.querySelector(".add-entry-button");
const cancelEntryButton = document.querySelector(".cancel-entry-button");

//Event listeners
addEntryButton.addEventListener("click", addEntry);
cancelEntryButton.addEventListener("click", cancelEntry);

//Functions
function addEntry(event) {
  event.preventDefault();

  let item = entryInput.value.trim();

  if (item) {
    let savedItems = JSON.parse(localStorage.getItem("items")) || [];
    savedItems.push(item);
    localStorage.setItem("items", JSON.stringify(savedItems));

    // Notify other pages that a new item was added
    window.dispatchEvent(new Event("storage"));

    entryInput.value = ""; // Clear input field
    window.location.href = "../index.html";
  }
}

function cancelEntry(event) {
  event.preventDefault();
  entryInput.value = "";
  window.location.href = "../index.html";
}
