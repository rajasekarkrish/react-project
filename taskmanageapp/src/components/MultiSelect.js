import { Select } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";

const MultiSelect = ({
  productGet = false,
  afterClose = false,
  initailVal = [],
  placeholder = "",
  _id = false,
  selectedValues = false,
  list = [{ id: "1", name: "no data found" }],
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  // const filteredOptions = list?.filter((o) => !selectedItems?.includes(o.name));
console.log(list)
  useEffect(() => {
    if (productGet) {
      const res = [];
      for (let i = 0; i < list.length; i++) {
        const { id } = list[i];
        if (selectedItems?.includes(id)) {
          res.push(list[i]);
        }
      }
      productGet(res);
    }

    selectedValues && selectedValues(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    if (initailVal) {
      setSelectedItems(initailVal);
    } else {
      setSelectedItems([]);
    }
  }, [afterClose]);

  return (
    <Select
      id={_id}
      mode="multiple"
      placeholder={placeholder}
      value={selectedItems}
      onChange={setSelectedItems}
      style={{
        width: "100%",
      }}
      getPopupContainer={(trigger) => trigger.parentElement}
    >
      {list?.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default MultiSelect;
