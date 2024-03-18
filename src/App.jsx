import { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import edit from "./assets/edit.svg"
import del from "./assets/trash-2.svg"
import pen from "./assets/pen.svg"
import clip from "./assets/paperclip.svg"
import all from "./assets/layers.svg"
import marker from "./assets/marker.svg"
import finished from "./assets/check-square.svg"
import notFinish from "./assets/checkbox-intermediate.svg"

function App() {
  // main variables
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [divLeft, setDivLeft] = useState(138)

  // function to load for first render
  useEffect(() => {
    let isToDo = localStorage.getItem("todos")
    if (isToDo) {
      let Todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(Todos)
    }
  }, [])

  // function for addTodo button
  const createTodo = () => {
    let newTodos = [...JSON.parse(localStorage.getItem("todos")), { todo, isCompleted: false, id: uuidv4() }]
    setTodos(newTodos)
    setTodo("")
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  // function for input change
  const handleChange = (e) => {
    setTodo(e.target.value)
    // for Enter on input
    if (e.code === 'Enter') {
      let newTodos = [...JSON.parse(localStorage.getItem("todos")), { todo, isCompleted: false, id: uuidv4() }]
      setTodos(newTodos)
      setTodo("")
      localStorage.setItem("todos", JSON.stringify(newTodos))
    }
  }

  // function for delete button
  const handleDelete = (e) => {
    let newTodos = JSON.parse(localStorage.getItem("todos"))

    let todoIndex = newTodos.findIndex((todo) => {
      return todo.id === e.target.id
    })
    newTodos = newTodos.filter((todo) => {
      return todo != newTodos[todoIndex]
    })
    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))

  }

  // function for edit button
  const handleEdit = (e) => {
    let todoIndex = todos.findIndex((todo) => {
      return todo.id === e.target.id
    })
    setTodo(todos[todoIndex].todo)
    const newTodos = todos.filter((todo) => {
      return todo != todos[todoIndex]
    })
    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }
  // function for checkBox button
  const checkBox = (e) => {
    const newTodos = JSON.parse(localStorage.getItem("todos"))
    let todoIndex = newTodos.findIndex((todo) => {
      return todo.id === e.target.id
    })
    newTodos[todoIndex].isCompleted = !newTodos[todoIndex].isCompleted
    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  // function for complete button
  const handleCompleted = () => {
    if (window.innerWidth > 550) {
      setDivLeft(-17)
    } else {
      setDivLeft(-23)
    }
    let Todos = JSON.parse(localStorage.getItem("todos"))

    const compTodos = Todos.filter((todo) => {
      return todo.isCompleted === true
    })
    setTodos(compTodos)
  }

  // function for notCompleted button
  const handleNotCompleted = () => {
    if (window.innerWidth > 550) {
      setDivLeft(15)
    } else {
      setDivLeft(23)
    }
    let Todos = JSON.parse(localStorage.getItem("todos"))

    const compTodos = Todos.filter((todo) => {
      return todo.isCompleted != true
    })
    setTodos(compTodos)
  }
  return (
    <>
      {/* container */}
      <div className='flex justify-center items-center h-screen bg-[#444327]'>

        {/* main */}
        <div className='wrapper bg-[#292c11] w-[95vw] h-[95vh] sm:w-[80vw] sm:h-[80vh] rounded-md p-3 flex justify-start items-center flex-col gap-3 shadow-2xl'>
          <div className={`w-[10vw] h-0.5 relative top-[248px] left-[${divLeft}vw] bg-white transition-all`}></div>

          {/* Navbar */}
          <nav className='flex justify-center items-center flex-col '>
            <div className="logo text-white font-bold"><img className='invert w-24' src={pen} alt="" /></div>
            <div className="heading text-white font-bold text-3xl">Your Own Guide</div>
          </nav>

          {/* Input Section */}
          <div className='flex text-white w-full justify-center items-center gap-1'>
            <img className='invert w-6' src={clip} alt="" />
            <input onKeyDown={handleChange} onChange={handleChange} value={todo} className='placeholder:text-white rounded-md text-sm bg-[#ffffff78] text-white outline-none w-[50%] p-[0.7rem]' type="text" placeholder='What ToDo?' />
            <button className='bg-[#70782e] text-white p-[0.7rem] text-sm rounded-md disabled:bg-slate-400' disabled={todo.length <= 3} onClick={createTodo}><img className='invert w-5' src={marker} alt="" /></button>
          </div>

          {/* Todos Section */}
          <div className='Todos text-white overflow-y-scroll min-w-[44vw] '>
            {/* todoNav */}
            <div className='flex gap-[10vw] justify-center sticky top-0 z-10 bg-[#4c521f] p-1 transition-all'>
              {/* complete button */}
              <div onClick={handleCompleted} className='flex gap-1 cursor-pointer items-center'>
                <img className='invert w-5 sm:w-6' src={finished} alt="finished-icon" />
                <h1 className='text-sm'>Finished</h1>
              </div>

              {/* all button */}
              <div onClick={() => { setTodos(JSON.parse(localStorage.getItem("todos"))); setDivLeft(-1) }} className='flex gap-1 cursor-pointer items-center'>
                <img className='invert w-6 sm:w-7' src={all} alt="finished-icon" />
                <h1 className='text-sm'>All</h1>
              </div>

              {/* notCompeted button */}
              <div onClick={handleNotCompleted} className='flex gap-1 cursor-pointer items-center'>
                <img className='invert w-5 sm:w-6 ' src={notFinish} alt="finished-icon" />
                <h1 className='text-sm'>Not Finished</h1>
              </div>
            </div>
            {/* todos */}
            {todos.map((todo) => {
              return <div key={todo.id} className="todo flex p-4 gap-2 text-sm justify-center items-center">
                <input onChange={checkBox} checked={todo.isCompleted} type="checkbox" id={todo.id} />
                <h1 className={`min-w-[53vw] text-center text-xl overflow-x-scroll max-w-[45vw] text-nowrap ${todo.isCompleted ? "line-through" : ""}`}>{todo.todo}</h1>
                < div className='flex flex-col gap-1'>
                  <img id={todo.id} onClick={handleEdit} className='invert w-6 cursor-pointer' src={edit} alt="edit-icon" />
                  <img id={todo.id} onClick={handleDelete} className='invert w-6 cursor-pointer' src={del} alt="delete-icon" />
                </div>
              </div>
            })}

          </div>
        </div>
      </div >
    </>
  )
}

export default App
