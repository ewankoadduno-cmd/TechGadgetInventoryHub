import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import GadgetForm from './components/GadgetForm'
import GadgetTable from './components/GadgetTable'


function App() {
  const [pageState, setpageState] = useState("gadget_form");

  if (pageState === "gadget_form") {
    return (
      <>
        <GadgetForm></GadgetForm>
      </>
    )
  }
  else if (pageState === "gadget_table") {
    return (
      <>
        <GadgetForm></GadgetForm>
      </>
    )
  }


  return (
    <>
      <div className='p bg-amber-800'>BRO</div>
    </>
  )
}

export default App
