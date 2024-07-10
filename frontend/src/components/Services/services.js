import React, { useState } from "react";
import {
  LifebuoyIcon,
  NewspaperIcon,
  CloudIcon,
} from "@heroicons/react/20/solid";

const cards = [
  {
    name: "Data-Security",
    description:
      "AHCyber Security Services, Tier 3 certified Data Center with ISO 2008 and PCC SI Compliance to international standard. Primary and Secondary Data Storage Facility to tailor on Customer Need for DR site as well as Upscale with client needs.",
    icon: CloudIcon,
  },
  {
    name: "Dedicated Customer Support",
    description:
      "We believe in empowering our users with continuous support. Our dedicated team is always on standby to assist with any queries, ensuring a smooth, uninterrupted experience in content creation.",
    icon: LifebuoyIcon,
  },
  {
    name: "Customized Solutions",
    description:
      "We provide customized solution that meet your needs and requirements. ",
    icon: NewspaperIcon,
  },
];

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    service: "", // Added service field in formData state
  });
  const [submitSuccess, setSubmitSuccess] = useState(false); // State to manage submission success message

  const handleAvailNowClick = (service) => {
    setFormData({
      ...formData,
      service: service, // Update service in formData when button is clicked
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit button clicked"); // Log to check button click

    try {
      // Validate that service is selected
      if (!formData.service) {
        throw new Error("Please select a service");
      }

      const response = await fetch(
        "http://localhost:8090/api/v1/users/service-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit service request");
      }

      // Send data to Formspree to send the email
      const formspreeResponse = await fetch("https://formspree.io/f/xnnaqepn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const formspreeData = await formspreeResponse.json();

      if (!formspreeResponse.ok) {
        throw new Error(formspreeData.message || "Failed to send email");
      }

      setSubmitSuccess(true);
      setIsModalOpen(false);

      // Reset form fields
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        service: "",
      });

      console.log("Service request submitted successfully:", data.message);
    } catch (error) {
      console.error("Error submitting service request:", error.message);
      // Handle specific error messages or display them to the user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            NexusTech Financial Insights
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            NexusTech Financial Insights offers integrated services and expert
            analysis across AI-based real estate ventures, IT & telecom
            innovations, and strategic financial investments. Explore actionable
            insights, tailored solutions, and pioneering strategies designed to
            drive growth and transformation in today's dynamic business
            landscape.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.name}
              className="flex flex-col gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10"
            >
              <card.icon
                className="h-7 w-5 flex-none text-indigo-400"
                aria-hidden="true"
              />
              <div className="text-base leading-7 flex-grow">
                <h3 className="font-semibold text-white">{card.name}</h3>
                <p className="mt-2 text-gray-300">{card.description}</p>
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => handleAvailNowClick(card.name)}
                  className="inline-flex items-center justify-center w-full rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Avail now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Avail Service</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="service" className="block text-gray-700">
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a service</option>
                  {cards.map((card) => (
                    <option key={card.name} value={card.name}>
                      {card.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">
                  We will contact you shortly once form is submitted. Kindly
                  submit correct details. Thank you for choosing our services.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {submitSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              Form Submitted Successfully
            </h2>
            <p className="text-gray-700">
              Thank you for submitting your service request.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-4 py-2 bg-orange-500 text-white rounded-md mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
