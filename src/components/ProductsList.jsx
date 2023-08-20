/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showItems, deleteItem } from "../redux/productsSlice";
import Swal from "sweetalert2";

const ProductsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { items, loading, error } = useSelector((state) => state.products); 

  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: 'Error returned from database server'
    })
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Do you want to delete this item?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteItem(id))
        Swal.fire('Item deleted!', '', 'success')
        navigate("/refresh");
      } else if (result.isDenied) {
        Swal.fire('Item is not deleted', '', 'info')
      }
    })
    // A way for reloading the updated page
    // Go back and forth to a dummy page: Refreshing component    
  };

  function formatCurrency(strArg) {
    let makeNum = parseFloat(strArg);
    let formattedNum = makeNum.toFixed(2);
    return formattedNum;
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Fragment>
      <h2 className="text-center my-4">Products list</h2>

      <table className="table table-striped">
        <thead>
          <tr className="table-primary">
            <th scope="col">Item name</th>
            <th scope="col">Price $</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((product) => (
            <tr key={product.id}>
              <td>{product.itemName}</td>
              <td>{formatCurrency(product.price)}</td>
              <td>
                <Link
                  to={`/editar-producto/${product.id}`}
                  className="btn btn-outline-success btn-sm"
                >
                  Edit item
                </Link>

                <button
                  className="ms-4 btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ProductsList;
