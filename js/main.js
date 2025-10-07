// ========================================== Start Global Variable ========================================== //
var bookmarkerNameInput = document.getElementById("bookmarkerName");
var bookmarkerURLInput = document.getElementById("bookmarkerURL");

var arrayOfBookmarkers = JSON.parse(localStorage.getItem("bookmarker")) || [];
// ========================================== End Global Variable ========================================== //
DisplayBookmarker(arrayOfBookmarkers);
// ========================================== Start Global Method ========================================== //
function clear() {
  bookmarkerNameInput.value = "";
  bookmarkerURLInput.value = "";
  bookmarkerNameInput.classList.remove("is-valid");
  bookmarkerURLInput.classList.remove("is-valid");
}

// ========================================== Start Massages Method ========================================== //
function notValidMassage() {
  var massage = `Site Name or Url is not valid.`;
  Swal.fire({
    color: "#45f3ff ",
    confirmButtonColor: "#d9138a",
    background: "#212529",
    icon: "error",
    title: "Oops...",
    text: massage,
  });
}
function successMassage(operationName) {
  Swal.fire({
    color: "#45f3ff ",
    confirmButtonColor: "#d9138a",
    background: "#212529",
    position: "center",
    icon: "success",
    title: `Bookmark ${operationName} successfully`,
    showConfirmButton: false,
    timer: 1500,
  });
}

// ========================================== End Global Method ========================================== //

// ========================================== Start CRUD Operation ========================================== //
function CreateBookmarker() {
  if (validation(bookmarkerNameInput) && validation(bookmarkerURLInput)) {
    var bookmarker = {
      name: bookmarkerNameInput.value,
      url: bookmarkerURLInput.value,
    };
    arrayOfBookmarkers.push(bookmarker);
    DisplayBookmarker(arrayOfBookmarkers);
    localStorage.setItem("bookmarker", JSON.stringify(arrayOfBookmarkers));
    clear();
    successMassage("created");
  } else {
    notValidMassage();
  }
}
function DisplayBookmarker(array) {
  var data = "";
  for (var i = 0; i < array.length; i++) {
    data += `              
<div class="mb-2">
<tr>
<td class="rounded-start-5">${i + 1}</td>
                <td class="fs-5 text-capitalize">${array[i].name}</td>
                <td class="rounded-end-5">
                  <a
                    href="${array[i].url}"
                    target="_blank"
                    class="btn btn-outline-light"
                    ><i class="fa-solid fa-eye"></i
                  ></a>
                  
                  <button
                    class="btn btn-outline-info"
                    onclick="ShareBookmarker(${i})"
                  >
                    <i class="fa-solid fa-share"></i>
                  </button>
                  <button
                    class="btn btn-outline-warning"
                    onclick="initiateUpdateBookmarker(${i})"
                  >
                  <i class="fa-solid fa-edit"></i>
                  </button>
                  <button
                    class="btn btn-outline-danger"
                    onclick="DeleteBookmarker(${i})"
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
              </div>
              `;
  }
  document.getElementById("bookmarkerContainer").innerHTML = data;
}
// ========================================== Start Update Methods ========================================== //
var publicIndexForUpdate;
function initiateUpdateBookmarker(index) {
  publicIndexForUpdate = index;
  bookmarkerNameInput.value = arrayOfBookmarkers[index].name;
  bookmarkerURLInput.value = arrayOfBookmarkers[index].url;
  document.getElementById("btnUpdateBookmarker").classList.remove("d-none");
  document.getElementById("btnCreateBookmarker").classList.add("d-none");
  bookmarkerNameInput.classList.remove("is-invalid");
  bookmarkerURLInput.classList.remove("is-invalid");
}
function UpdateBookmarker() {
  if (validation(bookmarkerNameInput) && validation(bookmarkerURLInput)) {
    arrayOfBookmarkers[publicIndexForUpdate].name = bookmarkerNameInput.value;
    arrayOfBookmarkers[publicIndexForUpdate].url = bookmarkerURLInput.value;
    DisplayBookmarker(arrayOfBookmarkers);
    localStorage.setItem("bookmarker", JSON.stringify(arrayOfBookmarkers));
    clear();
    document.getElementById("btnUpdateBookmarker").classList.add("d-none");
    document.getElementById("btnCreateBookmarker").classList.remove("d-none");
    successMassage("updated");
  } else {
    notValidMassage();
  }
}
// ========================================== End Update Methods ========================================== //
function DeleteBookmarker(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    color: "#45f3ff ",
    confirmButtonColor: "#d9138a",
    background: "#212529",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      arrayOfBookmarkers.splice(index, 1);
      DisplayBookmarker(arrayOfBookmarkers);
      localStorage.setItem("bookmarker", JSON.stringify(arrayOfBookmarkers));
      Swal.fire({
        color: "#45f3ff ",
        confirmButtonColor: "#d9138a",
        background: "#212529",
        title: "Deleted!",
        text: "Your bookmarker has been deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
}
// ========================================== End CRUD Operation ========================================== //
// ========================================== Start Share link method ========================================== //
function ShareBookmarker(index) {
  var url = arrayOfBookmarkers[index].url;

  Swal.fire({
    title: "Share Your Bookmark",
    color: "#45f3ff ",
    confirmButtonColor: "#d9138a",
    background: "#212529",
    html: `
    <div id="swal-qr" class="d-flex justify-content-center mb-2"></div>
    <p id="swal-url" class="text-white-50">${url}</p>
    <button id="copy-btn" class="btn btn-sm btn-outline-info mt-2">
      <i class="fa-solid fa-copy me-1"></i> Copy to Clipboard
    </button>
  `,
    didOpen: () => {
      var container = document.getElementById("swal-qr");
      container.innerHTML = "";
      new QRCode(container, {
        text: url,
        width: 200,
        height: 200,
        colorDark: "#fff",
        colorLight: "#212529",
        correctLevel: QRCode.CorrectLevel.H,
      });

      const copyBtn = document.getElementById("copy-btn");
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(url).then(() => {
          copyBtn.innerHTML = `<i class="fa-solid fa-check me-1"></i> Copied!`;
          copyBtn.classList.remove("btn-primary");
          copyBtn.classList.add("btn-success");
          setTimeout(() => {
            copyBtn.innerHTML = `<i class="fa-solid fa-copy me-1"></i> Copy to Clipboard`;
            copyBtn.classList.remove("btn-success");
            copyBtn.classList.add("btn-primary");
          }, 1500);
        });
      });
    },
  });
}
// ========================================== End Share link method ========================================== //

// ========================================== Start validation Method ========================================== //
function validation(element) {
  var regex = {
    bookmarkerName: /^[A-Z]\w{2,}(\s+\w+)*$/,
    bookmarkerURL:
      /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+(:\d{1,5})?(\/[\w\-._~:\/?#[\]@!$&'()*+,;%=]*)?$/,
  };

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
