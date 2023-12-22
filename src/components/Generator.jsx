import { useEffect, useState } from "react";

function Component() {
  /* VARIABLES */
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");
  const [useNumber, setUseNumber] = useState(false);
  const [useSymbol, setUseSymbol] = useState(false);
  const [useLowerCase, setUseLowerCase] = useState(true);
  const [useUpperCase, setUseUpperCase] = useState(true);

  /* FUNCTION TO GENERATE A NEW PASSWORD */
  function generator() {
    let pass = "";
    let newPassword = "";

    pass += useSymbol ? "!@#$%^&*()" : "";
    pass += useNumber ? "0123456789" : "";
    pass += useLowerCase ? "abcdefghijklmnopqrstuvwxyz" : "";
    pass += useUpperCase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";

    for (let i = 0; i < length; i++) {
      newPassword += pass.charAt(Math.floor(Math.random() * pass.length));
    }

    setPassword(newPassword);
  }

  /* GENERATING PASSWORD ON PAGE LOAD + CHANGES */
  useEffect(generator, [
    length,
    useNumber,
    useSymbol,
    useLowerCase,
    useUpperCase,
  ]);

  /* COPY PASSWORD TO CLIPBOARD */
  function copyToClipboard(e) {
    navigator.clipboard.writeText(password);

    //Changing the symbol
    e.target.innerText = "✓";
    setTimeout(() => {
      e.target.innerText = "Copy";
    }, 500);
  }

  return (
    <div className="flex h-screen select-none items-center justify-center text-center">
      <div className="xxs:w-[90%] flex h-[350px] flex-col justify-center gap-8 rounded-2xl border-2 border-gray-800 bg-gray-700 p-5 shadow-2xl shadow-blue-100 md:w-[70%] lg:w-[600px]">
        <h1 className="xxs:text-3xl xxs:mb-2 text-center font-bold text-orange-500 sm:text-4xl md:mb-4">
          Password Generator
        </h1>

        <div>
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            className="xxs:w-9/12 xxs:px-3 xxs:text-lg rounded-s-lg py-2 outline-none sm:px-5 sm:text-2xl md:w-4/5"
          />
          <button
            /* COPYING THE PASSWORD TO CLIPBOARD */
            onClick={copyToClipboard}
            className="xxs:px-2 xxs:w-[70px] xxs:text-lg rounded-e-lg bg-blue-600 py-2 text-white sm:w-[95px] sm:px-5 sm:text-2xl"
          >
            Copy
          </button>
        </div>

        <div className="xxs:text-lg font-semibold text-white sm:text-xl">
          <input
            type="range"
            min={6}
            max={22}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
            className="w-3/5"
          />
          <span className="mx-2"></span>
          <label htmlFor="length">Length : {length}</label>
        </div>

        <div className="text-lg text-white sm:grid sm:grid-cols-2">
          <div>
            {/* NUMBER */}
            <input
              type="checkbox"
              defaultChecked={useNumber}
              onClick={() => {
                setUseNumber((prev) => (prev = !prev));
              }}
              className="mr-1 h-4 w-4"
            />
            <label htmlFor="numbers">Numbers</label>

            <span className="mx-2"></span>

            {/* SYMBOL */}
            <input
              type="checkbox"
              defaultChecked={useSymbol}
              onClick={() => {
                setUseSymbol((prev) => (prev = !prev));
              }}
              className="mr-1 h-4 w-4"
            />
            <label htmlFor="symbol">Symbol</label>
          </div>

          <div>
            {/* LOWER CASE */}
            <input
              type="checkbox"
              defaultChecked={useLowerCase}
              onClick={() => {
                setUseLowerCase((prev) => (prev = !prev));
              }}
              className="mr-1 h-4 w-4"
            />
            <label htmlFor="characters">Lower Case</label>

            <span className="mx-2"></span>

            {/* UPPER CASE */}
            <input
              type="checkbox"
              defaultChecked={useUpperCase}
              onClick={() => {
                setUseUpperCase((prev) => (prev = !prev));
              }}
              className="mr-1 h-4 w-4"
            />
            <label htmlFor="characters">Upper Case</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
