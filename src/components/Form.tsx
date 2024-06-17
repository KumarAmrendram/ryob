"use client";
import React, { useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import file from "@public/images/files.png";
import { toast } from "react-hot-toast";

import "react-datepicker/dist/react-datepicker.css";
import "./form.css";

interface FormData {
  firstName: string;
  lastName: string;
  bio: string;
  gender: string;
  religion: string;
  residentStatus: string;
  maritalStatus: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  files: File[];
}

const Form = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    bio: "",
    gender: "male",
    religion: "",
    residentStatus: "Resident",
    maritalStatus: "Unmarried",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
    files: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[], index: number) => {
      if (acceptedFiles.length > 0) {
        const updatedFiles = [...selectedFiles];
        updatedFiles[index] = acceptedFiles[0];
        setSelectedFiles(updatedFiles);
      }
    },
    [selectedFiles]
  );

  const Dropzone = ({ index }: { index: number }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, index),
      multiple: false,
      accept: { "image/*": [] }, // Updated accept prop
    });

    return (
      <div
        {...getRootProps()}
        className="w-full h-60 border border-dashed border-primary bg-red-50 rounded-2xl"
        style={{
          borderImage:
            "repeating-linear-gradient(90deg, var(--tw-border-opacity) 0, var(--tw-border-opacity) 10px, transparent 10px, transparent 20px) 30 / 1 / 0 stretch",
        }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : selectedFiles[index] ? (
          <div className="p-4 text-center">
            <p>{selectedFiles[index]?.name}</p>
            <p>{(selectedFiles[index]?.size! / 1024).toFixed(2)} KB</p>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <Image src={file} alt="" className="w-40 h-40" />
          </div>
        )}
      </div>
    );
  };

  const getMinDate = () => {
    const today = new Date();
    return new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.currentTarget;

    if (selectedFiles.includes(null)) {
      alert("Please upload an image in each drop zone.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(form);

    selectedFiles.forEach((file, index) => {
      if (file) {
        formData.append(`file${index}`, file);
      }
    });

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      setTimeout(() => {
        toast.success("Form submitted successfully");
        setFormData({
          firstName: "",
          lastName: "",
          bio: "",
          gender: "male",
          religion: "",
          residentStatus: "Resident",
          maritalStatus: "Unmarried",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          phone: "",
          email: "",
          files: [],
        });
        setSelectedFiles([null, null, null, null]);
        setStartDate(new Date());
        setIsLoading(false);
      }, 2000);
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        // setTimeout(() => {

        //   toast.success("Form submitted successfully");
        //   setFormData({
        //     firstName: "",
        //     lastName: "",
        //     bio: "",
        //     gender: "male",
        //     religion: "",
        //     residentStatus: "Resident",
        //     maritalStatus: "Unmarried",
        //     city: "",
        //     state: "",
        //     postalCode: "",
        //     country: "",
        //     phone: "",
        //     email: "",
        //     files: [],
        //   });
        //   setSelectedFiles([null, null, null, null]);
        //   setStartDate(new Date());
        //   setIsLoading(false);
        // }, 10);
      } else {
        toast.error("Form submission failed");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Form submission failed");
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <section className="p-4 md:px-20">
      <p className="text-3xl md:text-5xl">Show Your Looks</p>
      <p className="text-lg my-4 md:my-1">
        &quot;Upload your images directly to this form for easy sharing and
        seamless collaboration&quot;
      </p>
      <div className="flex flex-wrap justify-center md:justify-between md:flex-row mx-auto md:w-[90%]">
        {selectedFiles.map((_, index) => (
          <div key={index} className="w-[150px] md:w-1/5 m-2">
            <Dropzone key={index} index={index} />
          </div>
        ))}
      </div>
      <div className="w-[90%] mx-auto">
        <p className="text-secondary uppercase text-2xl my-4 w-[300px] border-b-2 border-black">
          Personal Information
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row my-4 space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/3 flex items-center border-b-2 border-black">
              <label htmlFor="firstName" className="mr-4 pb-2">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="flex-1 border-none focus:ring-0 focus:border-none focus:outline-none pb-2"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full md:w-1/3 flex items-center border-b-2 border-black">
              <label htmlFor="lastName" className="mr-4 pb-2">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="flex-1 border-none focus:ring-0 focus:border-none focus:outline-none pb-2"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="my-4">
            <label htmlFor="bio" className="mr-4 pb-2">
              Bio:
            </label>
            <textarea
              className="w-full bg-secondary/20 rounded-xl text-secondary placeholder-secondary focus:outline-none p-4"
              id="bio"
              name="bio"
              rows={5}
              cols={50}
              placeholder="write some cheese lines"
              value={formData.bio}
              onChange={handleInputChange}
              required></textarea>
          </div>
          <div className="my-4 flex flex-row items-start">
            <p>Gender: </p>
            <div className="flex items-center justify-evenly md:pe-32 ps-4">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                className="custom-radio"
                checked={formData.gender === "male"}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="male" className="mx-4">
                Male
              </label>
            </div>
          </div>
          <div className="flex flex-col md:flex-row my-4 space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/3 flex justify-between border-b-2 border-black">
              <label htmlFor="dob">Date Of Birth:</label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={getMinDate()}
                className="border-none focus:ring-0 focus:border-none focus:outline-none"
              />
            </div>
            <div className="w-full md:w-1/3 flex items-center border-b-2 border-black">
              <label htmlFor="religion" className="mr-4 pb-2">
                Religion:
              </label>
              <input
                type="text"
                id="religion"
                name="religion"
                className="flex-1 border-none focus:ring-0 focus:border-none focus:outline-none pb-2"
                value={formData.religion}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="my-4 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
            <p>Resident Status:</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="resident"
                  name="residentStatus"
                  value="Resident"
                  className="custom-radio"
                  checked={formData.residentStatus === "Resident"}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="resident" className="mx-2">
                  Resident
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="non-resident"
                  name="residentStatus"
                  value="Non-Resident"
                  className="custom-radio"
                  checked={formData.residentStatus === "Non-Resident"}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="non-resident" className="mx-2">
                  Non-Resident
                </label>
              </div>
            </div>
          </div>
          <div className="my-4 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
            <p>Marital Status:</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="married"
                  name="maritalStatus"
                  value="Married"
                  className="custom-radio"
                  checked={formData.maritalStatus === "Married"}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="married" className="mx-2">
                  Married
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="unmarried"
                  name="maritalStatus"
                  value="Unmarried"
                  className="custom-radio"
                  checked={formData.maritalStatus === "Unmarried"}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="unmarried" className="mx-2">
                  Unmarried
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="divorced"
                  name="maritalStatus"
                  value="Divorced"
                  className="custom-radio"
                  checked={formData.maritalStatus === "Divorced"}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="divorced" className="mx-2">
                  Divorced
                </label>
              </div>
            </div>
          </div>
          <div className="my-4 flex flex-col">
            <p className="text-secondary uppercase text-xl my-4 w-[190px] border-b-2 border-black">
              Contact Details
            </p>
            <div className="flex flex-col md:flex-row my-4 space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/3 flex items-center border-b-2 border-black">
                <label htmlFor="city" className="mr-4 pb-2">
                  City:
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="flex-1 border-none focus:ring-0 focus:border-none focus:outline-none pb-2"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/3 flex items-center border-b-2 border-black">
                <label htmlFor="state" className="mr-4 pb-2">
                  State:
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="flex-1 border-none focus:ring-0 focus:border-none focus:outline-none pb-2"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row my-4 space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/3 flex items-center border-b-2 border-black">
                <label htmlFor="postalCode" className="mr-4 pb-2">
                  Postal Code:
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  className="flex-1 border-none focus:ring-0 focus:border-none focus:outline-none pb-2"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/3 flex items-center border-b-2 border-black">
                <label htmlFor="country" className="mr-4 pb-2">
                  Country:
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="flex-1 border-none focus:ring-0 focus:border-none focus:outline-none pb-2"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row my-4 space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/3 flex items-center border-b-2 border-black">
                <label htmlFor="phone" className="mr-4 pb-2">
                  Phone:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="flex-1 border-none focus:ring-0 focus:border-none focus:outline-none pb-2"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/3 flex items-center border-b-2 border-black">
                <label htmlFor="email" className="mr-4 pb-2">
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="flex-1 border-none focus:ring-0 focus:border-none focus:outline-none pb-2"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md w-full md:w-[190px] flex items-center justify-center">
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Form;
