import React, { useState, useEffect } from "react";
import axios from "axios";
import AppTable from "./Table/AppTable";
import swal from "sweetalert";
import Loader from "./loader/Loader";
import { Radio, Switch } from "antd";
import Usertask from "./usertask";
import { useLocation } from "react-router-dom";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

// import 'moment-timezone';

export default function Userform() {
  const initialState = {
    comments: "",
    document: "",
    status_id: "",
    company: "",
    department: "",
    id: "",
    user_id: "",
  };

  const [values, setValues] = useState(initialState);
  const [userList, setUserList] = useState([{ id: "", name: "" }]);
  const [status, setStatus] = useState([{ id: "", name: "" }]);
  const [DataSource, setDataSource] = useState([]);
  const [toggle, settoggle] = useState(false);
  const [ticketStatus, setTicketStatus] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState("");

  const location = useLocation();
  const {
    recordId,
    Activity,
    Description,
    Startdate,
    Enddate,
    Status,
    Reports_to,
    count,
  } = location.state;

  const username = JSON.parse(sessionStorage.getItem("user_details")).user_name;

  const today = moment().format("YYYY-MM-DD");
  // console.log("today", today);
  const [startdate, starttime] = Startdate.split("T");
  const [enddate, endtime] = Enddate.split("T");
  const start = moment(startdate).format("DD-MM-YYYY");
  const end = moment(enddate).format("DD-MM-YYYY");
  const end_date = moment(enddate);
  // console.log("enddate", end);
  const time_remaining = end_date.diff(today, "days");
  const formData = new FormData();

  const inputs = [
    {
      id: 1,
      type: "textarea",
      value: values.comments || "",
      name: "comments",
      label: "Comments",
      col: 4,
      required: true,
    },

    {
      id: 2,
      type: "select",
      value: values.status_id || "",
      name: "status_id",
      label: "Status",
      options: status,
      col: 4,
      required: true,
    },

    {
      id: 4,
      type: "file",
      value: values.document || "",
      name: "document",
      label: "Support Documents",
      col: 4,
      required: true,
      classStyle: "mt-3",
    },
    {
      id: 10,
      type: "checkbox",
      value: values.secordary_assign || "",
      name: "secondary assign",
      label: "Secondary Assign",
      col: 4,
      required: true,
      classStyle: "form-check form-switch",
    },
  ];

  const input2 = [
    {
      id: 100,
      label: "Activity",
      value: Activity || "",
      col: 4,
      required: true,
    },
    {
      id: 111,
      label: "Description",
      value: Description || "",
      col: 4,
      required: true,
    },
    {
      id: 121,
      label: "Reporting To",
      value: Reports_to || "",
      col: 4,
      required: true,
    },
    {
      id: 131,
      label: "Start Date",
      value: start || "",
      col: 4,
      required: true,
    },
    {
      id: 141,
      label: "End Date",
      value: end || "",
      col: 4,
      required: true,
    },
    {
      id: 151,
      label: "Status",
      value: ticketStatus || "",
      col: 4,
      required: true,
    },
    {
      id: 161,
      label: "Remainning Time",
      value: time_remaining + " " + "days" || "",
      col: 4,
      required: true,
    },
  ];
  // console.log(Description);
  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
    },
    { title: "comments", dataIndex: "comments" },
    { title: "Time of opened", dataIndex: "Time_of_opened" },
    { title: "Insert by", dataIndex: "insert_by" },
    { title: "Status", dataIndex: "status" },
    // {title:"id",dataIndex:"id"},
  ];

 

  useEffect(() => {
    setTicketStatus(Status);
  }, [1]);

console.log("tickettttt status",Status)

  const statusApi = async () => {
    try {
      const result = await axios.get("/status");
      // console.log("status", result.data.data);
      const newData = [];
      result.data?.data.map((ele) => {
        newData.push({ id: ele.id, name: ele.status, });
      });
      setStatus(newData);
      // setTicketStatus(newData.status)

    } catch (error) {
      console.log(error);
    }
  };
