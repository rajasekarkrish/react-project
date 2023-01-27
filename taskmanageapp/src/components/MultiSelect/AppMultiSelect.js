import { Select } from "antd";
import React, { useEffect, useState } from "react";

const AppMultiSelect = ({ option = [], selected, placeholder = "" }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = option.filter((o) => !selectedItems.includes(o));

  useEffect(() => {
    selected && selected(selectedItems);
  }, [selectedItems]);
  return (
    <Select
      mode="multiple"
      placeholder={placeholder}
      value={selectedItems}
      onChange={(e) => setSelectedItems(e)}
      style={{
        width: "100%",
      }}
    >
      {filteredOptions.map((item) => (
        <Select.Option key={item} value={item}>
          {item}
        </Select.Option>
      ))}
    </Select>
  );
};

export default AppMultiSelect;
