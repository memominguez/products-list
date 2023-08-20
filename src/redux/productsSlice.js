/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// RUN JSON SERVER :  json-server db.json --port 4000

// Get items
export const showItems = createAsyncThunk("showItems",
  async (args, {rejectWithValue}) => {
    const response = await fetch('http://localhost:4000/productos')

    try {
      const result = await response.json();
      //console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

// Create action
export const addItem = createAsyncThunk("addItem", async (data, { rejectWithValue }) => {
  const response = await fetch("http://localhost:4000/productos", 
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
  )

  try {
    const result = await response.json()
    return result
  } catch (error) {
    return rejectWithValue(error);
  }
})

// Update action
export const updateItem = createAsyncThunk(
  "updateItem",
  async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    const response = await fetch(`http://localhost:4000/productos/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

 // Delete action
 export const deleteItem = createAsyncThunk("deleteItem",
 async (id, { rejectWithValue }) => {
   const response = await fetch(`http://localhost:4000/productos/${id}`,
   {method: "DELETE"}
   );

   try {
     const result = await response.json();      
     return result;
   } catch (error) {
     return rejectWithValue(error);
   }   
 })


export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  extraReducers: {
    [showItems.pending]: (state) => {
      state.loading = true;
    },
    [showItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    [showItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addItem.pending]: (state) => {
      state.loading = true;
    },
    [addItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
    },
    [addItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;           
    },
    [deleteItem.pending]: (state) => {
      state.loading = true;
    },
    [deleteItem.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.items = state.items.filter((ele) => ele.id !== id);
      }
    },
    [deleteItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateItem.pending]: (state) => {
      state.loading = true;
    },
    [updateItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.items = state.items.map((ele) =>
        ele.id == action.payload.id ? action.payload : ele
      );
    },
    [updateItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  }
});


export default productsSlice.reducer;
