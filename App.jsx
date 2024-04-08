
import { useState, useCallback, useEffect, useRef } from 'react'
// import './App.css'

function App() {
  const [length, setLength]=useState(8)
  const [numberAllowed, setNumberAllowed]=useState(false)
  const [charAllowed, setcharAllowed]=useState(false)
  const [password, setPassword]=useState("")

  //useRef hook
  const passwordReference = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*"

    for(let i=1; i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  },[length, numberAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordReference.current?.select()
    window.navigator.clipboard.writeText(password)

  },[password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-6 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-7">
          <input 
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordReference}
            />
            <button 
            onClick={copyPasswordToClipBoard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer '
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{
              setNumberAllowed((prev) => !prev)
            }}
             />
             <label htmlFor="numberInput">Numbers</label>
             <div className='flex items-center gap-x-1'>
             <input 
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={()=>{
                setcharAllowed((prev) => !prev)
              }}
             />
             <label htmlFor="charInput">Characters</label>
             </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App