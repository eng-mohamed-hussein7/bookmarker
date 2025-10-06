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
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Bookmark created successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    var massage = `Site Name or Url is not valid.`;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: massage,
    });
  }
}
function DisplayBookmarker(array) {
  var data = "";
  for (var i = 0; i < array.length; i++) {
    data += `<tr>
    <td>${i + 1}</td>
    <td>${array[i].name}</td>
    <td>
    <a href="${array[i].url}" target="_blank" class="btn my-btn-visit"
                    ><i class="fa-solid fa-eye pe-2"></i> Visit</a
                  >
                </td>
                <td>
                  <button class="btn my-btn-delete pe-2" onclick="DeleteBookmarker(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
              </tr>

              `;
  }
  document.getElementById("bookmarkerContainer").innerHTML = data;
}
function DeleteBookmarker(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
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
// ========================================== Start validation Method ========================================== //
function validation(element) {
  var regex = {
    bookmarkerName: /^\w{3,}(\s+\w+)*$/,
    bookmarkerURL: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
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
