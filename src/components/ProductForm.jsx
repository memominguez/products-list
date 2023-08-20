/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addItem, updateItem } from "../redux/productsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";

import Error from "./Error";

const ProductForm = () => {

// ******** Form used for either create or edit item *************

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { items } = useSelector((state) => state.products);

  const [product, setProduct] = useState({
    itemName: "",
    price: "",
  });

  const [inputError, setInputError] = useState(false);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([product.itemName, product.price].includes("")) {
      setInputError(true);
      return;
    }

    if (params.id) {
      dispatch(updateItem(product));
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item updated',
        showConfirmButton: false,
        timer: 1500
      })
      navigate("/");
    } else {
      dispatch(
        addItem({
          ...product,
          id: uuid(),
        })
      );
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item created',
        showConfirmButton: false,
        timer: 1500
      })
      navigate("/");
    }

    setInputError(false);

    setProduct({
      itemName: "",
      price: "",
    });
  };

  // Populate the form for EDIT action
  useEffect(() => {
    if (params.id) {
      setProduct(items.find((item) => item.id == params.id));
    }
  }, [items, params.id]);

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              {params.id ? "Edit item" : "Add new item"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product name</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Input item name"
                  name="itemName"
                  value={product.itemName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Product price</label>
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Input number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </div>

              {inputError && <Error>Both fields are required</Error>}

              <button
                type="submit"
                className="btn btn-info font-weight-bold text-uppercase d-block w-100 mb-3"
              >
                {params.id ? "Save changes" : "Add item"}
              </button>
            </form>

            <p className="text-center">
              Wish to cancel action, click on logo to return page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
