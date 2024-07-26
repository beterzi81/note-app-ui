import { useEffect, useState } from "react"
import "./App.css"

type Note = {
  id: number
  title: string
  content: string
}

const apiURL = process.env.REACT_APP_API_URL


const App = () => {
  const [notes, setNotes] = useState<Note[]>([])

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/notes`)
        const notes: Note[] = await response.json()
        setNotes(notes)
      } catch (error) {

      }
    }
    fetchNotes()
  }, [])

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault()

    try {

      const response = await fetch(`http://localhost:5000/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content
        })
      })

      const newNote: Note = await response.json()

      setNotes([newNote, ...notes])
      setTitle("")
      setContent("")
    } catch (error) {
      
    }
    // const newNote: Note = {
    //   id: notes.length + 1,
    //   title,
    //   content
    // }
    // console.log(newNote.id)
    // console.log(newNote.title)
    // console.log(newNote.content)
    
  }

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selectedNote) {
      return
    }
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${selectedNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content
        })
      })

      const updatedNote: Note = await response.json()

      const updatedNotesList = notes.map((note) => note.id === selectedNote.id ? updatedNote : note)
      setNotes(updatedNotesList)
      setTitle("")
      setContent("")
      setSelectedNote(null)
    } catch (error) {
      
    }
    // const updatedNote: Note = {
    //   id: selectedNote.id,
    //   title: title,
    //   content: content
    // }
    
  }

  const handleCancel = () => {
    setTitle("")
    setContent("")
    setSelectedNote(null)
  }

  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation()
    try {
      const response = fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: "DELETE",
      })
      
    } catch (error) {
      
    }
    const updatedNotesList = notes.filter((note) => note.id !== noteId)
    setNotes(updatedNotesList)
  }


  return (
    <div className="app-container">
      <form className="note-form" onSubmit={(event) => selectedNote ? handleUpdateNote(event) : handleAddNote(event)}>
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
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="submit" >Add Note</button>
        )}

      </form>
      <div className="notes-grid" >
        {notes.map((note) => (
          <div className="note-item" key={note.id} onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note.id)}>x</button>
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