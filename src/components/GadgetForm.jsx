import { useState } from 'react'

const initialFormData = {
    gadgetName: '',
    category: '',
    manufacturer: '',
    healthRating: '',
    techBrandName: '',
    userRole: '',
}

export default function GadgetForm({ onAddGadget }) {
    const [formData, setFormData] = useState(initialFormData)

    function handleChange(event) {
        const fieldName = event.target.name
        const fieldValue = event.target.value

        setFormData({
            ...formData,
            [fieldName]: fieldValue,
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        const newGadget = {
            ...formData,
            healthRating: Number(formData.healthRating),
        }

        onAddGadget(newGadget)
        setFormData(initialFormData)
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div>
                <label htmlFor="gadgetName">Gadget Name</label>
                <input
                    id="gadgetName"
                    name="gadgetName"
                    type="text"
                    value={formData.gadgetName}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Select a category</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Wearable">Wearable</option>
                    <option value="Audio">Audio</option>
                </select>
            </div>

            <div>
                <label htmlFor="manufacturer">Manufacturer</label>
                <input
                    id="manufacturer"
                    name="manufacturer"
                    type="text"
                    value={formData.manufacturer}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="healthRating">Health Rating</label>
                <input
                    id="healthRating"
                    name="healthRating"
                    type="number"
                    min="1"
                    max="100"
                    step="1"
                    value={formData.healthRating}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="techBrandName">Tech Brand Name</label>
                <input
                    id="techBrandName"
                    name="techBrandName"
                    type="text"
                    value={formData.techBrandName}
                    onChange={handleChange}
                />
            </div>

            <fieldset>
                <legend>User Role</legend>

                <label htmlFor="engineer">
                    <input
                        id="engineer"
                        name="userRole"
                        type="radio"
                        value="Engineer"
                        checked={formData.userRole === 'Engineer'}
                        onChange={handleChange}
                    />
                    Engineer
                </label>

                <label htmlFor="tester">
                    <input
                        id="tester"
                        name="userRole"
                        type="radio"
                        value="Tester"
                        checked={formData.userRole === 'Tester'}
                        onChange={handleChange}
                    />
                    Tester
                </label>
            </fieldset>

            <button type="submit">Register Gadget</button>
        </form>
    )
}
