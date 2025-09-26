import { useEffect, useState, useTransition } from 'react'
import "./App.css"
import { Editor } from '@monaco-editor/react'
import Button from './Button'
import PopUp from './PopUp'

const API = `https://voltsec-main.onrender.com`
function App() {
  const password = "prashant" 
  const [transition, startTransition] = useTransition()
  const [data, setData] = useState({
    name: "",
    code: "",
    collection: "web"
  })
  const [pop, setPop] = useState(true);
  const [passIn, setPassIn] = useState("")

  function checkPass() {
    if (passIn === password) {
      setPop(false)
      localStorage.setItem("auth", "true")
    }
  }

  useEffect(() => {
    const auth = localStorage.getItem("auth")
    if (auth === "true") {
      setPop(false)
    }
  }, [])
 function handleClick() {
    if (data.name === "" || data.code === "") {
      alert("Please fill all the fields")
      return
    }

    startTransition(async () => {
      const res = await fetch(`${API}/db/modules/insert/modules_db`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          code: data.code,
          collection: data.collection,
          file_type: "yaml"
        })
      })
      if (res.status === 200) {
        alert("Success, Added")
        setData({
          name: "",
          code: "",
          collection: "web"
        })
      }
    })
  }
  
  return (
    <div>
      {
        pop && 
      <PopUp
      input={passIn}
      setInput={setPassIn}
      onPress={checkPass}
      />
      }
      <div className="upper">
        <h1 className='heading'>Voltsec.io</h1>
        <input type="text" placeholder='Enter file name' className='name-input' value={data.name} onChange={(e) => setData(prev => ({...prev, name: e.target.value}))} />
        <select className="name-input" value={data.collection} onChange={(e) => setData(prev => ({...prev, collection: e.target.value}))}>
          <option value="web">WEB</option>
          <option value="network">NETWORK</option>
          <option value="api">API</option>
          <option value="cloud">CLOUD</option>
        </select>
      <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
        {
          transition ? (
            <p className='text'>Uploading...</p>
          ) : (
            <Button 
            onPress={handleClick}
            />
          )
        }
        <p style={{color: "orangered", fontFamily: "monospace", cursor: "pointer"}} onClick={() => {localStorage.removeItem("auth"); setPop(true);}}>Revoke Pass</p>
        </div>

      </div>
      <div className="editor-container">
      <Editor 
      height={"100%"}
      defaultLanguage='yaml'
      defaultValue='// some comment'
      value={data.code}
      onChange={(e: any) => setData(prev => ({...prev, code: e}))}
      theme='vs-dark'
      options={{
          minimap: {enabled: false}
        }}

      loading={<div>Loading...</div>}
      />
      </div>
    </div>
  )
}

export default App