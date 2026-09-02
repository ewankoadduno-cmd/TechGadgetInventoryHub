import { useEffect, useState } from 'react'
import GadgetForm from './components/GadgetForm'
import GadgetTable from './components/GadgetTable'

function App() {
  const [gadgets, setGadgets] = useState([])
  const [pageState, setPageState] = useState('gadget_form')
  const [selectedGadgetIndex, setSelectedGadgetIndex] = useState(null)
  const [activeGadget, setActiveGadget] = useState(null)

  useEffect(function synchronizeActiveGadget() {
    if (selectedGadgetIndex === null) {
      return
    }

    // The exam requires useEffect to synchronize the selected gadget.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveGadget(gadgets[selectedGadgetIndex])
  }, [selectedGadgetIndex, gadgets])

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

  function handleShowTable() {
    setPageState('gadget_table')
  }

  function handleSelectGadget(gadgetIndex) {
    setSelectedGadgetIndex(gadgetIndex)
  }

  if (pageState === 'gadget_form') {
    return (
      <div className="min-h-screen bg-slate-900 px-4 py-8 text-zinc-100">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-white">
            Tech Gadget Inventory Hub
          </h1>
          <p className="mt-2 text-zinc-400">
            Register a gadget to add it to the inventory.
          </p>
          <GadgetForm
            canShowRegistry={gadgets.length > 0}
            onAddGadget={handleAddGadget}
            onShowTable={handleShowTable}
          />
        </div>
      </div>
    )
  }

  if (pageState === 'gadget_table') {
    return (
      <GadgetTable
        activeGadget={activeGadget}
        gadgets={gadgets}
        onSelectGadget={handleSelectGadget}
        onShowForm={handleShowForm}
        selectedGadgetIndex={selectedGadgetIndex}
      />
    )
  }

  return null
}

export default App
