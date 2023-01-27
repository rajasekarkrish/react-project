import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from "axios";
import { useEffect, useState,Link } from "react";
import { useLocation } from "react-router-dom";

// var http = require('http');
// const {userActivityDailyApi} = require('./usertask.js');



export default function TabComponent({setStatusId}) {
  const [value, setValue] = useState("");
  const location = useLocation();
  const {record_count}=location.key
  console.log(record_count)
  
  const [taskstatus,setTaskStatus]=useState([{ id: "", name: "" }]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStatusId(newValue);

  };
  

  const taskStatusApi = async () => {
    try {
      const result = await axios.get("/status");
      console.log("status", result.data.data);
      const newData = [];
      result.data?.data.map((ele) => {
        newData.push({ id: ele.id, name: ele.status });
      });
      setTaskStatus(newData);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    taskStatusApi();
    
  }, [1]);

console.log(taskstatus)

  return (
    
    <div style={{paddingTop:10}}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" >
            {/* {taskstatus.map((ele)=>{
               <Tab value={ele.id} label={ele.name}/> 
            })} */}
            <Tab label="Open" value="1"/>
            <Tab label="In-Progress" value="2" />
            <Tab label="On-hold" value="3" />
            <Tab label="Complete" value="4" />
            <Tab label="Reviewed" value="5" />
            <Tab label="Reopen" value="6" />
            <Tab label="Closed" value="7" />
            <Tab label="All" value=""/>
          </TabList>
        </Box>
      </TabContext>
    </Box>
    </div>
  );
}
