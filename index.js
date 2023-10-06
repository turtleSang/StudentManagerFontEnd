import {
  getAllProduct,
  getDetail,
  postProduct,
  putProduct,
  deleteById
}
  from "./model/product.model.js"

let listProduct = [];
let tbody = document.querySelector("#tbody_product");

//GET DATA
const fetchProduct = async () => {
  try {
    let res = await getAllProduct();
    listProduct = res.data;
    renderProduct(listProduct)
  } catch (error) {
    alert("Không thể lấy danh sách")
  }
}
const renderProduct = (list) => {
  let content = ``;
  let stt = 0
  for (const product of list) {
    stt++;
    content += `
       <tr>
       <th>${stt}</th>
       <td>${product.name}</td>
       <td>${product.amount}</td>
       <td>${product.price}</td>
       <td>${product.sale}</td>
       <td>
         <button
           class="btn-update btn btn-success"
           data-product-id = "${product.id}"
           data-bs-toggle="modal"
           data-bs-target="#form_input"
           onclick="openUpdateForm(event)"
         >
           <i class="fa-solid fa-pen-to-square"></i>
         </button>
         <button 
            class="btn-delete btn btn-danger" 
            data-product-id = "${product.id}"
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#delete_form"
            onclick="openDeleteForm(event)"
          >
           <i class="fa-solid fa-trash"></i>
         </button>
       </td>
     </tr>
       `
  }
  tbody.innerHTML = content;
}

const getProductDetail = async (id) => {
  try {
    let res = await getDetail(id);
    let product = res.data;
    return product;
  } catch (error) {
    alert(`Không tìm thấy ${id} :${error.response.data}`);
  }

}
window.getProductDetail = getProductDetail
//CREATE DATA
const createProduct = async () => {
  const name = document.getElementById("input_name").value;
  const amount = document.getElementById("input_amount").value;
  const price = document.getElementById("input_price").value;
  const sale = document.getElementById("input_sale").value;

  const product = { name, amount, price, sale };

  try {
    let res = await postProduct(product);
    fetchProduct();
    clearForm();
    activeNofi(`Đã thêm thành công ${res.data.name}`);
  } catch (error) {
    alert(error.request.response)
  }

}

//UPDATE DATA
const openUpdateForm = (e) => {
  let id = e.currentTarget.getAttribute("data-product-id");
  document.getElementById("update_product").style.display = "block";
  document.getElementById("create_product").style.display = "none";
  document.getElementById("title_form").innerHTML = "Cập nhật thông tin sản phẩm";
  let productUpdate = listProduct.find(product => product.id == id);
  if (productUpdate) {
    document.getElementById("input_name").setAttribute("data-id", id);
    document.getElementById("input_name").value = productUpdate.name;
    document.getElementById("input_amount").value = productUpdate.amount;
    document.getElementById("input_price").value = productUpdate.price;
    document.getElementById("input_sale").value = productUpdate.sale;
  } else {
    alert("Không tìm thấy id")
  }
}
window.openUpdateForm = openUpdateForm

const updateProduct = async () => {
  const id = document.getElementById("input_name").getAttribute("data-id");
  const name = document.getElementById("input_name").value;
  const amount = document.getElementById("input_amount").value;
  const price = document.getElementById("input_price").value;
  const sale = document.getElementById("input_sale").value;
  const product = { name, amount, price, sale };

  try {
    let res = await putProduct(id, product);
    fetchProduct();
    clearForm();
    activeNofi(`Cập nhật thành công sản phẩm ${res.data.name}`)
  } catch (error) {
    alert(`Không tìm thấy ${id} :${error.response.data}`);
  }
}

//DELETE DATA
const openDeleteForm = async (e) => {
  let id = e.currentTarget.getAttribute("data-product-id"); 
  let product = await getProductDetail(id)
  let spanDelete = document.getElementById("product_delete")
  spanDelete.setAttribute("data-product-id", product.id);
  spanDelete.innerHTML = product.name;
}
window.openDeleteForm = openDeleteForm;

const deleteProduct = async () => {
  let id = document.getElementById("product_delete").getAttribute("data-product-id");
  try {
    let res = await deleteById(id);
    fetchProduct();
    activeNofi(`Đã xóa thành công ${res.data.name}`);
    document.getElementById("close_delete_form").click();
  } catch (error) {
    alert(error.request.response)
  }
}



//EVENT READ
fetchProduct();

//EVENT CREATE
document.querySelector("#create_product").addEventListener("click", createProduct)

//EVENT UPDATE
document.querySelector("#update_product").addEventListener("click", updateProduct);

//EVENT DELETE
document.querySelector("#button_delete").addEventListener("click", deleteProduct);

//UI PROCESS
const clearForm = () => {
  //clear form
  document.getElementById("input_name").value = "";
  document.getElementById("input_amount").value = "";
  document.getElementById("input_price").value = "";
  document.getElementById("input_sale").value = "";
  //close modal
  document.getElementById("close_form").click();
  document.getElementById("update_product").style.display = "none";
  document.getElementById("create_product").style.display = "block";
}

const activeNofi = (text_nofi) => {
  let nofi = document.getElementById("nofi");
  document.getElementById("nofi_text").innerHTML = text_nofi;
  nofi.style.display = "block";
  setTimeout(async () => {
    nofi.style.display = "none";
  }, 2500)


};
//Open form
document.getElementById("open_form").onclick = () => {
  clearForm();
  document.getElementById("update_product").style.display = "none";
  document.getElementById("create_product").style.display = "block";
  document.getElementById("title_form").innerHTML = "Thêm sản phẩm"
}

