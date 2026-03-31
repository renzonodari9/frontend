import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  // 🔐 LOGIN
  const login = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "renzonodari9@gmail.com",
        password: "123456"
      })
    });

    const data = await res.json();
    console.log("LOGIN:", data);

    localStorage.setItem("token", data.token);
    alert("Login OK");
  };

  // 📥 OBTENER NOTAS
  const getNotes = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/notes", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log("NOTAS:", data);

    setNotes(data);
  };

  // ➕ CREAR NOTA
  const createNote = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: "Nota desde React",
        content: "Full stack funcionando 🔥"
      })
    });

    const data = await res.json();
    console.log("CREADA:", data);

    // 🔄 volver a traer notas
    getNotes();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notas App 🚀</h1>

      <button onClick={login}>Login</button>
      <button onClick={getNotes}>Ver Notas</button>
      <button onClick={createNote}>Crear Nota</button>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <strong>{note.title}</strong> - {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
