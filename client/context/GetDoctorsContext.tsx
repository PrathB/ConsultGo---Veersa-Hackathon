"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Doctor = {
  id: string;
  name: string;
  title: string;
  numSessions: number;
  nearestApp: string;
  fees60min: number;
  fees30min: number;
  interests: string[];
  rating: number;
  numReviews: number;
  language: string[];
  speciality: string;
  gender: string;
  price: number[];
  todayDate: string;
  thisWeek: string;
  dateRange1: string;
  dateRange2: string;
  country: string[];
  sort: string;
  isOnline: string;
};
interface DoctorContextProps {
  doctors: Doctor[];
  isLoading: boolean;
  error: string | null;
  fetchDoctors: () => void;
}

const DoctorContext = createContext<DoctorContextProps | undefined>(undefined);

export const DoctorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/home`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error("Failed to fetch doctors");
      // }
      // const data = await response.json();

      const data: Doctor[] = [
        {
          id: "1",
          name: "Dr. Rajesh Kumar",
          title: "Psychiatrist",
          numSessions: 10,
          nearestApp: "2024-10-01",
          rating: 4.5,
          fees60min: 450,
          fees30min: 300,
          numReviews: 50,
          interests: ["Depression", "Anxiety", "Stress", "Relationships"],
          speciality: "Mental Health",
          gender: "Male",
          price: [450, 300],
          todayDate: "2024-12-18",
          thisWeek: "2024-12-18 to 2024-12-24",
          dateRange1: "2024-12-01 to 2024-12-07",
          dateRange2: "2024-12-08 to 2024-12-14",
          country: ["India"],
          sort: "rating",
          isOnline: "Yes",
          language: ["English", "Hindi"],
        },
        {
          id: "2",
          name: "Dr. Anil Sharma",
          title: "Cardiologist",
          numSessions: 15,
          nearestApp: "2024-10-05",
          rating: 4.7,
          fees60min: 600,
          fees30min: 360,
          numReviews: 60,
          interests: [
            "Heart Disease",
            "Hypertension",
            "Cholesterol",
            "Arrhythmia",
          ],
          speciality: "Cardiology",
          gender: "Male",
          price: [600, 360],
          todayDate: "2024-12-18",
          thisWeek: "2024-12-18 to 2024-12-24",
          dateRange1: "2024-12-01 to 2024-12-07",
          dateRange2: "2024-12-08 to 2024-12-14",
          country: ["India"],
          sort: "nearestApp",
          isOnline: "No",
          language: ["English", "Hindi"],
        },
        {
          id: "3",
          name: "Dr. Meera Iyer",
          title: "Dermatologist",
          numSessions: 20,
          nearestApp: "2024-10-10",
          rating: 4.8,
          fees60min: 540,
          fees30min: 330,
          numReviews: 70,
          interests: ["Acne", "Eczema", "Psoriasis", "Skin Cancer"],
          speciality: "Dermatology",
          gender: "Female",
          price: [540, 330],
          todayDate: "2024-12-18",
          thisWeek: "2024-12-18 to 2024-12-24",
          dateRange1: "2024-12-01 to 2024-12-07",
          dateRange2: "2024-12-08 to 2024-12-14",
          country: ["India"],
          sort: "rating",
          language: ["English", "Hindi"],
          isOnline: "Yes",
        },
        {
          id: "4",
          name: "Dr. Priya Singh",
          title: "Pediatrician",
          numSessions: 25,
          nearestApp: "2024-10-15",
          rating: 4.9,
          fees60min: 480,
          fees30min: 270,
          numReviews: 80,
          interests: [
            "Child Development",
            "Vaccinations",
            "Nutrition",
            "Asthma",
          ],
          speciality: "Pediatrics",
          gender: "Female",
          price: [480, 270],
          todayDate: "2024-12-18",
          thisWeek: "2024-12-18 to 2024-12-24",
          dateRange1: "2024-12-01 to 2024-12-07",
          dateRange2: "2024-12-08 to 2024-12-14",
          country: ["India"],
          sort: "nearestApp",
          language: ["English", "Hindi"],
          isOnline: "No",
        },
        {
          id: "5",
          name: "Dr. Vikram Patel",
          title: "Neurologist",
          numSessions: 18,
          nearestApp: "2024-10-20",
          rating: 4.6,
          fees60min: 660,
          fees30min: 390,
          numReviews: 55,
          interests: ["Epilepsy", "Stroke", "Migraine", "Multiple Sclerosis"],
          speciality: "Neurology",
          gender: "Male",
          price: [660, 390],
          todayDate: "2024-12-18",
          thisWeek: "2024-12-18 to 2024-12-24",
          dateRange1: "2024-12-01 to 2024-12-07",
          dateRange2: "2024-12-08 to 2024-12-14",
          country: ["India"],
          sort: "rating",
          language: ["English", "Hindi"],
          isOnline: "Yes",
        },
        {
          id: "6",
          name: "Dr. Leena Kapoor",
          title: "Endocrinologist",
          numSessions: 22,
          nearestApp: "2024-10-25",
          rating: 4.7,
          fees60min: 630,
          fees30min: 360,
          numReviews: 65,
          interests: [
            "Diabetes",
            "Thyroid Disorders",
            "Hormonal Imbalances",
            "Obesity",
          ],
          speciality: "Endocrinology",
          gender: "Female",
          price: [630, 360],
          todayDate: "2024-12-18",
          thisWeek: "2024-12-18 to 2024-12-24",
          dateRange1: "2024-12-01 to 2024-12-07",
          dateRange2: "2024-12-08 to 2024-12-14",
          country: ["India"],
          sort: "nearestApp",
          language: ["English", "Hindi"],
          isOnline: "No",
        },
        {
          id: "7",
          name: "Dr. Arjun Rao",
          title: "Orthopedic Surgeon",
          numSessions: 30,
          nearestApp: "2024-10-30",
          rating: 4.8,
          fees60min: 750,
          fees30min: 420,
          numReviews: 75,
          interests: [
            "Joint Replacement",
            "Sports Injuries",
            "Arthritis",
            "Fractures",
          ],
          speciality: "Orthopedics",
          gender: "Male",
          price: [750, 420],
          todayDate: "2024-12-18",
          thisWeek: "2024-12-18 to 2024-12-24",
          dateRange1: "2024-12-01 to 2024-12-07",
          dateRange2: "2024-12-08 to 2024-12-14",
          country: ["India"],
          sort: "rating",
          language: ["English", "Hindi"],
          isOnline: "Yes",
        },
        {
          id: "8",
          name: "Dr. Suresh Nair",
          title: "Gastroenterologist",
          numSessions: 28,
          nearestApp: "2024-11-05",
          rating: 4.9,
          fees60min: 690,
          fees30min: 375,
          numReviews: 85,
          interests: ["IBS", "Liver Disease", "GERD", "Colonoscopy"],
          speciality: "Gastroenterology",
          gender: "Male",
          price: [690, 375],
          todayDate: "2024-12-18",
          thisWeek: "2024-12-18 to 2024-12-24",
          dateRange1: "2024-12-01 to 2024-12-07",
          dateRange2: "2024-12-08 to 2024-12-14",
          country: ["India"],
          sort: "nearestApp",
          language: ["English", "Hindi"],
          isOnline: "No",
        },
      ];

      setDoctors(data);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (doctors.length === 0) {
      fetchDoctors();
    }
  }, [doctors]);

  return (
    <DoctorContext.Provider value={{ doctors, isLoading, error, fetchDoctors }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctorContext = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error("useDoctorContext must be used within a DoctorProvider");
  }
  return context;
};
