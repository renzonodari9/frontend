import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  const API = "https://notas-backend-f5ox.onrender.com";

  // 🔐 REGISTER
  const register = async () => {
    const res = await fetch(`${API}/api/auth/register`, {
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
    console.log("REGISTER:", data);
    alert("Usuario creado");
  };

  // 🔐 LOGIN
  const login = async () => {
    const res = await fetch(`${API}/api/auth/login`, {
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

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login OK");
    } else {
      alert(data.msg);
    }
  };

  // 📥 OBTENER NOTAS
  const getNotes = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/api/notes`, {
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

    const res = await fetch(`${API}/api/notes`, {
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

    getNotes();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notas App 🚀</h1>

      <button onClick={register}>Register</button>
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
