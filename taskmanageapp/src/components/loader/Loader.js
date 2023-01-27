import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const Loader = () => {
  return (
    <div class="loader">
      <div class="text-center load-spin">
        <Spin indicator={antIcon} />;
      </div>
    </div>
  );
};

export default Loader;
