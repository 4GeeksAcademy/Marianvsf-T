import React from "react";
import { useState, useEffect } from "react";

const List = () => {
    const [task, setTask] = useState("");
    const [newTask, setNewTask] = useState([]);

    const Submit = (e) => { 
      if (e.key === "Enter") {
        if (task.trim()) {
          setNewTask([...newTask, task]);
          setTask('');
      }
      }
    };

    useEffect(() => {
      initializaList()
    }, [])

    async function initializaList() {
      let resp = await fetch("https://playground.4geeks.com/todo/users/marianvsf")
      if (resp.status == 404) {
        let respCreate = await fetch("https://playground.4geeks.com/todo/users/marianvsf",{        
          method: "POST", 
          headers: {
            "Content-Type":"aplication/json",
          }
      });
      }
    
      if (resp.ok) {
        console.log("Usuario creado")
        resp = await fetch("https://playground.4geeks.com/todo/users/marianvsf")
      }

    }

    
    

    const deleteItem = (index) => {
      setNewTask(newTask.filter((_, i) => i !== index));

    };

      return (
          <div style={{width: "500px", margin:"auto"}}>
            <ul className="list-group ">
             <input type="text" value={task} 
              onKeyDown={Submit} 
              onChange={(e) => setTask(e.target.value)} placeholder={task== "" ? "What needs to be done?" : task } />
              {newTask.map((item, index) => (  
            <li className="list list-group-item list-group-item-light text-start" key={index} 
            style={{ display: 'flex', justifyContent: 'space-between' }}>{item}
            <button className="btn btn-sm delete-button"
            onClick={() => deleteItem(index)}>x</button></li>
              ))}
            <li className="count list-group-item text-start"
            style={{color: "gray"}}>{newTask.length} items left</li>
            </ul>
          </div>
        );
  };


export default List;