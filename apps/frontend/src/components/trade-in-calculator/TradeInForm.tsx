import React from "react";
import { TradeInField, ComputerFormData } from "@/types/trade-in";

interface TradeInFormProps {
  fields: TradeInField[];
  formData: ComputerFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const TradeInForm: React.FC<TradeInFormProps> = ({
  fields,
  formData,
  onChange,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
    {fields.map((field) => (
      <div className="relative mb-3" key={field.name}>
        <label
          htmlFor={field.name}
          className="block text-gray-700 text-sm font-medium mb-1"
        >
          {field.label}
        </label>
        {field.type === "select" ? (
          <select
            id={field.name}
            name={field.name}
            required={field.required}
            value={formData[field.name as keyof ComputerFormData]}
            onChange={onChange}
            className="form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="" disabled>
              {field.placeholder || `Select ${field.label}`}
            </option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            required={field.required}
            value={formData[field.name as keyof ComputerFormData]}
            onChange={onChange}
            className="form-input block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder={field.placeholder}
            accept={field.accept}
          />
        )}
        {field.helperText && (
          <span className="text-xs text-gray-500">{field.helperText}</span>
        )}
      </div>
    ))}
  </div>
);

export default TradeInForm;
