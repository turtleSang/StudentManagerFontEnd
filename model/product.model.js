
const getAllProduct = async () => {
    let res = await axios({
        url: "http://localhost:8000/products",
        method: "GET"
    })
    return res;
}

const getDetail = async (id) => {
    let res = await axios({
        url: `http://localhost:8000/products/${id}`,
        method: "GET"
    })
    return res;
}

const postProduct = async (product) => {
    let res = await axios({
        url: 'http://localhost:8000/products/',
        method: "POST",
        data: product
    });
    return res;
}

const putProduct = async (id, product) => {
    let res = await axios({
        url: `http://localhost:8000/products/${id}`,
        method: "PUT",
        data: product
    })
    return res;
}

const deleteById = async (id) => {
    let res = await axios({
        url: `http://localhost:8000/products/${id}`,
        method: "DELETE",
    })
    return res;
}

export {
    getAllProduct,
    getDetail,
    postProduct,
    putProduct,
    deleteById
}
