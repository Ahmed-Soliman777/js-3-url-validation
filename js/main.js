var bookmarkInput = document.getElementById("bookmarkId"),
  websiteUrlInput = document.getElementById("websiteUrlId"),
  submitBtn = document.getElementById("submitBtnId"),
  visitBtn = document.getElementById("visitBtnId"),
  deleteBtn = document.getElementById("DeleteBtnId"),
  tableList = [],
  nameRegex = /^\w{3,}(\s+\w+)*$/,
  urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
  testRegex, element, updateIndex = 0, deletedIndex = false



if (localStorage.getItem("element") != null) {
  tableList = JSON.parse(localStorage.getItem("element"))
  display()
}

function dropBtn(index) {
  // Check if editing mode is active by checking btnFlex display style
  var isEditing = document.getElementById("btnFlex").style.display === "flex";

  if (isEditing) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are currently editing. Do you want to delete this bookmark?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        tableList.splice(index, 1);
        localStorage.setItem("element", JSON.stringify(tableList));
        display();
        Swal.fire(
          'Deleted!',
          'Your bookmark has been deleted.',
          'success'
        );
        // Also cancel editing mode if deleting the item being edited
        if (updateIndex === index) {
          cancelFunction();
        }
      }
    });
  } else {
    tableList.splice(index, 1);
    localStorage.setItem("element", JSON.stringify(tableList));
    display();

    Swal.fire({
      icon: "success",
      title: 'Bookmark deleted',
      text: 'Your bookmark has been deleted.',
    })

  }
}
function display() {
  var htmlDisplay = ''
  for (var i = 0; i < tableList.length; i++) {
    htmlDisplay += `<tr>
          <td class="align-middle fs-4">`+ (i + 1) + `</td>
          <td class="align-middle fs-4">`+ tableList[i].bookmarkName + `</td>
          <td class="align-middle fs-4">
            <a href="` + (tableList[i].websiteUrl.includes("https://") ? tableList[i].websiteUrl : "https://" + tableList[i].websiteUrl) + `" class="btn btn-success fs-5" id="visitBtnId" onclick="visitWebSiteBtn()"> 
            <i class="fa-solid fa-eye"></i>
              Visit
            </a>
          </td>
          <td>
            <button class="btn btn-danger fs-5 " id="DeleteBtnId" onclick="dropBtn(`+ i + `)">
              <i class="fa-solid fa-trash"></i>
              Delete
            </button>
          </td>
          <td>
            <button class="btn btn-primary fs-5 " id="EditBtnId" onclick="editBtn(`+ i + `)">
              <i class="fa-solid fa-pen-to-square"></i>
              Edit
            </button>
          </td>
        </tr>`
  }
  document.getElementById("webData").innerHTML = htmlDisplay
}
function searchItem() {
  var searchValue = document.getElementById("searchInput").value.toLowerCase(),
    html = ""
  for (var i = 0; i < tableList.length; i++) {
    if (tableList[i].bookmarkName.toLowerCase().includes(searchValue)) {
      html += `<tr>
          <td class="align-middle fs-4">`+ (i + 1) + `</td>
          <td class="align-middle fs-4">`+ tableList[i].bookmarkName + `</td>
          <td class="align-middle fs-4">
            <a href="` + (tableList[i].websiteUrl.includes("https://") ? tableList[i].websiteUrl : "https://" + tableList[i].websiteUrl) + `" class="btn btn-success fs-5" id="visitBtnId" onclick="visitWebSiteBtn()"> 
            <i class="fa-solid fa-eye"></i>
              Visit
            </a>
          </td>
          <td>
            <button class="btn btn-danger fs-5 " id="DeleteBtnId" onclick="dropBtn(`+ i + `)">
              <i class="fa-solid fa-trash"></i>
              Delete
            </button>
          </td>
          <td>
            <button class="btn btn-primary fs-5 " id="EditBtnId" onclick="editBtn(`+ i + `)">
              <i class="fa-solid fa-pen-to-square"></i>
              Edit
            </button>
          </td>
        </tr>`
    }
  }
  document.getElementById("webData").innerHTML = html
}
// ----------------------------------------------------------
bookmarkInput.addEventListener("input", function () {
  validate(bookmarkInput, nameRegex);
});

websiteUrlInput.addEventListener("input", function () {
  validate(websiteUrlInput, urlRegex);
});

function validate(input, regex) {
  testRegex = regex;
  element = input
  if (testRegex.test(input.value) == true) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
}

function addBtn() {
  var elements = {
    bookmarkName: bookmarkInput.value,
    websiteUrl: websiteUrlInput.value,
  }
  if (bookmarkInput.classList.contains("is-valid") == true && websiteUrlInput.classList.contains("is-valid") == true) {
    tableList.push(elements)
    localStorage.setItem("element", JSON.stringify(tableList))
    display()
    clearInput()
  }
  else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!"
    });
  }
}

function clearInput() {
  bookmarkInput.value = "";
  websiteUrlInput.value = "";
  bookmarkInput.classList.remove("is-valid")
  websiteUrlInput.classList.remove("is-valid")
}

function editBtn(index) {
  updateIndex = index
  bookmarkInput.value = tableList[index].bookmarkName
  websiteUrlInput.value = tableList[index].websiteUrl

  document.getElementById("submitBtnId").style.display = "none"

  document.getElementById("btnFlex").style.display = "flex"
  document.getElementById("btnFlex").style.alignItems = "center"

  
}

function update() {

  tableList[updateIndex].bookmarkName = bookmarkInput.value
  tableList[updateIndex].websiteUrl = websiteUrlInput.value

  localStorage.setItem("element", JSON.stringify(tableList))
  display()

  document.getElementById("btnFlex").style.display = "none"
  document.getElementById("submitBtnId").style.display = "flex"
  document.getElementById("submitBtnId").style.alignItems = "center"

  Swal.fire({
    icon: "success",
    title: "Thumbs up!",
    text: "Bookmark updated successfully!"
  });

  clearInput()
}

function cancelFunction() {

  document.getElementById("btnFlex").style.display = "none"

  document.getElementById("submitBtnId").style.alignItems = "center"
  document.getElementById("submitBtnId").style.display = "flex"

  clearInput()
}