console.log(ticketStatus)
  const userTaskApi = async (data) => {
    try {
      const result = await axios.post("/usertask", data);
      console.log("usertaskapi result", data);
      swal({
        text: "Userlog added successfully...",
        icon: "success",
      });
      setValues(initialState);
      userLogApi(Number(recordId));

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const userTaskUpdateApi = async (data, id) => {
    try {
      const result = await axios.put(`/taskpost/${id}`, data);
      console.log("ticket status",result.data.status)
      setTicketStatus(result.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  //console.log("asdf;lkj",ticketStatus)

  const userLogApi = async (id) => {
    try {
      const result = await axios.get(`/usertask/${id}`);
      const newData = [];
      result.data.data.map((ele, index) => {
        newData.push({ ...ele, sno: index + 1 });
      });
      setDataSource(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const selectHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    statusApi();
    userLogApi(Number(recordId));
  }, [1]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const textHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const fileOnchange = (e) => {
    setValues({ ...values, document: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = JSON.parse(sessionStorage.getItem("user_details")).user_id;

    const { document, comments, status_id,id } =values;
    const form = new FormData();
    form.append("document", document);
    form.append("comments", comments);
    form.append("status_id", status_id);
    form.append("id", id);
    form.append("inserted_by_id", user);
    form.append("ticket_id", recordId);
    userTaskApi(form);
    userTaskUpdateApi(form, recordId);
    // console.log({ inserted_by_id: a,form, ticket_id: recordId });
    ////////today///////
    // const file = e.currentTarget["fileInput"].files[0];
    // const formData = new FormData();
    // formData.append("file", file);
    // userLogApi(Number(recordId))
  };
  

  console.log(values.document);

  return (
    <>
      <div class="mt-4 pt-4">
        <form class="p-2 m-2">
          <div className="ticket">
            <label className="mb-3 p-2 m-2">
              Ticket Number
              <span class="text-danger"> </span>
              <label className="">{recordId}</label>
            </label>

            <label className="ticketassign p-2 m-2">
              Assign To
              <span class="text-danger"> </span>
              <label className="mb-3">{username}</label>
            </label>

            <div class="row">
              {input2.map((ele) => {
                return (
                  // {ele.label==="Activity" ||ele.label==="Activity Description"?
                  <div class="col-3">
                    {ele.label && (
                      <label for={ele.label} className="mb-2">
                        {ele.label}
                        <h6>
                          <span class="text-dark">
                            {" "}
                            <span>{ele.value}</span>
                          </span>
                        </h6>
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>

      <div class="m-2 p-3">
        <form class="" onSubmit={handleSubmit}>
          <div class="row">
            {inputs.map((ele) => {
              return (
                <div class="col-12 col-lg-6 p-2 ">
                  {ele.type === "textarea" && (
                    <div key={ele.id} className={` ${ele.classStyle}`}>
                      <label className="mb-2" for={ele.label}>
                        {ele.label}
                        <span class="text-danger">*</span>
                      </label>
                      <textarea
                        {...ele}
                        onChange={textHandler}
                        class="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        style={{ height: "100px" }}
                      />
                    </div>
                  )}

                  {ele.type === "file" && (
                    <div key={ele.id} className={` ${ele.classStyle}`}>
                      <label for={ele.label} className="mb-2">
                        {ele.label}
                        <span class="text-danger">*</span>
                      </label>
                      <div>
                        <input
                          type="file"
                          id={ele.id}
                          name={ele.name}
                          onChange={fileOnchange}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    {ele.type === "switch" && (
                      <Switch
                        defaultChecked
                        onChange={() => settoggle(!toggle)}
                      />
                    )}
                  </div>

                  {ele.type === "select" && (
                    <div key={ele.id} className={` ${ele.classStyle}`}>
                      <label for={ele.label} className="mb-2">
                        {ele.label}
                        <span class="text-danger">*</span>
                      </label>
                      <select
                        onChange={selectHandler}
                        {...ele}
                        className="form-select"
                      >
                        <option value="">{`Select ${ele.label}`}</option>
                        {ele.options?.map((ele) => {
                          return (
                            <option value={ele.id} key={ele.id}>
                              {ele.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                </div>
              );
            })}

            <div class="col-12 col-lg-4">
              <button type="submit" className="btn btn-primary mt-2 ">
                Save
              </button>
            </div>
            <div class="mt-3">
              <AppTable data={DataSource} columns={columns} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
