import React, { useState, useRef } from "react";
import ConfirmDialog from "./ConfirmDialog";
import SquarePayment from "./SquarePayment";
import { Toast } from "primereact/toast";
import { convertDateToCode } from "@/utils/formatDoctorAvailabilities";
import type { Doctor } from "@/types";

interface BookingSummaryProps {
  selectedSlot: string | null;
  selectedDuration: number;
  selectedType: string;

  doctor: Doctor;
  selectedDate: {
    date: string;
    slots: { id: number; time: string }[];
  };
  appointmentState: string;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedSlot,
  selectedDuration,
  selectedType,
  doctor,
  selectedDate,
  appointmentState,
}) => {
  const [complaint, setComplaint] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useRef<any>(null);

  const cancelCreate = () => setShowConfirmDialog(false);
  const getDateTime = () =>
    !selectedDate || !selectedSlot
      ? null
      : `${
          new Date(selectedDate.date).toISOString().split("T")[0]
        }T${selectedSlot}Z`;
  const getDay = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "long" });

  const bookAppointment = () => {
    if (!selectedSlot || !selectedDate) return;
    setShowConfirmDialog(true);
  };

  const handlePaymentSuccess = async (token: string) => {
    setShowPayment(false);
    await confirmCreate(token);
  };

  const handlePaymentError = (err: any) => {
    setShowPayment(false);
    toast.current.show({
      severity: "error",
      detail: `Payment failed: ${err.message}`,
      life: 3000,
      className: "bg-red-600 text-white p-3 rounded-lg font-semibold",
    });
  };

  const confirmCreate = async (paymentToken?: string) => {
    setLoading(true);
    const body = {
      doctor_id: Number(doctor.id),
      complaint,
      duration: selectedDuration,
      appointment_type: "First_time",
      appointment_date: getDateTime(),
      time_slot_code: convertDateToCode(
        getDay(selectedDate.date),
        selectedSlot!,
        selectedType
      ),
      payment_token: paymentToken, // Include payment info if needed by backend
    };

    try {
      // TODO: Example: send token to your backend to create payment & booking
      // const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/appointment/book`, {...})

      setShowConfirmDialog(false);
      toast.current.show({
        severity: "success",
        detail: "Payment Successful and slot booked!",
        life: 3000,
        className: "bg-green-600 text-white p-3 rounded-lg font-semibold",
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        detail: `Failed to book appointment: ${error}`,
        life: 3000,
        className: "bg-red-600 text-white p-3 rounded-lg font-semibold",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white rounded-3xl shadow-md p-4 md:p-6 w-full">
      <Toast ref={toast} />
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!selectedSlot || loading}
        onClick={bookAppointment}
      >
        Book Now
      </button>

      {/* Confirm Dialog */}
      <ConfirmDialog
        visible={showConfirmDialog}
        onConfirm={() => {
          setShowConfirmDialog(false);
          setShowPayment(true);
        }}
        onCancel={cancelCreate}
        loading={loading}
        complaint={complaint}
        setComplaint={setComplaint}
      />

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <SquarePayment
              amount={
                selectedDuration === 60 ? doctor.fees60min : doctor.fees30min
              }
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
            <button
              onClick={() => setShowPayment(false)}
              className="mt-4 w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
            >
              Cancel Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
