"use client";
import React, { useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import file from "@public/images/files.png";
import toast, { Toaster } from "react-hot-toast";

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
      accept: { "image/*": [] },
    });

    return (
      <div
        {...getRootProps()}
        className="w-full h-60 border border-dashed border-primary bg-red-50 rounded-2xl overflow-hidden"
        style={{
          borderImage:
            "repeating-linear-gradient(90deg, var(--tw-border-opacity) 0, var(--tw-border-opacity) 10px, transparent 10px, transparent 20px) 30 / 1 / 0 stretch",
        }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : selectedFiles[index] ? (
          <div className="p-4 text-center">
            <img
              src={URL.createObjectURL(selectedFiles[index] as Blob)}
              alt="Preview"
              className="object-contain h-full w-full"
            />
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

    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    setIsLoading(false);

    if (response.ok) {
      toast.success("Form submitted successfully");
      form.reset();
      setSelectedFiles([null, null, null, null]);
    } else {
      toast.error("Form submission failed");
    }
  };

  return (
    <section className="p-4 md:px-20">
      <Toaster />
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
                defaultChecked
                required
              />
              <label htmlFor="male" className="mx-4">
                Male
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                className="custom-radio"
                required
              />
              <label htmlFor="female" className="mx-4">
                Female
              </label>
            </div>
          </div>
          <div className="flex flex-col md:flex-row my-4 space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/3 flex justify-between border-b-2 border-black">
              <label htmlFor="dob">Date Of Birth:</label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                maxDate={getMinDate()}
                className="border-none focus:ring-0 focus:border-none focus:outline-none pb-2"
                required
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
                  required
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md w-full md:w-[190px] flex items-center justify-center">
            {isLoading ? (
              <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full" />
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
