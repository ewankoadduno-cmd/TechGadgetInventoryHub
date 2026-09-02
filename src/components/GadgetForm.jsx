import { useState } from 'react'

const initialFormData = {
    gadgetName: '',
    category: '',
    manufacturer: '',
    healthRating: '',
    techBrandName: '',
    userRole: '',
}

export default function GadgetForm({ canShowRegistry, onAddGadget, onShowTable }) {
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState({})

    function validateField(fieldName, fieldValue) {
        if (fieldName === 'gadgetName') {
            if (fieldValue.trim() === '') {
                return 'Gadget Name is required.'
            }

            if (fieldValue.trim().length < 3) {
                return 'Gadget Name must contain at least 3 characters.'
            }
        }

        if (fieldName === 'healthRating') {
            const rating = Number(fieldValue)

            if (fieldValue === '') {
                return 'Health Rating is required.'
            }

            if (Number.isInteger(rating) === false) {
                return 'Health Rating must be a whole number.'
            }

            if (rating < 1 || rating > 100) {
                return 'Health Rating must be between 1 and 100.'
            }
        }

        if (fieldName === 'category' && fieldValue === '') {
            return 'Category is required.'
        }

        if (fieldName === 'manufacturer' && fieldValue.trim() === '') {
            return 'Manufacturer is required.'
        }

        if (fieldName === 'techBrandName' && fieldValue.trim() === '') {
            return 'Tech Brand Name is required.'
        }

        if (fieldName === 'userRole' && fieldValue === '') {
            return 'User Role is required.'
        }

        return ''
    }

    function validateForm() {
        const newErrors = {
            gadgetName: validateField('gadgetName', formData.gadgetName),
            category: validateField('category', formData.category),
            manufacturer: validateField('manufacturer', formData.manufacturer),
            healthRating: validateField('healthRating', formData.healthRating),
            techBrandName: validateField('techBrandName', formData.techBrandName),
            userRole: validateField('userRole', formData.userRole),
        }

        setErrors(newErrors)

        return Object.values(newErrors).every(function checkError(errorMessage) {
            return errorMessage === ''
        })
    }

    function handleChange(event) {
        const fieldName = event.target.name
        const fieldValue = event.target.value

        setFormData({
            ...formData,
            [fieldName]: fieldValue,
        })

        setErrors({
            ...errors,
            [fieldName]: validateField(fieldName, fieldValue),
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        const formIsValid = validateForm()

        if (formIsValid === false) {
            return
        }

        const newGadget = {
            ...formData,
            healthRating: Number(formData.healthRating),
        }

        onAddGadget(newGadget)
        setFormData(initialFormData)
        setErrors({})
    }

    return (
        <form
            className="mt-6 grid gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-lg sm:grid-cols-2"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="flex flex-col gap-1">
                <label className="font-medium text-zinc-200" htmlFor="gadgetName">Gadget Name</label>
                <input
                    className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    id="gadgetName"
                    name="gadgetName"
                    type="text"
                    value={formData.gadgetName}
                    onChange={handleChange}
                />
                {errors.gadgetName && <p className="text-sm text-red-400">{errors.gadgetName}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-medium text-zinc-200" htmlFor="category">Category</label>
                <select
                    className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
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
                {errors.category && <p className="text-sm text-red-400">{errors.category}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-medium text-zinc-200" htmlFor="manufacturer">Manufacturer</label>
                <input
                    className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    id="manufacturer"
                    name="manufacturer"
                    type="text"
                    value={formData.manufacturer}
                    onChange={handleChange}
                />
                {errors.manufacturer && <p className="text-sm text-red-400">{errors.manufacturer}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-medium text-zinc-200" htmlFor="healthRating">Health Rating</label>
                <input
                    className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    id="healthRating"
                    name="healthRating"
                    type="number"
                    min="1"
                    max="100"
                    step="1"
                    value={formData.healthRating}
                    onChange={handleChange}
                />
                {errors.healthRating && <p className="text-sm text-red-400">{errors.healthRating}</p>}
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="font-medium text-zinc-200" htmlFor="techBrandName">Tech Brand Name</label>
                <input
                    className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    id="techBrandName"
                    name="techBrandName"
                    type="text"
                    value={formData.techBrandName}
                    onChange={handleChange}
                />
                {errors.techBrandName && <p className="text-sm text-red-400">{errors.techBrandName}</p>}
            </div>

            <fieldset className="sm:col-span-2">
                <legend className="font-medium text-zinc-200">User Role</legend>

                <div className="mt-2 flex gap-6">
                <label className="flex items-center gap-2" htmlFor="engineer">
                    <input
                        id="engineer"
                        name="userRole"
                        type="radio"
                        className="accent-cyan-400"
                        value="Engineer"
                        checked={formData.userRole === 'Engineer'}
                        onChange={handleChange}
                    />
                    Engineer
                </label>

                <label className="flex items-center gap-2" htmlFor="tester">
                    <input
                        id="tester"
                        name="userRole"
                        type="radio"
                        className="accent-cyan-400"
                        value="Tester"
                        checked={formData.userRole === 'Tester'}
                        onChange={handleChange}
                    />
                    Tester
                </label>
                </div>

                {errors.userRole && <p className="mt-1 text-sm text-red-400">{errors.userRole}</p>}
            </fieldset>

            <div className="flex gap-3 sm:col-span-2">
                {canShowRegistry && (
                    <button
                        className="rounded border border-zinc-700 px-4 py-2 font-medium text-zinc-200 hover:border-cyan-400 hover:text-cyan-300"
                        type="button"
                        onClick={onShowTable}
                    >
                        Back to Registry
                    </button>
                )}

                <button
                    className="flex-1 rounded bg-cyan-400 px-4 py-2 font-medium text-zinc-950 hover:bg-cyan-300"
                    type="submit"
                >
                    Register Gadget
                </button>
            </div>
        </form>
    )
}
