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
                {errors.gadgetName && <p>{errors.gadgetName}</p>}
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
                {errors.category && <p>{errors.category}</p>}
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
                {errors.manufacturer && <p>{errors.manufacturer}</p>}
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
                {errors.healthRating && <p>{errors.healthRating}</p>}
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
                {errors.techBrandName && <p>{errors.techBrandName}</p>}
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

                {errors.userRole && <p>{errors.userRole}</p>}
            </fieldset>

            <button type="submit">Register Gadget</button>
        </form>
    )
}
