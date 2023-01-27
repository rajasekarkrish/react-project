import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Register from "./components/register";
import Login from "./components/login";
import Logout from "./components/logout";
import Manageuser from "./components/manageuser";
import Header from "./components/header";
import Activity from "./components/Activity/Activity";
import Tasklogin from "./components/tasklogin";
import Signup from "./components/signup";
import Company from "./components/company";
import Department from "./components/department";
import User from "./components/user";
import Dashboard from "./components/dashboard";
import Category from "./components/category";
import Categorytype from "./components/categorytype";
import UserAssign from "./components/userassign";
import Usertask from "./components/usertask"
import Userform from "./components/userform";
import Customtabs from "./components/customtabs"
import TabComponent from "./components/tabcomponent";
import Dept from "./components/dept";

function App() {
  const token = sessionStorage.getItem("access_token") || false;
  const initialState={
    
    token
  }
  return (
    <Router>

        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to={"/"} /> : <Tasklogin />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to={"/"} /> : <Signup />}
          />
          <Route path="/" element={<Header />}>
            <Route
              path="/"
              index
              element={!token ? <Navigate to={"/login"} /> : <Usertask />}
            />

            <Route path="logout" element={<Logout />} />
            <Route path="manageuser" element={<Manageuser />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="category" element={<Category />} />
            <Route path="usertask" element={<Usertask />} />
            <Route path="userform" element={<Userform />} />
            <Route path="tabs" element={<Customtabs />} />
            <Route path="multitabs" element={<TabComponent />} />
            <Route path="dept" element={<Dept/>}/>

          </Route>
          
          <Route path="*" element={<h4>Page not found 404!</h4>} />
          <Route path="/categorytype" element={<Categorytype/>} />
          <Route path="/userassign" element={<UserAssign/>} />
          

        </Routes>
    </Router>
  );
}
export default App;
