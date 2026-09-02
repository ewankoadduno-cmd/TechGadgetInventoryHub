import { useState } from 'react'
import GadgetForm from './components/GadgetForm'
import GadgetTable from './components/GadgetTable'

function App() {
  const [gadgets, setGadgets] = useState([])
  const [pageState, setPageState] = useState('gadget_form')

  function handleAddGadget(newGadget) {
    setGadgets([
      ...gadgets,
      newGadget,
    ])

    setPageState('gadget_table')
  }

  function handleShowForm() {
    setPageState('gadget_form')
  }

  if (pageState === 'gadget_form') {
    return (
      <div>
        <h1>Tech Gadget Inventory Hub</h1>
        <p>Registered gadgets: {gadgets.length}</p>
        <GadgetForm onAddGadget={handleAddGadget} />
      </div>
    )
  }

  if (pageState === 'gadget_table') {
    return (
      <GadgetTable
        gadgets={gadgets}
        onShowForm={handleShowForm}
      />
    )
  }

  return null
}

export default App
