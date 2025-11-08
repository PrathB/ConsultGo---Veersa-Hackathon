"use client";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import "../globals.css";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      if (
        Math.floor(new Date().getTime() / 1000) >
        Number(localStorage.getItem("expiryDate"))
      ) {
        localStorage.clear();
        setLoading(false);
      } else {
        router.push("/"); // Redirect to the home page if already authenticated
      }
    } else {
      setLoading(false); // Stop loading if no JWT token
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-neutral-100 justify-center items-center p-4">
      {loading ? (
        <CircularProgress className="absolute top-1/2 left-1/2" />
      ) : (
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          {children} {/* This is where your form/content will go */}
        </div>
      )}
    </div>
  );
}
