import { Table } from "antd";
import React, { useState } from "react";

const AppTable = ({ data = [], columns = [] }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  return <Table pagination={{pageSize:30}} columns={columns}  dataSource={data} 

  
  />;
};

export default AppTable;
