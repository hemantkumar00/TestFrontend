import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../GlobalStateContext";

const TestseriesHeading = ({
  heading,
  price,
  description,
  image,
  count,
  checkoutHandler,
  buybutton,
}) => {
  const { userData } = useGlobalState();
  // async function fetchUser(){
  //   const response = await axios.get(`${API}/user`, {
  //     withCredentials: true,
  //   });

  //   const responseData = JSON.parse(response.request.response);
  //   setUserData(responseData);
  // }

  return (
    <>
      <div
        style={{
          display: "flex",
          backgroundColor: "#f6f6f6",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        }}
        className="mt-4"
      >
        <div
          style={{
            flex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {heading}
          </h1>
          <p style={{ fontSize: "18px", color: "#555", marginBottom: "20px" }}>
            {count} Tests
          </p>
          <p style={{ fontSize: "18px", color: "#555", marginBottom: "20px" }}>
            {description}
          </p>
        </div>

        <div
          style={{
            width: "18rem",
            marginLeft: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="card">
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
                <strong>₹ {price}</strong> /only
              </p>

              {!buybutton &&
                (userData ? (
                  <button
                    onClick={() => {
                      checkoutHandler(price);
                    }}
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                  >
                    Buy Now
                  </button>
                ) : (
                  <Link
                    className="btn btn-primary"
                    to="/signin"
                    style={{ width: "100%" }}
                  >
                    Sign In First
                  </Link>
                ))}
              {buybutton && <h3 className="text-success">Enjoy TestSeries!</h3>}

              {/* <p className="card-text">Enjoy giving test</p>s */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestseriesHeading;
