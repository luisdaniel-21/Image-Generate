"use client";
import { TypeAnimation } from "react-type-animation";
import PulseLoader from "react-spinners/PulseLoader";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isResult, setResult] = useState("");
  const [loading, setLoading ] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    
    try {
      setLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="pt-5 flex flex-col items-center">
        <h1 className="text-5xl font-semibold text-center text-pretty pb-3 text-slate-300">
          Generador de imagenes
        </h1>
        <h1 className="text-gray-200 text-lg">
          Genera imagenes con IA,
          <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            <TypeAnimation
              sequence={[" fácil y rápido.", 1000, " gratis.", 1000]}
              repeat={Infinity}
            />
          </span>
        </h1>
        <form
          className="flex gap-3 w-full md:px-56 lg:px-80 px-5 pt-5"
          onSubmit={onSubmit}
        >
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-white/10 text-slate-300 text-md rounded-lg block w-full p-2.5
             focus:outline-none"
            placeholder="Ingresa una petición..."
          />
          <button className="py-3 px-5 block text-center text-lg text-white font-semibold bg-gray-700 rounded-xl disabled:opacity-50">
            Generar
          </button>
        </form>

        <div className="flex flex-col items-center pt-5">
          {loading ? (
            <>
              <PulseLoader color="#fff" />
              <span className="text-gray-400 text-base text-pretty text-center">
                Por favor espere, la imagen se esta creando.
              </span>
            </>
          ) : (
            <div className="px-10 pb-5">
            <img className="rounded-xl" src={isResult} alt="Image" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
