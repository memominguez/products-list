/* eslint-disable react/prop-types */
const Error = ({children}) => {
    return (
      <div className="bg-danger text-white text-center p-2 mb-2 text-uppercase">
        {children}
      </div>
    );
  };
  
  export default Error;
  