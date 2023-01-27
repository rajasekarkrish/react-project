import React, { useState } from "react";
import axios from "axios";
import AppMultiSelect from "../MultiSelect/AppMultiSelect";
import AppTable from "../Table/AppTable";
import { useEffect } from "react";
import Loader from "../loader/Loader";
import swal from "sweetalert";
import MyMultiSelect from "../MyMultiSelect/MyMultiSelect";
import MultiSelect from "../MultiSelect";
import { DeleteTwoTone } from "@ant-design/icons";


export default function Activity() {
  const initialState = {
    name_of_activity: "",
    activity_frequency: "",
    activity_category: [],
    activity_reference:[],
    activity_description: "",
    company: "",
    department: "",
    user: "",
  };

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [add, setAdd] = useState(false);
  const [companyList, setCompanyList] = useState([{ id: "", name: "" }]);
  const [departmentList, setDepartmentList] = useState([{ id: "", name: "" }]);
  const [userList, setUserList] = useState([{ id: "", name: "" }]);
  const [frequencyList, setFrequencyList] = useState([{ id: "", name: "" }]);
  const [categoryList, setCategoryList] = useState([{ id: "", name: "" }]);
  const [categoryReferenceList, setCategoryReferenceList] = useState([ { id: "", name: "" },
  ]);
  const [data, setData] = useState([]);

  //search functionality
  const [search, setSearch] = useState("");

  const companylistApi = async () => {
    try {
      
      const result = await axios.get("/company");
      console.log(result);
      setCompanyList(result.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const taskList = async () => {
    setLoading(true);
    try {
      const result = await axios.get("/task");

      const resultData = result.data.data.map(
        ({ activity_category, ...rest }) => {
          return rest;
        }
      );
      setData(result.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const categoryListApi = async () => {
    setLoading(true);
    try {
      const result = await axios.get("/category");
      console.log(result);
      const newData = [];
      result.data?.data.map((ele) => {
        newData.push({ id: ele.id, name: ele.categoryname });
      });
      console.log(newData);
      setLoading(false);
      setCategoryList(newData);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //console.log(data);
  const departmentListApi = async (id) => {
    try {
      const result = await axios.get(`/get_dept/${id}`);

      const newData = [];
      result.data?.data.map((ele) => {
        newData.push({ id: ele.id, name: ele.dept_name });
      });

      setDepartmentList(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const userListApi = async () => {
    try {
      const result = await axios.get("/userlist");

      const newData = [];
      result.data?.data.map((ele) => {
        newData.push({ id: ele.id, name: ele.user_name });
      });

      setUserList(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const frequencyListApi = async () => {
    try {
      const result = await axios.get("/frequency");

      const newData = [];
      result.data?.data.map((ele) => {
        newData.push({ id: ele.id, name: ele.activityname });
      });

      setFrequencyList(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const taskDeleteApi = async (id) => {
    try {
      axios.delete(`/delete/${id}`).then(() => {
        taskList();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const categoryReferenceApi = async () => {
    setLoading(true);
    try {
      const result = await axios.get("/categoryreference");
      const newData = [];
      result.data?.data.map((ele) => {
        newData.push({ id: ele.id, name: ele.categorytype });
      });
      setCategoryReferenceList(newData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(values)

  //useEffect for fecthing and requesting
  useEffect(() => {
    companylistApi();
    userListApi();
    taskList();
    frequencyListApi();
    categoryListApi();
    categoryReferenceApi();
  }, []);
  const inputs = [
    {
      id: 1,
      type: "text",
      value: values.name_of_activity || "",
      name: "name_of_activity",
      label: "Name of Activity",
      col: 5,
      required: true,
    },

    {
      id: 2,
      type: "select",
      value: values.activity_frequency || "",
      name: "activity_frequency",
      label: "Activity Frequency",
      options: frequencyList,
      col: 5,
      required: true,
    },
    {
      id: 4,
      type: "select",
      value: values.company || "",
      name: "company",
      label: "Company",
      options: companyList,
      col: 5,
      required: true,
      classStyle: "mt-2",
    },
    {
      id: 5,
      type: "select",
      value: values.department || "",
      name: "department",
      label: "Department",
      options: departmentList,
      col: 5,
      required: true,
      classStyle: "mt-2",
    },

    {
      id: 3,
      type: "multi-select",
      value: values.activity_category || "",
      name: "activity_category",
      label: "Activity category",
      options: categoryList || [],
      col: 5,
      required: true,
      classStyle: "mt-2",
    },
    {
      id: 6,
      type: "multi-select",
      value: values.category_reference || "",
      name: "category_reference",
      label: "Category Reference",
      options: categoryReferenceList,
      col: 5,
      required: true,
      classStyle: "mt-2",
    },

    {
      id: 55,
      value: values.activity_description || "",
      type: "textarea",
      name: "activity_description",
      label: "Activity Description",
      col: 12,
      classStyle: "mt-2",
      required: true,
    },
  ];

  const columns = [
    {
      title: "S.No",
      dataIndex: "sr",
    },
    { title: "Name Of Activity", dataIndex: "name_of_activity" },
    { title: "Activity Description", dataIndex: "activity_description" },
    { title: "Activity Frequency", dataIndex: "activity_frequency" },
    {
      title: "Activity Category",
      dataIndex: "activity_category",
      render: (value) => {
        return <>{String(value)}</>;
      },
    },
    {
      title: "Activity Reference",
      dataIndex:"category_reference",
      render: (value) => {
        return <>{String(value)}</>;
      },
    },
    { title: "Company", dataIndex: "company" },
    { title: "Department", dataIndex: "department" },
    {
      dataIndex: "action",
      title: <>Action</>,
      render: (value, record) => {
        return (
          <>
            <button
              className="btn btn-lg"
              onClick={() => {
                taskDeleteApi(record.id);
              }}
            >
              <DeleteTwoTone />
            </button>
          </>
        );
      },
      key: "action",
    },
  ];

  // inputs.map((ele) => {
  //   columns.push({ title: ele.label, dataIndex: ele.name });
  // });

  //console.log(columns)
  //functions
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setError(false);
  };
  const selectHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (name === "company") {
      departmentListApi(Number(value));
      setValues({ ...values, company: value });
    }
    setError(false);
  };
  const textHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
     
    if (values.activity_category.length > 0) {
      setAdd(false);
      setValues(initialState);

      //sending request for adding new task
      axios
        .post(`/task`, values, 
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        //     "Content-Type": "application/json",
        //     accept: "application/json",
        //   },
        // }
        )
        .then((res) => {
          setLoading(false);
          swal({
            text: "Task added successfully...",
            icon: "success",
          });
          setValues(initialState);
          taskList();
        })
        .catch((error) => {
          setLoading(false);
          setError(error?.response || "Something went wrong!");
        });
    } else {
      alert("please add category!");
    }
  };
  const [searchFinalData, setSearchFinalData] = useState([]);
  var newData = [];
  data?.map((e, index) => {
    newData.push({ ...e, sr: index + 1 });
  });
  // console.log(searchFinalData);

  const onSearchInput = (searchinput) => {
    //console.log(searchinput.target.value)
    setSearch(searchinput.target.value);
  };

  const [prevData, setPreveData] = useState([]);
  //useEffect for search globaly
  useEffect(() => {
    setSearch(search);
    if (search === "") {
      setSearchFinalData(newData);
    } else {
      function filterData(data, filterValues) {
        return data.filter((value) => {
          return filterValues
            .trim()
            .split(", ")
            .every((filterValue) => checkValue(value, filterValue));
        });
      }

      function checkValue(value, filterValue) {
        if (typeof value === "string") {
          return value.toLowerCase().includes(filterValue.toLowerCase());
        } else if (
          typeof value === "object" &&
          value !== null &&
          Object.keys(value).length > 0
        ) {
          if (Array.isArray(value)) {
            return value.some((v) => checkValue(v, filterValue));
          } else {
            return Object.values(value).some((v) => checkValue(v, filterValue));
          }
        } else {
          return false;
        }
      }

      setPreveData(filterData(newData, search));
    }
  }, [search]);

  // search functionality button
  const onSearch = () => {
    setSearchFinalData(prevData);
  };

  useEffect(() => {
    setSearchFinalData(newData);
  }, [data]);

console.log(values)

  return (
    <>
      {/* {loading && <Loader />} */}
      <div className="activity m-2" style={{ paddingTop: 30 }}>
        { (
          <div>
            <div className="">
              <form onSubmit={handleSubmit}>
                <div class="row">
                  {inputs.map((input) => (
                    <div
                      key={input.id}
                      className={`col-12 col-lg-${input.col}`}
                    >
                      {/* textarea  */}
                      {input.type === "textarea" && (
                        <div key={input.id} className={` ${input.classStyle}`}>
                          <label className="mb-2" for={input.label}>
                            {input.label}
                            <span class="text-danger">*</span>
                          </label>
                          <textarea
                            {...input}
                            onChange={textHandler}
                            class="form-control"
                            placeholder="Leave a comment here"
                            id="floatingTextarea2"
                            style={{ height: "100px" }}
                          />
                        </div>
                      )}
                      {input.type === "text" && (
                        <div key={input.id}>
                          <label for={input.label} className="mb-2">
                            {input.label}
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            placeholder={`Enter ${input.label}`}
                            onChange={inputHandler}
                            {...input}
                            className="form-control"
                          />
                        </div>
                      )}
                      
                      {/* //select  */}
                      {input.type === "select" && (
                        <div key={input.id} className={` ${input.classStyle}`}>
                          <label for={input.label} className="mb-2">
                            {input.label}
                            <span class="text-danger">*</span>
                          </label>
                          <select
                            onChange={selectHandler}
                            {...input}
                            className="form-select"
                          >
                            <option value="">{`Select ${input.label}`}</option>
                            {input.options?.map((ele) => {
                              return (
                                <option value={ele.id} key={ele.id}>
                                  {ele.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      )}
                      {/* //multi select  */}
                      {input.type === "multi-select" && !loading && (
                        <div key={input.id} className={`${input.classStyle}`}>
                          <label for={input.label} className="mb-2">
                            {input.label}
                            <span class="text-danger">*</span>
                          </label>
                          <MyMultiSelect
                            selectedValues={(value) =>
                              setValues({ ...values, [input.name]:value })
                            }
                            list={input.options}
                            initailVal={values[input.name]}                        
                            />

                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button type="submit" className="btn btn-primary m-3 ">
                  Submit
                </button>
                

              </form>
            </div>
          </div>
        )}
        <div class="input my-2">
          <input
            type="text"
            className="form-control w-50 d-inline-block py-1"
            onChange={onSearchInput}
          />
          <button
            className="btn btn-md btn-success m-4 py-1"
            onClick={onSearch}
          >
            search
          </button>
        </div>

        {/* //table  */}
        <div class="m-2">
          <AppTable data={searchFinalData} columns={columns}  />
        </div>
      </div>
    </>
  );
}
