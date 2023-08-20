import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Refreshing = () => {
  // Dummy page for forcing re-render of ProductsList component, after a "delete" action
  const navigate = useNavigate();

  useEffect(() => {
    const refreshPage = setTimeout(() => {
      navigate("/");
    }, 1200);

    return () => {
      clearTimeout(refreshPage);
    };
  }, [navigate]);

  return <h2>Refreshing...</h2>;
};

export default Refreshing;
