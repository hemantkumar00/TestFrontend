import React, { useEffect, useState } from "react";
import NewTestSeries from "./NewTestSeries";
import SingleTestSeries from "./SingleTestSeries";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../API";

const TestSeries = () => {
  const [openAddTestSeries, setOpenAddTestSeries] = useState(false);
  const [data, setData] = useState(null);
  const [relaod, setReload] = useState(false);

  function handleAddTestSeriesForm() {
    setOpenAddTestSeries(!openAddTestSeries);
  }

  async function fetchAllTestSeries() {
    try {
      const response = await axios.get(`${API}/all/testseries`);
      const responseData = JSON.parse(response.request.response).testSeries;
      setData(responseData);
      // console.log(response);
    } catch (e) {
      // const error = JSON.parse(e.request.response).error;
      toast.error(`Msg: Error in fetching testseries`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  function hitReload() {
    setReload(true);
  }

  useEffect(() => {
    fetchAllTestSeries();
    setReload(false);
  }, [relaod]);

  return (
    <div className="col-lg-10 col-md-8 col-sm-12 px-5 ">
      <button
        onClick={handleAddTestSeriesForm}
        className="btn btn-outline-primary"
        style={{ float: "right", display: "block" }}
      >
        Add TestSeries
      </button>
      {openAddTestSeries && (
        <NewTestSeries
          toggleForm={handleAddTestSeriesForm}
          hitReload={hitReload}
        />
      )}
      <div style={{ marginTop: "50px" }}>
        {data &&
          data.map((data, index) => {
            return (
              <SingleTestSeries
                key={index}
                topic={data.topic}
                price={data.price}
                description={data.description}
                image={data.image}
                id={data._id}
                hitReload={hitReload}
                data={data}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TestSeries;
