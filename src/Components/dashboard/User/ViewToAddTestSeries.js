import axios from "axios";
import React from "react";
import { API } from "../../../API";
import { toast } from "react-toastify";

const ViewToAddTestSeries = ({ data, userId, onTestSeriesDeleted }) => {
  function callDeleteFunction() {
    onTestSeriesDeleted();
  }
  async function handleTestSeriesToUser() {
    try {
      await axios.post(
        `${API}/admin/add/testseries/${userId}/${data._id}`,
        {},
        {
          withCredentials: true,
        },
      );
      // Call the parent component's callback to inform about the deletion
      await callDeleteFunction();
      toast.success(`Msg: Added successFully`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (e) {
      // console.log(e);
      toast.error(`Msg: error in Adding`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <i className="bi bi-person"></i> Name: {data.topic}
        </div>
        <div>
          <button
            onClick={() => {
              //   handleTestSeriesFromUser();
              handleTestSeriesToUser();
            }}
            className="btn btn-outline-success"
          >
            Add
          </button>
        </div>
      </div>
    </li>
  );
};

export default ViewToAddTestSeries;
