"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import patientImage from "@/images/patient.png";
import doctorImage from "@/images/doctor.png";
import InputComponent from "./InputComponent";
import { Calendar } from "primereact/calendar";
import { format } from "date-fns"; // For formatting dates (optional)
import { useRouter } from "next/navigation";

function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("Patient");
  const [changedField, setChangedField] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [currCertificateId, setCurrCertificateId] = useState(1);
  const [currExperienceId, setCurrExperienceId] = useState(1);
  const [currInterestId, setCurrInterestId] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
    gender: "",
  });

  const [doctorCertificates, setDoctorCertificates] = useState([
    {
      id: 0,
      name: "",
      authority: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const [doctorExperiences, setDoctorExperiences] = useState([
    {
      id: 0,
      title: "",
      firm: "",
      department: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const [doctorInterests, setDoctorInterests] = useState([
    {
      id: 0,
      name: "",
      category: "",
    },
  ]);

  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
  });

  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      birthDate: "",
      gender: "",
    });

    setErrorMessage({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      birthDate: "",
    });

    setDoctorCertificates([
      {
        id: 0,
        name: "",
        authority: "",
        startDate: "",
        endDate: "",
      },
    ]);

    setDoctorExperiences([
      {
        id: 0,
        title: "",
        firm: "",
        department: "",
        startDate: "",
        endDate: "",
      },
    ]);

    setDoctorInterests([
      {
        id: 0,
        name: "",
        category: "",
      },
    ]);

    setCurrCertificateId(1);
    setCurrExperienceId(1);
    setCurrInterestId(1);
  }, [userType]);

  const formFields = [
    { name: "firstName", title: "First Name", type: "text" },
    { name: "lastName", title: "Last Name", type: "text" },
    { name: "email", title: "Email", type: "email" },
    { name: "phone", title: "Phone Number", type: "number" },
    { name: "password", title: "Password", type: "password" },
    { name: "confirmPassword", title: "Confirm Password", type: "password" },
    { name: "birthDate", title: "Birth Date", type: "number" },
  ];

  const submitButtonClass = [
    "bg-sky-500 text-neutral-50 text-lg	p-3.5	w-full border-none rounded-lg cursor-pointer transition-[background-color]",
    "disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed enabled:bg-sky-500",
  ].join(" ");

  const validateFieldsChosen = () => {
    for (let key in formData) {
      if (!formData[key as keyof typeof formData]) {
        return false;
      }
    }
    return true;
  };

  const validateFirstName = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;

    if (formData.firstName && !regex.test(formData.firstName)) {
      if (errorMessage.firstName === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        firstName: "First Name Must Consist Of Only Characters",
      }));
    } else {
      if (errorMessage.firstName !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, firstName: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm })); // Extra rerender needed to correct the current input error status
    }
  };

  const validateLastName = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;
    if (formData.lastName && !regex.test(formData.lastName)) {
      if (errorMessage.lastName === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        lastName: "Last Name Must Consist Of Only Characters",
      }));
    } else {
      if (errorMessage.lastName !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, lastName: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let changedValidation = false;
    if (formData.email && !emailPattern.test(formData.email)) {
      if (errorMessage.email === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        email: "Email Is Invalid",
      }));
    } else {
      if (errorMessage.email !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, email: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validatePassword = () => {
    let passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    let changedValidation = false;
    if (
      !formData.password ||
      (formData.password && passwordPattern.test(formData.password))
    ) {
      if (errorMessage.password !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, password: "" }));
    } else {
      if (errorMessage.password === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        password:
          "Password Must Contain 8+ Characters Including Atleast 1 Number, 1 Character, 1 Symbol",
      }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validateConfirmPassword = () => {
    let changedValidation = false;

    if (
      formData.confirmPassword &&
      formData.confirmPassword !== formData.password
    ) {
      if (errorMessage.confirmPassword === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        confirmPassword: "Passwords Don't Match",
      }));
    } else {
      if (errorMessage.confirmPassword !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, confirmPassword: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validatePhone = () => {
    const phonePattern = /^-?\d+$/;
    let changedValidation = false;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      if (errorMessage.phone === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        phone: "Current Phone Number Is Not valid!",
      }));
    } else {
      if (errorMessage.phone !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, phone: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const handleDateChange = (e: any) => {
    const { value } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      birthDate: value,
    }));
    setChangedField(() => "birthDate");
  };
  const validateBirthDate = () => {
    let changedValidation = false;

    if (formData.birthDate) {
      const selectedDate = new Date(formData.birthDate);
      const today = new Date();
      let age = today.getFullYear() - selectedDate.getFullYear();
      const m = today.getMonth() - selectedDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < selectedDate.getDate())) {
        age--;
      }

      if (age < 13) {
        // Example: User must be at least 13 years old
        if (errorMessage.birthDate === "") {
          changedValidation = true;
        }
        setErrorMessage((prevError) => ({
          ...prevError,
          birthDate: "You must be at least 13 years old.",
        }));
      } else {
        if (errorMessage.birthDate !== "") {
          changedValidation = true;
        }
        setErrorMessage((prevError) => ({ ...prevError, birthDate: "" }));
      }
    } else {
      if (errorMessage.birthDate === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        birthDate: "Birth Date is required.",
      }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validateForm = () => {
    switch (changedField) {
      case "firstName":
        validateFirstName();
        break;

      case "lastName":
        validateLastName();
        break;

      case "email":
        validateEmail();
        break;

      case "password":
        validatePassword();
        validateConfirmPassword();
        break;

      case "confirmPassword":
        validateConfirmPassword();
        break;

      case "phone":
        validatePhone();
        break;

      case "birthDate":
        validateBirthDate();
        break;

      default:
        break;
    }

    setChangedField(() => "");

    if (validateFieldsChosen()) {
      for (let key in errorMessage) {
        if (errorMessage[key as keyof typeof errorMessage] !== "") {
          setFormValid(() => false);
          return;
        }
      }
      setFormValid(() => true);
    } else {
      setFormValid(() => false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setChangedField(() => name);
  };

  const handleAddCertificate = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrCertificateId((prevId) => prevId + 1);
    let currCertificates = doctorCertificates;
    currCertificates.push({
      id: currCertificateId,
      name: "",
      authority: "",
      startDate: "",
      endDate: "",
    });
    setDoctorCertificates(() => currCertificates);
  };

  const handleDeleteCertificate = (id: Number) => {
    setCurrCertificateId((prevId) => prevId + 1);
    let currCertificates = [];
    for (let i = 0; i < doctorCertificates.length; i++) {
      if (doctorCertificates[i].id === id) {
        continue;
      }
      currCertificates.push(doctorCertificates[i]);
    }
    setDoctorCertificates(() => currCertificates);
  };

  const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, placeholder, value } = e.target;
    let currCertificates = doctorCertificates;
    for (let i = 0; i < currCertificates.length; i++) {
      if (
        currCertificates[i].id + 1 ===
        Number(placeholder[placeholder.length - 1])
      ) {
        if (name === "name") {
          currCertificates[i].name = value;
        } else if (name === "authority") {
          currCertificates[i].authority = value;
        } else if (name === "startDate") {
          currCertificates[i].startDate = value;
        } else if (name === "endDate") {
          currCertificates[i].endDate = value;
        }
        break;
      }
    }
    setDoctorCertificates(() => currCertificates);
    setFormData((prevForm) => ({ ...prevForm }));
  };

  const handleAddExperience = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrExperienceId((prevId) => prevId + 1);
    let currExperiences = doctorExperiences;
    currExperiences.push({
      id: currExperienceId,
      title: "",
      firm: "",
      department: "",
      startDate: "",
      endDate: "",
    });
    setDoctorExperiences(() => currExperiences);
  };

  const handleDeleteExperience = (id: Number) => {
    setCurrExperienceId((prevId) => prevId + 1);
    let currExperiences = [];
    for (let i = 0; i < doctorExperiences.length; i++) {
      if (doctorExperiences[i].id === id) {
        continue;
      }
      currExperiences.push(doctorExperiences[i]);
    }
    setDoctorExperiences(() => currExperiences);
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, placeholder, value } = e.target;
    let currExperiences = doctorExperiences;
    for (let i = 0; i < currExperiences.length; i++) {
      if (
        currExperiences[i].id + 1 ===
        Number(placeholder[placeholder.length - 1])
      ) {
        if (name === "title") {
          currExperiences[i].title = value;
        } else if (name === "firm") {
          currExperiences[i].firm = value;
        } else if (name === "department") {
          currExperiences[i].department = value;
        } else if (name === "startDate") {
          currExperiences[i].startDate = value;
        } else if (name === "endDate") {
          currExperiences[i].endDate = value;
        }
        break;
      }
    }
    setDoctorExperiences(() => currExperiences);
    setFormData((prevForm) => ({ ...prevForm }));
  };

  const handleAddInterest = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrInterestId((prevId) => prevId + 1);
    let currInterests = doctorInterests;
    currInterests.push({
      id: currInterestId,
      name: "",
      category: "",
    });
    setDoctorInterests(() => currInterests);
  };

  const handleDeleteInterest = (id: Number) => {
    setCurrInterestId((prevId) => prevId + 1);
    let currInterests = [];
    for (let i = 0; i < doctorInterests.length; i++) {
      if (doctorInterests[i].id === id) {
        continue;
      }
      currInterests.push(doctorInterests[i]);
    }
    setDoctorInterests(() => currInterests);
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, placeholder, value } = e.target;
    let currInterests = doctorInterests;
    for (let i = 0; i < currInterests.length; i++) {
      if (
        currInterests[i].id + 1 ===
        Number(placeholder[placeholder.length - 1])
      ) {
        if (name === "name") {
          currInterests[i].name = value;
        } else if (name === "category") {
          currInterests[i].category = value;
        }
        break;
      }
    }
    setDoctorInterests(() => currInterests);
    setFormData((prevForm) => ({ ...prevForm }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!formValid) return;

    // const endpoint = userType === "Patient"
    //   ? `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/register`
    //   : `${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/register`;

    const payload =
      userType === "Patient"
        ? {
            fName: formData.firstName,
            lName: formData.lastName,
            email: formData.email,
            password: formData.password,
            gender: formData.gender,
            phone: formData.phone,
            birthDate: formData.birthDate
              ? format(new Date(formData.birthDate), "yyyy-MM-dd")
              : null,
          }
        : {
            personalInfo: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              birthdate: formData.birthDate
                ? format(new Date(formData.birthDate), "yyyy-MM-dd")
                : null,
              city: "",
              country: "",
              email: formData.email,
              gender: formData.gender,
              location: "",
              password: formData.password,
              phone: formData.phone,
              speciality: "",
            },
            certificates: doctorCertificates,
            experiences: doctorExperiences,
            interests: doctorInterests,
            Languages: [],
          };

    // try {
    // const response = await fetch(endpoint, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    //   mode: "cors",
    // });

    // if (!response.ok) {
    //   setSignedUp(false);
    //   setError(true);
    //   setLoading(false);
    //   throw new Error("Failed to register");
    // }
    setTimeout(async () => {
      // Static token and user data
      const users = {
        token: "staticToken123",
        tokenExpiryDate: "2024-12-31T23:59:59Z",
        userRole: "Patient",
        id: "user123",
        firstName: "Mahmoud",
        lastName: "Mohamed",
      };
      const responseData = payload;

      localStorage.setItem("registeredUser", JSON.stringify(responseData));
      localStorage.setItem("userRole", userType);
      localStorage.setItem("jwt", users.token);
      localStorage.setItem("expiryDate", users.tokenExpiryDate);
      localStorage.setItem("userId", users.id);
      localStorage.setItem("firstName", users.firstName);
      localStorage.setItem("lastName", users.lastName);

      setError(false);
      setSignedUp(true);
      setLoading(false);
      router.replace("/");
      //   } catch (error) {
      //     console.error("Error During Signup:", error);
      //     setLoading(false);
      //   }
    }, 2000); // Simulate loading delay
  };

  const patientImageClass = `w-20 h-20 border-2 border-solid rounded-full ${
    userType === "Patient" ? "border-blue-500" : ""
  } hover:cursor-pointer hover:scale-105`;
  const patientTextClass = `font-bold ${
    userType === "Patient" ? "text-blue-500" : "text-neutral-700"
  }`;
  const doctorImageClass = `w-20 h-20 border-2 border-solid rounded-full ${
    userType === "Doctor" ? "border-blue-500" : ""
  } hover:cursor-pointer hover:scale-105`;
  const doctorTextClass = `font-bold ${
    userType === "Doctor" ? "text-blue-500" : "text-neutral-700"
  }`;

   return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-600">Join ConsultGo and connect with experts</p>
          </div>

          {/* User Type Selection */}
          <div className="flex gap-8 items-center justify-center mb-8">
            <div 
              className="flex flex-col gap-3 items-center cursor-pointer group"
              onClick={() => setUserType("Patient")}
            >
              <div className={`relative ${patientImageClass} bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center`}>
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {userType === "Patient" && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <p className={patientTextClass}>Patient</p>
            </div>

            <div 
              className="flex flex-col gap-3 items-center cursor-pointer group"
              onClick={() => setUserType("Doctor")}
            >
              <div className={`relative ${doctorImageClass} bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center`}>
                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {userType === "Doctor" && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <p className={doctorTextClass}>Doctor</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <div className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
              />
              <p className="text-xs text-gray-500 mt-1">Please enter a valid phone number</p>
            </div>

            {/* Birth Date Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Birth Date *
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
              />
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Gender *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 px-6 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-all duration-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                  <input type="radio" name="gender" value="Male" className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Male</span>
                </label>
                <label className="flex items-center gap-2 px-6 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-all duration-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                  <input type="radio" name="gender" value="Female" className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Female</span>
                </label>
              </div>
            </div>

            {/* Doctor-specific fields */}
            {userType === "Doctor" && (
              <div className="space-y-6 mt-8">
                {/* Certificates Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Certificates</h3>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Certificate
                    </button>
                  </div>
                  <div className="space-y-4 bg-white rounded-xl p-4">
                    <input
                      type="text"
                      placeholder="Certificate Name"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Issuing Authority"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        placeholder="Start Date"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="date"
                        placeholder="End Date"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Experience Section */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Experience</h3>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Experience
                    </button>
                  </div>
                  <div className="space-y-4 bg-white rounded-xl p-4">
                    <input
                      type="text"
                      placeholder="Job Title"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Firm/Hospital Name"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Department"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        placeholder="Start Date"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                      />
                      <input
                        type="date"
                        placeholder="End Date"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Interests Section */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Interests</h3>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Interest
                    </button>
                  </div>
                  <div className="space-y-4 bg-white rounded-xl p-4">
                    <input
                      type="text"
                      placeholder="Interest Name"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="pt-4">
              <p className="text-center text-gray-600 mb-4">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-blue-600 font-semibold hover:text-blue-700">
                  Sign in
                </Link>
              </p>

              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
