import React, { useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabComponent from './tabcomponent';


export default function Customtabs() {
  const [value, setValue] = useState("");


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 
  return (
    <div className='tabs' style={{paddingTop:10}}>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}  TabIndicatorProps={{
    style: {
      backgroundColor: "#FF460C",
      
    }
  }}>
            
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab className="text-white" label="Daily Activity" value="1" />
            <Tab className="text-white" label="Weekly Activity" value="2" />
            <Tab className="text-white" label="Monthly Activity" value="3" />
          </TabList>
          <TabComponent/>
        </Box>
      </TabContext>
    </Box>
    </div>
  );
}
