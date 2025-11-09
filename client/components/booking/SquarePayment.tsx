// SquarePayment.tsx
"use client";
import React from "react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";

interface SquarePaymentProps {
  amount: number;
  onSuccess: (token: string) => void;
  onError: (error: any) => void;
}

const SquarePayment: React.FC<SquarePaymentProps> = ({
  amount,
  onSuccess,
  onError,
}) => {
  return (
    <div className="flex flex-col items-center">
      <PaymentForm
        applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!}
        locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!}
        cardTokenizeResponseReceived={(token) => {
          // ensure token.token is defined before calling onSuccess
          if (token?.token) {
            onSuccess(token.token);
          } else {
            onError(new Error("Card tokenization failed: no token returned"));
          }
        }}
        createVerificationDetails={() => ({
          amount: amount.toFixed(2),
          currencyCode: "INR",
          intent: "CHARGE",
          billingContact: {
            familyName: "User",
            givenName: "User",
            countryCode: "IN",
            city: "Delhi",
            addressLines: ["MAIT Rohini"],
          },
        })}
      >
        <CreditCard />
      </PaymentForm>
    </div>
  );
};

export default SquarePayment;
