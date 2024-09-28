import React from "react";
import { useState, useEffect } from "react";

const List = () => {
    const [task, setTask] = useState("");
    const [newTask, setNewTask] = useState([]);
    
// Creación del usuario
    fetch('https://playground.4geeks.com/todo/users/mvs.', {
        method: 'POST',
        headers: {
          'Content-Type': 'aplication/json'
        },
        body: JSON.stringify({
          username: 'mvs.'
        })
      
      })
      .then(response => {
        if (!response.ok) 
          {throw new Error (`HTTP error! status: ${response.status}`);
          }
        return response.json();
      })
      .then(data => { console.log('User created:', data);
      })
      .catch(error => console.error(error));

// Envío al API de item del TodoList
    const Submit = async (e) => { 
      if (e.key === "Enter") {
        if (task.trim()) {
          setNewTask([...newTask, task]);
          setTask('');

          try {
            const syncTodoList = await fetch('https://playground.4geeks.com/todo/todos/mvs.', {
              method: 'POST',
              body: JSON.stringify({ "label": task }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
            if (!syncTodoList.ok) {throw new Error (`Error to save todo`);
          }
          console.log('todo save');
          } catch (error) {
            console.error('Error:', error)
          }
      }
    }
    };
    
 // Sincronización del TodoList con la API de backend   
 /* const syncTodoList = async () =>{
      const responseList = await fetch('https://playground.4geeks.com/todo/todos/mvs', { 
        method: 'POST',
        body: JSON.stringify(Submit),
        headers: {
          'Content-Type': 'application/json'
        }

    });
    if (responseList.ok) {
      const dataList = await responseList.json();
      return dataList;
    } else {
      console.log('error: ', responseList.status, responseList.statusText);
      return {error: {status: responseList.status, statusText: response.statusText}};      
    };
    };*/
  

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

      // Ejemplo de creación del usuario hecho en clase 

            /* useEffect(() => {
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
              */