import React, { useState } from "react";
import Company from "./company";
import Department from "./department";
import User from "./user";
import Category from "./category";
import Categorytype from "./categorytype";
import Activity from "./Activity/Activity";
import Frequency from "./frequency";
import UserAssign from "./userassign";
import Status from "./status";
import { Tabs } from 'antd';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabComponent from './tabcomponent';
import { blue } from "@mui/material/colors";
import { withTheme } from "@emotion/react";



export default function Dashboard() {
  const [active, setActive] = useState("Company");
  const [color,setColor]=useState('');
  const [textColor,setTextColor]=useState('white');
  const [isHover, setIsHover] = useState(false);




 const buttons = ["Company", "Department","Frequency","Category","User","Category Reference","Activity","User Assign","Status"]
 
 const [value, setValue] = useState('Company');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>

      {/* <div className="dashboard w-100 my-3 py-4 dashboard-btn">
        <div className="dashbutton">
          {buttons.map((ele)=>{
            return <button key={ele}
            onClick={() => {
              setActive(ele)
            }}
            className={`btn btn-sm btn-${active===ele?"primary":"light"} mx-2`}
          >
            {ele}
       </button>
          })}  
        </div>  
      </div> */}

<div className="navdash" style={{paddingTop:15}}>
      <Box sx={{ width: '100%', typography: 'body1'}}>
      <TabContext className="dashboardnav" value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList className="custom-tabs" onChange={handleChange} aria-label="lab API tabs example"  TabIndicatorProps={{
    style: {
      textColor:"white",
      backgroundColor: "#FF460C",
      
    }
  }}>
            
            <Tab className="text-white" label="Company" value="Company" />
            <Tab className="text-white" label="Department" value="Department" />
            <Tab className="text-white" label="User" value="User" />
            <Tab className="text-white" label="Category" value="Category" />
            <Tab className="text-white" label="Category Reference" value="Category Reference" />
            <Tab className="text-white" label="Activity" value="Activity" />
            <Tab className="text-white" label="Frequency" value="Frequency" />
            <Tab className="text-white" label="User Assign" value="User Assign"/>
            <Tab className="text-white" label="Status" value="Status"/>
          </TabList>
        </Box>
      </TabContext>
    </Box>
    </div>



      <div class="my-1 pt-1">
        {value === "Company" && <Company />}
        {value === "Department" && <Department />}
        {value === "User" && <User />}
        {value ==="Category" && <Category/>}
        {value ==="Category Reference" && <Categorytype/>}
        {value ==="Activity" && <Activity/>}
        {value ==="Frequency" && <Frequency/>}
        {value ==="User Assign" && <UserAssign/>}
        {value ==="Status" && <Status/>}
      </div>
     
    </>
  );
}
