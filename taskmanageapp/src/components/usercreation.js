const inputs = [
    {
      id: 1,
      type: "email",
      value: values.email || "",
      name: "email",
      label: "Email",
      col: 6,
      required: true,
    },

    {
      id: 2,
      type: "text",
      value: values.user_name || "",
      name: "user_name",
      label: "User Name",
      col: 6,
      required: true,
    },

    {
      id: 3,
      type: "password",
      value: values.password || "",
      name: "password",
      label: "Password",
      col: 6,
      required: true,
      classStyle: "mt-2",
    },
    {
      id: 4,
      type: "password",
      value: values.password || "",
      name: "password",
      label: "Confirm Password",
      col: 6,
      required: true,
      classStyle: "mt-2",
    },
    {
        id: 5,
        type: "select",
        value: values.company || "",
        name: "company",
        label: "Company",
        options: companyList,
        col: 6,
        required: true,
        classStyle: "mt-2",
      },


    {
        id: 6,
        type: "select",
        value: values.department || "",
        name: "department",
        label: "Department",
        options: departmentList,
        col: 6,
        required: true,
        classStyle: "mt-2",
      },
      {
        id: 7,
        type: "select",
        value: values.assign_to || "",
        name: "assign_to",
        label: "Reporting_to",
        options: departmentList||[],
        col: 6,
        required: true,
        classStyle: "mt-2",
      },
      {
        id: 8,
        type: "checkbox",
        value: values.is_active || "",
        name: "is_active",
        label: "is_active",
        col: 6,
        required: true,
        classStyle: "mt-2",
      },
      {
        id: 8,
        type: "checkbox",
        value: values.is_staff || "",
        name: "is_staff",
        label: "is_staff",
        col: 6,
        required: true,
        classStyle: "mt-2",
      },

  ];
  const UserCreation=()=>{
    const SignUpApi = async (data) => {
        try {
          const result = await axios.post("/user/register/", data);
          console.log(result);
          if (result.status === 201) {
            setStatus("user created successfully");
            swal({
              text: "user created successfully...",
            });
            userApi();
            form.resetFields()
          }
        } catch (error) {
          console.log(error);
          setErrorData("user already exist");
          swal({
            text: "user already exist...",
            icon:"warning",
            dangerMode:true,
          });
         
        }
      };
  }
 
 