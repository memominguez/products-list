import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import ProductForm from "./components/ProductForm";
import ProductsList from "./components/ProductsList";
import Refreshing from "./components/Refreshing";


function App() {
 

  return (
  <Router>
    <Header />
    <div className="container mt-5">
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/crear-producto" element={<ProductForm />} />
        <Route path="/editar-producto/:id" element={<ProductForm />} />
        <Route path="/refresh" element={<Refreshing />} />
      </Routes>
    </div>
  </Router>
   
  )
}

export default App
