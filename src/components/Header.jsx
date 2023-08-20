import { Link } from "react-router-dom"

const Header = () => {
  return (
   <nav className="navbar navbar-expand-lg bg-info justify-content-between">
    <div className="container">
        <h1>
            <Link to={"/"} className="text-decoration-none">
                CRUD - React, Redux toolkit</Link>
        </h1>

        <Link to ={"/crear-producto"}
            className="btn btn-success d-block d-md-inline-block nuevo-post"
        >Add item &#43;</Link>
    </div>
   </nav>
  )
}

export default Header
