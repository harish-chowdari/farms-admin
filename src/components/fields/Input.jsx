import React, { useState } from 'react'

export default function Input({ 
    label, 
    name, 
    type = 'text', 
    placeholder, 
    isErrorRequired = true,
    tailwindClasses = 'p-lg', 
    formik 
}) {
    const [isFocused, setIsFocused] = useState(false)

    const showError = formik.touched[name] && formik.errors[name]
    const borderClass = showError
        ? 'border-red-500'
        : isFocused
            ? 'border-blue-500'
            : 'border-gray-300'

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={(e) => {
                    formik.handleBlur(e)
                    setIsFocused(false)
                }}
                onFocus={() => setIsFocused(true)}
                className={`w-full px-3 py-2 border rounded-md outline-none ${tailwindClasses} ${borderClass}`}
                autoComplete="off"
            />
            {isErrorRequired && (
                <div className="min-h-[1.25rem] mt-1">
                    {showError && (
                        <p className="text-sm text-red-600">
                            {formik.errors[name]}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
