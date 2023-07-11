let title = document.getElementById("title");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let submit = document.getElementById("submit");
let searchData = document.getElementById("search");

let mode = "Create";
let temp;
let searchMode = "title";

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +ads.value + +taxes.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#f10";
  }
}

// create product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newdata = {
    title: title.value.toLowerCase(),
    price: price.value,
    ads: ads.value,
    taxes: taxes.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value.toLowerCase(),
    count: count.value,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newdata.count < 50
  ) {
    if (mode === "Create") {
      if (newdata.count > 1) {
        for (let i = 0; i < count.value; i++) {
          dataPro.push(newdata);
        }
      } else {
        dataPro.push(newdata);
      }
    } else {
      dataPro[temp] = newdata;
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
};

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  total.innerHTML = "";
  category.value = "";
  count.value = "";
}

// read data in table
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `<tr>
      <td>${i + 1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick= "Update(${i})" id="update">Update</button></td>
      <td><button onclick= "Delete(${i})" id="delete">Delete</button></td>
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
      <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
      `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

//delete
function Delete(index) {
  dataPro.splice(index, 1);
  localStorage.product = JSON.stringify(dataPro); //update local storage
  showData();
}
//delete all
function deleteAll() {
  dataPro.splice(0);
  localStorage.clear();
  showData();
}
//update
function Update(index) {
  title.value = dataPro[index].title;
  price.value = dataPro[index].price;
  ads.value = dataPro[index].ads;
  taxes.value = dataPro[index].taxes;
  discount.value = dataPro[index].discount;
  category.value = dataPro[index].category;
  submit.innerHTML = "Update";
  count.style.display = "none";
  mode = "Update";
  temp = index;
  getTotal();
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function getSearchMode(id) {
  if (id == "searchTitle") {
    searchMode = "title";
    searchData.placeholder = "Search By Title";
  } else {
    searchMode = "category";
    searchData.placeholder = "Search By Category";
  }
  searchData.value = "";
  searchData.focus();
  showData();
}

function searchProduct(value) {
  let table = "";

  if (searchMode == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `<tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick= "Update(${i})" id="update">Update</button></td>
            <td><button onclick= "Delete(${i})" id="delete">Delete</button></td>
          </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `<tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick= "Update(${i})" id="update">Update</button></td>
            <td><button onclick= "Delete(${i})" id="delete">Delete</button></td>
          </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
