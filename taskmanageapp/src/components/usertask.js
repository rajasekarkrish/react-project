import { useEffect, useState,Link } from "react";
import User from "./user";
import axios from "axios";
import AppTable from "./Table/AppTable";
import Userform from "./userform";
import { useNavigate } from "react-router-dom";
import { Tabs } from 'antd';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabComponent from './tabcomponent';
import Moment from "moment";
import { extendMoment } from "moment-range";

export default function UserActivity() {
  const initialState = {
    status_id:"",
    user_id:"",
  };

  const [values, setValues] = useState(initialState);
  const [userList, setUserList] = useState([{ id: "", name: "" }]);
  const [DataSource, setDataSource] = useState([]);
  const [Daily,setDaily]=useState([]);
  const [Weekly,setWeekly]=useState([]);
  const [Monthly,setMonthly]=useState([]);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState([{ id: "", name: "" }]);
  const [tab, settab] = useState(1);
  const { TabPane } = Tabs;
  const [statusId,setStatusId]=useState("");
  const [value, setValue] = useState('1');
  const moment = extendMoment(Moment);

 
   
  


const inputs=[
  {
    id: 1,
    type: "select",
    value: values.status_id || "",
    name: "status_id",
    label: "Status",
    options: statuses,
    col: 2,
    required: true,
  }, 
];

const navigate = useNavigate ()
  const userActivityApi = async (id) => {
    try {
      //console.log("value",a)
      const result = await axios.get(`/usertaskactivity/${id}`);
      console.log(result.data.data);
      const newData = [];
      result.data.data.map((ele, index) => {
        newData.push({ start_date:ele.start_date,end_date:ele.end_date,name_of_activity:ele.activity_detail.name_of_activity,activity_description:ele.activity_detail.activity_description,sno: index + 1,id:ele.activity_detail.id});
        
      });
      setDataSource(newData);
      
      console.log(DataSource)
      setLoading(false);
      // const newData1=[];
      // result.data.data[1]["activity_detail"]["activity_description"].map((element)=>{
      //   newData1.push({...element})
        
      // })
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    
  };
  

  const userActivityDailyApi = async (status_id) => {
    try {
      //console.log("value",a)
      let id = JSON.parse(sessionStorage.getItem("user_details"))?.user_id;
      const result = await axios.get(`/userdaily/${id}?status_id=${status_id}`);
      console.log(result.data.data);
      const newData = [];
      result.data.data.map((ele, index) => {
        newData.push({ start_date:ele.start_date,end_date:ele.end_date,name_of_activity:ele.activity_detail.name_of_activity,activity_description:ele.activity_detail.activity_description,
          sno: index + 1,id:ele.activity_detail.id,Report_to:ele.user_detail.assign_to_id,StatusName:ele.status.status,
          Reporting_to:ele.user_detail.assign,record_count:ele.record_count
        });
      // const start = moment(start_date).format("DD-MM-YYYY");
      // const end = moment(end_date).format("DD-MM-YYYY");
      });
      setDaily(newData);
      console.log(Daily)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    
  };

// module.exports(userActivityDailyApi)

  const userActivityWeeklyApi = async (status_id) => {
    try {
      let id = JSON.parse(sessionStorage.getItem("user_details"))?.user_id;
      const result = await axios.get(`/userweekly/${id}?status_id=${status_id}`);
      console.log(result.data.data);
      const newData = [];
      result.data.data.map((ele, index) => {
        newData.push({ start_date:ele.start_date,end_date:ele.end_date,name_of_activity:ele.activity_detail.name_of_activity,activity_description:ele.activity_detail.activity_description,
          sno: index + 1,id:ele.activity_detail.id,StatusName:ele.status.status,Reporting_to:ele.user_detail.assign,record_count:ele.record_count});
        });
      setWeekly(newData);
      console.log(Daily)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    
  };


  const userActivityMonthlyApi = async (status_id) => {
    try {
      let id = JSON.parse(sessionStorage.getItem("user_details"))?.user_id;
      const result = await axios.get(`/usermonthly/${id}?status_id=${status_id}`);
      console.log(result.data.data);
      const newData = [];
      result.data.data.map((ele, index) => {
        newData.push({ start_date:ele.start_date,end_date:ele.end_date,name_of_activity:ele.activity_detail.name_of_activity,
          activity_description:ele.activity_detail.activity_description,sno: index + 1,
          id:ele.activity_detail.id,StatusName:ele.status.status,Reporting_to:ele.user_detail.assign,record_count:ele.record_count});
      });
      setMonthly(newData);
      console.log(Daily)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    
  };
  const userActivityStatus = async (id) => {
    try {
      const result = await axios.get(`/taskstatus`);
      console.log(result.data.data);
      const newData = [];
      result.data.data.map((ele, index) => {
        newData.push({ start_date:ele.start_date,end_date:ele.end_date,name_of_activity:ele.activity_detail.name_of_activity,activity_description:ele.activity_detail.activity_description,
          sno: index + 1,id:ele.activity_detail.id,status_id:ele.status.id,StatusName:ele.status.status,
        Reporting_to:ele.user_detail.assign});
      });
      setStatuses(newData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    
  };

  const statusApi = async () => {
    try {
      const result = await axios.get("/status");
      console.log("status", result.data.data);
      const newData = [];
      result.data?.data.map((ele) => {
        newData.push({ id: ele.id, name: ele.status });
      });
      setStatuses(newData);
    } catch (error) {
      console.log(error);
    }
  };




  

console.log(DataSource)

  useEffect(() => {
    let a = JSON.parse(sessionStorage.getItem("user_details"))?.user_id;
    // userActivityApi(Number(a));
    // userActivityDailyApi();
    // userActivityWeeklyApi(Number(a));
    // userActivityMonthlyApi(Number(a));
    // statusApi();
  }, [1]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
    },
    { title: "Name Of Activity", dataIndex: "name_of_activity",

    render:  (text, record)=><><span onClick={()=>{navigate("/userform", {state:{recordId:record.id,Activity:record.name_of_activity,Description:record.activity_description,Startdate:record.start_date,
      Enddate:record.end_date,Status:record.StatusName,Reports_to:record.Reporting_to,count:record.record_count}})}}> {text}</span></>
    
  },
    {title: "Activity Description", dataIndex: "activity_description",},
    {title:"Start Date",dataIndex:"start_date"},
    {title:"End Date",dataIndex:"end_date"},
    // {title:"id",dataIndex:"id"},
  ];
  
  

  const selectHandler = (e) => {
    // let a = JSON.parse(sessionStorage.getItem("user_details")).user_id;
    console.log(e)
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    userActivityStatus(values);
  };
  
  console.log(values);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    userActivityDailyApi()
    
  };
console.log(statusId)

useEffect(() => {
  userActivityDailyApi(statusId)
  userActivityWeeklyApi(statusId)
  userActivityMonthlyApi(statusId)
}, [statusId]);


  return (
    <>
    <div className='tabs' style={{paddingTop:15}}>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}  >
          <TabList onChange={handleChange} aria-label="lab API tabs example" TabIndicatorProps={{
    style: {
      backgroundColor: "#FF460C",
      
    }  
   }}>
            <Tab className="text-white" label="Daily Activity" value="1" />
            <Tab className="text-white" label="Weekly Activity" value="2" />
            <Tab className="text-white" label="Monthly Activity" value="3" />
          </TabList>
          <TabComponent setStatusId={setStatusId}/>
        </Box>
        <TabPanel value="1">
        {<AppTable data={Daily} columns={columns} />}
        </TabPanel>
        <TabPanel value="2">
        {<AppTable data={Weekly} columns={columns} />}
        </TabPanel>
        <TabPanel value="3">
        {<AppTable data={Monthly} columns={columns} />}
        </TabPanel>
      </TabContext>
    </Box>
    </div>
</>      
  );
}
