// components/OtpVerificationModal.tsx
"use client";

import React from "react";
import { OTPInput, ResendOTP } from "otp-input-react";

interface OtpVerificationModalProps {
  email: string;
  otp: string;
  isProcessing: boolean;
  onClose: () => void;
  onChange: (val: string) => void;
  onVerify: () => void;
  onResend: () => void;
}

const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
  email,
  otp,
  isProcessing,
  onClose,
  onChange,
  onVerify,
  onResend,
}) => {
  const renderResendTimer = ({
    remainingTime = 0,
  }: {
    remainingTime: number;
  }) => (
    <span className="text-sm text-gray-500">
      {remainingTime > 0
        ? `Resend OTP in ${remainingTime}s`
        : "Didn't receive code?"}
    </span>
  );

  const renderResendButton = ({
    onClick,
    disabled,
  }: {
    onClick: () => void;
    disabled: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled || isProcessing}
      className="text-blue-600 hover:underline text-sm font-medium disabled:opacity-50"
    >
      Resend
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 relative w-11/12 max-w-sm animate-fadeInScale">
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="text-center mb-4">
          <div className="w-12 h-12 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-2">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h5 className="font-bold text-lg text-gray-800 mb-1">
            Verify your email
          </h5>
          <p className="text-gray-500 text-sm">
            Enter the 6-digit code sent to {email}
          </p>
        </div>

        <OTPInput
          value={otp}
          onChange={onChange}
          autoFocus
          OTPLength={6}
          otpType="number"
          disabled={isProcessing}
          inputClassName="!w-10 !h-10 sm:!w-12 sm:!h-12 !text-lg !mx-1 sm:!mx-2 !rounded-lg !border !border-gray-300 !bg-gray-50 focus:!border-blue-500 focus:!ring-blue-500 focus:!outline-none"
          containerClassName="flex justify-center mb-4"
        />

        <div className="text-center mb-4">
          <ResendOTP
            onResend={onResend}
            renderTime={renderResendTimer}
            renderButton={renderResendButton}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onVerify}
            disabled={isProcessing || otp.length < 6}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <span className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></span>
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationModal;
