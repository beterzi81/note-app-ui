import { useState } from "react"
import "./App.css"
import { eventNames } from "process"

type Note = {
  id: number
  title: string
  content: string
}



const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Note Title1",
      content: "Note Content1",
    },
    {
      id: 2,
      title: "Note Title2",
      content: "Note Content2",
    },
    {
      id: 3,
      title: "Note Title3",
      content: "Note Content3",
    },
    {
      id: 4,
      title: "Note Title4",
      content: "Note Content4",
    }
  ])

  const [title , setTitle] =useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const newNote: Note = {
      id: notes.length + 1,
      title,
      content
    }
    console.log(newNote.id)
    console.log(newNote.title)
    console.log(newNote.content)
    setNotes([newNote,...notes])
    setTitle("")
    setContent("")
  }
  return (
    <div className="app-container">
     <form className="note-form" onSubmit={(event)=> handleSubmit(event)}>
        <input required 
          placeholder="Title" 
          value={title} 
          onChange={(event) => setTitle(event.target.value)} />
        <textarea placeholder="Content" 
          rows={10} 
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        <button type="submit" >Add Note</button>
      </form>
      <div className="notes-grid">
      {notes.map((note) => (
        <div className="note-item">
          <div className="notes-header">
            <button>x</button>
          </div>
          <h3 className="note-title">{note.title}</h3>
          <p>{note.content}</p>
        </div>  
      ))}
        </div>
      
    </div>
  )
}

export default App