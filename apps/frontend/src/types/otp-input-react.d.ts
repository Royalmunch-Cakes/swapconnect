declare module "otp-input-react" {
  import * as React from "react";
  export interface OTPInputProps {
    value: string;
    onChange: (value: string) => void;
    autoFocus?: boolean;
    OTPLength?: number;
    otpType?: "number" | "alpha" | "alphanumeric";
    disabled?: boolean;
    secure?: boolean;
    inputClassName?: string;
    containerClassName?: string;
  }
  export const OTPInput: React.FC<OTPInputProps>;

  export interface ResendOTPProps {
    onResend: () => void;
    renderTime?: (props: { remainingTime: number }) => React.ReactNode;
    renderButton?: (props: {
      onClick: () => void;
      disabled: boolean;
    }) => React.ReactNode;
  }
  export const ResendOTP: React.FC<ResendOTPProps>;
}
