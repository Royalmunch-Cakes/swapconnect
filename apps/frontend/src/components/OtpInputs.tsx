// components/OtpInputs.tsx (Example of a custom OTP component)
"use client";

import React, {
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
} from "react";
import {
  useController,
  UseControllerProps,
  FieldValues,
  // FieldName,
} from "react-hook-form";

interface OtpInputsProps<TFieldValues extends FieldValues>
  extends UseControllerProps<TFieldValues> {
  length: number;
  className?: string;
  containerClassName?: string;
}

function OtpInputs<TFieldValues extends FieldValues>({
  name,
  control,
  length,
  className = "",
  containerClassName = "",
}: OtpInputsProps<TFieldValues>) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, control });

  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Sync internal state with external form value
    if (value && typeof value === "string" && value.length === length) {
      setOtpValues(value.split(""));
    } else {
      setOtpValues(Array(length).fill(""));
    }
  }, [value, length]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value: inputValue } = e.target;
    if (!/^\d*$/.test(inputValue)) return; // Allow only digits

    const newOtpValues = [...otpValues];
    newOtpValues[index] = inputValue.slice(-1);
    setOtpValues(newOtpValues);

    const fullOtp = newOtpValues.join("");
    onChange(fullOtp);

    // Move to next input
    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={`flex justify-center space-x-2 ${containerClassName}`}>
      {otpValues.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={(e) => e.target.select()}
          onBlur={onBlur}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          className={`
            w-10 h-10 sm:w-12 sm:h-12 text-lg text-center
            rounded-lg border border-gray-300 bg-gray-50
            focus:border-green-500 focus:ring-green-500 focus:outline-none
            ${error ? "border-red-500 focus:border-red-500" : ""}
            ${className}
          `}
        />
      ))}
      {error && (
        <p className="mt-2 text-sm text-red-600 absolute bottom-[-24px] left-0 right-0 text-center">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default OtpInputs;
