export default function GadgetTable({ gadgets, onShowForm }) {
  return (
    <main>
      <h1>Gadget Registry</h1>
      <p>Submitted gadgets: {gadgets.length}</p>
      <button type="button" onClick={onShowForm}>
        Add Another Gadget
      </button>
    </main>
  )
}
