import React from "react";
import { useState, useEffect } from "react";

const List = () => {
    const [task, setTask] = useState("");
    const [newTask, setNewTask] = useState([]);
    
// Creación del usuario

    useEffect(() => {
       initializaList()
    }, [])
        
    async function initializaList() {
        let resp = await fetch("https://playground.4geeks.com/todo/users/mvs.")
            if (resp.status === 404) {
                await fetch("https://playground.4geeks.com/todo/users/mvs.",{        
                method: "POST", 
                headers: {
                 "Content-Type":"aplication/json",
                }
                });
                return initializaList();
            }
            if (resp.ok) {
              let data = await resp.json();
              setNewTask(data.todos);
              console.log("Usuario creado")
            }
            }
             
// Envío al API de item del TodoList
    const SubmitList = async (e) => { 
     
      if (e.key === "Enter") {
        if (task.trim()) {
          

          try {
            const resp = await fetch('https://playground.4geeks.com/todo/todos/mvs.', {
              method: 'POST',
              body: JSON.stringify({ "label": task }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
            if (resp.ok) {
              const data = await resp.json();
              console.log(data)
              setNewTask([...newTask, data]);
              setTask("");
          } else {
              console.error("Error al agregar el item:", resp.statusText);
            } 
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
        body: JSON.stringify(SubmitList),
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



    const deleteItem = async (id) => {
     let resp = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',}
    })
        if (resp.ok) {
        setNewTask(newTask.filter(item => item.id !== id));
        console.log("tarea eliminada", id);
        }
        }

      const deleteAll = async () => {
        let resp = await fetch (`https://playground.4geeks.com/todo/users/mvs.`,{
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        }
        )
        if (resp.ok) {
          setNewTask([])
      }}

      return (
          <div style={{width: "500px", margin:"auto"}}>
            <ul className="list-group ">
             <input type="text" value={task} 
              onKeyDown={SubmitList} 
              onChange={(e) => setTask(e.target.value)} placeholder={task== "" ? "What needs to be done?" : task } />
              {newTask.map((item, index) => (  
            <li className="list list-group-item list-group-item-light text-start" key={item.id} 
            style={{ display: 'flex', justifyContent: 'space-between' }}>{item.label}
            <button className="btn btn-sm delete-button"
            onClick={() => deleteItem(item.id)}>x</button></li>
              ))}
            <li className="count list-group-item text-start"
            style={{color: "gray"}}>{newTask.length} items left</li>
            </ul>
            <button type="button" className="btn btn-danger m-5" onClick={deleteAll}>Delete all the todos</button>
          </div>
        );
      };
      
      export default List;