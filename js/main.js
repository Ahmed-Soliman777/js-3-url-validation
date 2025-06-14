var bookmarkInput = document.getElementById("bookmarkId"),
  websiteUrlInput = document.getElementById("websiteUrlId"),
  submitBtn = document.getElementById("submitBtnId"),
  visitBtn = document.getElementById("visitBtnId"),
  deleteBtn = document.getElementById("DeleteBtnId"),
  tableList = [],
  nameRegex = /^\w{3,}(\s+\w+)*$/,
  urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;



if (localStorage.getItem("element") != null) {
  tableList = JSON.parse(localStorage.getItem("element"))
  display()
}

function addBtn() {
  var elements = {
    bookmarkName: bookmarkInput.value,
    websiteUrl: websiteUrlInput.value,
  }
  tableList.push(elements)
  localStorage.setItem("element", JSON.stringify(tableList))
  display()
}

function dropBtn(index) {
  tableList.splice(index, 1)
  localStorage.setItem("element", JSON.stringify(tableList))
  display()
}

function display() {
  var htmlDisplay = ''
  for (var i = 0; i < tableList.length; i++) {
    htmlDisplay += `<tr>
          <td class="align-middle fs-4">`+ (i + 1) + `</td>
          <td class="align-middle fs-4">`+ tableList[i].bookmarkName + `</td>
          <td class="align-middle fs-4">
            <a href="https://`+ tableList[i].websiteUrl + `" class="btn btn-success fs-5" id="visitBtnId" onclick="visitWebSiteBtn()">
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
        </tr>`
  }
  document.getElementById("webData").innerHTML = htmlDisplay
}

bookmarkInput.addEventListener("input", function () {
  validate(bookmarkInput, nameRegex);
});

websiteUrlInput.addEventListener("input", function () {
  validate(websiteUrlInput, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
