"use client";

import React , { useState }from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HomePage: React.FC = () => {
  const boxesData = [
    { title: "03", description: "Lorem Ipsum" },
    { title: "11", description: "Lorem Ipsum" },
    { title: "52", description: "Lorem Ipsum" },
  ];

  const newBoxesData =[
    { title: "03", description: "Lorem Ipsum" },
    { title: "11", description: "Lorem Ipsum" },
    { title: "52", description: "Lorem Ipsum" },
  ]

  const [submitTerm, setSubmitTerm] = useState("");

  const handleSubmitClick = async () => {
    if (!submitTerm) return;

    const response = await fetch("/api/createTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: submitTerm }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error creating user:", data);
      return;
    }

    console.log("User created successfully:", data);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {boxesData.map((box) => (
          <div
            key={box.title}
            className="rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <h3 className="text-xl font-bold mb-2">{box.title}</h3>
            {box.description && (
              <p className="text-gray-700">{box.description}</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
      <Input placeholder="Type Here" value={submitTerm} onChange={(e) => setSubmitTerm(e.target.value)} />
      <Button className="ml-4" onClick={handleSubmitClick}>Submit</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4 text-left">
        {newBoxesData.map((box, index) => (
          <div
            key={index} 
            className="rounded-lg shadow-md p-4 flex flex-col items-center relative"
          >
            <p className="text-gray-700 ">{box.description}</p>{" "}
            <button className="mt-4 bg-red-500 text-white font-bold">
              Click me
            </button>
            <div className="absolute justify-center right-1">
              <button onClick={() => handleDeleteClick(index)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;