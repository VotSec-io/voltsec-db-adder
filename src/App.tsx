import { useState, useTransition } from 'react'
import "./App.css"
import { Editor } from '@monaco-editor/react'
import Button from './Button'

const API = `https://voltsec-main.onrender.com`
function App() {
  const [transition, startTransition] = useTransition()
  const [data, setData] = useState({
    name: "",
    code: "",
    collection: "web"
  })

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
      }
    })
  }
  
  return (
    <div>
      <div className="upper">
        <h1 className='heading'>Voltsec.io</h1>
        <input type="text" placeholder='Enter file name' className='name-input' value={data.name} onChange={(e) => setData(prev => ({...prev, name: e.target.value}))} />
        <select className="name-input" value={data.collection} onChange={(e) => setData(prev => ({...prev, collection: e.target.value}))}>
          <option value="web">WEB</option>
          <option value="network">NETWORK</option>
          <option value="api">API</option>
          <option value="cloud">CLOUD</option>
        </select>
        {
          transition ? (
            <p className='text'>Uploading...</p>
          ) : (
        <Button 
        onPress={handleClick}
        />
          )
        }

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