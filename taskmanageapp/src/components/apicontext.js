import { useState, createContext,useContext } from "react";
import ReactDOM from "react-dom/client";
import UserActivity from "./usertask";

const UserTaskContext = createContext()


export default function Usertaskapi() {
    return (
      <UserTaskContext.Provider >
        <UserActivity value={record_count}/>
        
      </UserTaskContext.Provider>
    );
  }
