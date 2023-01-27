import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import AppTable from "./Table/AppTable";
export default function Categorytype(){
    const initialState = {
        category:"",
        categorytype:"",
        description:"",
      };
    
    const [values, setValues] = useState(initialState);
    const [catlist,SetCatList]=useState([{ id: "", categoryname: "" }]);
    const [dataSource, setDataSource] = useState([]);
    const [id,setId]=useState(null);
    const [categoryType,SetCategoryType]=useState([]);

const catAPi=async ()=>{
    try{
     const result=await axios.get(`/category`)
     console.log(result.data.data)
     SetCatList(result.data.data)
     const newData=[] 
     result.data.data.map((ele,index)=>
     { 
       newData.push({...ele,sno:index+1})
      })
      setDataSource(newData);
    }catch(error){
        console.log(error)
    }

};
const catTypeApi=async (data)=>{
    try{
        const result=await axios.post(`/categorytype`,data)
        console.log(result)
        
        swal({
          text: "Added successfully...",
          icon:"success",
        });
        setValues(initialState)
        categoryReferenceAPi()
       }catch(error){
           console.log(error)
       }
};

const categoryReferenceAPi=async ()=>{
  try{
   const result=await axios.get(`/categorytype`)
   console.log(result.data.data)
   const newData=[] 
   result.data.data.map((ele,index)=>
   { 
     newData.push({...ele,sno:index+1})
    })
setDataSource(newData);
   
  }catch(error){
      console.log(error)
  }

};



const handleSubmit = (e) => {
    e.preventDefault();
    catTypeApi(values);

  };

useEffect(()=>{
catAPi()
categoryReferenceAPi()
},[])
const inputs=[
    {
        id: 1,
        type: "select",
        value: values.category || "",
        name: "category",
        label: "Category",
        options: catlist||[],
        col: 4,
        required: true,
    },
    {
        id: 2,
        type: "text",
        value: values.categorytype || "",
        name: "categorytype",
        label: "Reference No",
        col: 4,
        required: true,
    },
    {
        id: 3,
        type: "text",
        value: values.description || "",
        name: "description",
        label: "Description",
        col: 4,
        required: true,   
    }

]
const inputHandler = (e) => {
  const { name, value } = e.target;
  setValues({ ...values, [name]: value });
  
};

const selectHandler = (e) => {
  const { name, value } = e.target;
  setValues({ ...values, [name]: value });
  
};
const textHandler = (e) => {
  const { name, value } = e.target;
  setValues({ ...values, [name]: value });
  
};



const columns = [
  {
    title: "SNO",
    dataIndex: "sno",
    key: "sno",
  },
  {
    title: "Category Reference",
    dataIndex: "categorytype",
    key: "categorytype",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  // {
  //   dataIndex: "action",
  //   title: <>Action</>,
  //   render: (value, record) => {
  //     return (
  //       <>
  //         <button
  //           onClick={() => {
  //             setId(record.id)
  //             // form.setFieldsValue(record);
  //             console.log(record)
  //           }}
  //           className="btn btn-sm btn-success"
  //         >
  //           Edit
  //         </button>
  //       </>
  //     );
  //   },
  //   key: "action",
  // }
];

    return(
        <>
        <div class="categoryref m-2">
        <form onSubmit={handleSubmit}>
          <div class="row">
            {inputs.map((ele) => {
              return (
                <div class={`col-12 col-lg-${ele.col} `}>

          {ele.type === "select" && (
                    <div key={ele.id} className={` ${ele.classStyle}`}>
                      <label for={ele.label} className="mb-2">
                        {ele.label}
                        <span class="text-danger">*</span>
                      </label>
                      <select
                        onChange={selectHandler}
                        {...ele}
                        className="form-select"
                      >
                        <option value="">{`Select ${ele.label}`}</option>
                        {ele.options?.map((ele) => {
                          return (
                            <option value={ele.id} key={ele.id}>
                              {ele.categoryname}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}

                  {ele.type === "text" && (
                    <div key={ele.id}>
                      <label for={ele.label} className="mb-2">
                        {ele.label}
                        <span class="text-danger">*</span>
                      </label>
                      <input
                        placeholder={`Enter ${ele.label}`}
                        onChange={inputHandler}
                        {...ele}
                        className="form-control"
                      />
                    </div>
                  )}

                </div>
              );
            })}
            <div class="col-12 col-lg-4">
              <button type="submit" className="btn btn-primary mt-3 ms-2 ">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="m-2">
        <AppTable data={dataSource || []} columns={columns} />
      </div>
        </>
    )
}
