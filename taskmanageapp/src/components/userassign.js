import { useEffect,useState } from "react";
import User from "./user";
import axios from "axios";
import AppTable from "./Table/AppTable";
import { Table } from 'antd';

export default function UserAssign()
{
  const initialState = {
    // company:"",
    // department:"",
    // activity_id:[],
    user_id:"",
    // status:"",
  };
  

const [DataSource,setDataSource]=useState([]);
const [companyList, setCompanyList] = useState([{ id: "", name: "" }]);
const [departmentList, setDepartmentList] = useState([{ id: "", name: "" }]);
const[activitylist,setActivityList]=useState([]);
const [values, setValues] = useState(initialState);
const [value,setValue]=useState([]);
const [selectedRowKeys, setSelectedRowKeys] = useState([]);
const [selectedValue,setSelectedValue]=useState([]);
const [userList,setUserList]=useState([{ id: "", name: "" }]);
const [loading, setLoading] = useState(false);

const[dailyList,setDailyList]=useState({frequency_id:"" });
const[weeklyList,setWeeklyList]=useState({frequency_id:""});
const[monthly,setMonthlyList]=useState({ frequency_id:""});








  const companylistApi = async () => {
    try {

      const result = await axios.get("/company");
     
      setCompanyList(result.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  
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




const input=[
  {
    id: 1,
    type: "select",
    value: values.company || "",
    name: "company",
    label: "Company",
    options: companyList,
    col: 4,
    required: true,
    // classStyle: "mt-2",
  },

    {
        id: 2,
        type: "select",
        value: values.department || "",
        name: "department",
        label: "Department",
        options: departmentList,
        col: 4,
        required: true,
        // classStyle: "mt-2",
      },
      
      {
        id: 3,
        type: "select",
        value: values.user_id || "",
        name: "user_id",
        label: "User",
        options: userList,
        col: 4,
        required: true,
        // classStyle: "mt-2",
      },
      
      
      
     
      

]





const columns=[
   
    {
        title: "S.No",
        dataIndex: "sno",
      },
      { title: "Name Of Activity", dataIndex: "name_of_activity" },
      { title: "Activity Description", dataIndex: "activity_description" },
      { title: "Activity Frequency", dataIndex: "activity_frequency" },
      // {
      //   title: "Activity Category",
      //   dataIndex: "activity_category",
      //   render: (value) => {
      //     return <>{String(value)}</>;
      //   },
      // },
      { title: "User", dataIndex: "user_id" }
]



const activitydeptApi = async (id) => {
  try {
    const result = await axios.get(`/activity_dept/${id}`);
    console.log(result.data.data)
    const newData=[] 
    result.data.data.map((ele,index)=>
    { 
      newData.push({...ele,sno:index+1})
     })
setDataSource(newData);

   

  } catch (error) {
    console.log(error);
  }
};

const deptUserListApi = async (id) => {
  try {
    const result = await axios.get(`/dept_user/${id}`);
    const newData = [];
    result.data?.data.map((ele) => {
      newData.push({ id: ele.id, name: ele.user_name });
    });

    setUserList(newData);
   

  } catch (error) {
    console.log(error);
  }
};


useEffect(()=>{

companylistApi();

},[1])

const selectHandler = (e) => {
  const { name, value } = e.target;
  setValues({ ...values,[name]:value});
  if (name === "company") {
    departmentListApi(Number(value));
    //setValues({ ...values, company: value });
  }

if (name==="department"){
  activitydeptApi(Number(value));  
  deptUserListApi(Number(value));
  
}

};

const updateApi=async (data)=>{
  try{
  const result=await axios.put(`/task`,data)
  alert(result.data)
  setValues(initialState)
  activitydeptApi(values.department)
  }catch(error){
    console.log(error)
  }
  }


const cronApi=async (data)=>{
  try{

    const result=await axios.post('/taskpost',{...data, ...values})
    console.log("crnapi",result)
  }catch(error){
   console.log(error)
  }
}




const onSelectChange = (newSelectedRowKeys) => {
  
    //updateApi()
    setValues({...values,activity_id:newSelectedRowKeys})
    setSelectedRowKeys(newSelectedRowKeys);
  

};

const rowSelection = {
  selectedRowKeys,
  onChange: onSelectChange,
};

console.log(values)

return(
    <>
    <div className="userassignee m-2 ">
    <div class="row">
       {input.map((input)=>(
            <div className="usrassign col-12 col-md-4">
            {input.type === "select" && (
                        <span key={input.id} >
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
                        </span>
                      )}
           
          
                      
       </div>
       
       ))}
          </div>
          </div>
       

        <div className="button mt-2 ms-2" onClick={()=>{
          if(values.user_id && values.activity_id.length>0)
          {
             updateApi(values)

          }
          else{
            alert("please select user id and task")
          }
        }}>
        <button className="btn btn-md btn-success assign">
          Assign
        </button>
        </div>
        
        <div className="fre">

        <div className="button mt-2 ms-2" onClick={()=>{
          cronApi({frequency_id:1})
          
        }}>
          
          <button className="btn btn-md btn-success">
          Daily
        </button>
        </div>
        <div className="button mt-2 ms-2" onClick={()=>{
          cronApi({frequency_id:2})
        }}>
        <button className="btn btn-md btn-success">
          Weekly
        </button>
        </div>
        <div className="button mt-2 ms-2" onClick={()=>{
          cronApi({frequency_id:3})
        }}>
        <button className="btn btn-md btn-success">
          Month
        </button>
        </div>

        </div>
       
       


    <div class="m-2 p-2">
      
          <Table dataSource={DataSource} columns={columns} 
           rowKey={(record) => record.id} 
           rowSelection={rowSelection} 
           pagination={{pageSize:20}}
          
      
          />
    </div>
   
    </>
)
}
