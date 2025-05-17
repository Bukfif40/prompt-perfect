import React, { useState } from "react";

import ChatBot from "./ChatBot";

function App() {
  const [prompt, setPrompt] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  const handleEnhance = async () => {
    setLoading(true);
    setError("");
    setEnhanced("");
    try {
      const res = await fetch("http://localhost:8000/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.enhanced) {
        setEnhanced(data.enhanced);
        setHistory([
          { prompt, enhanced: data.enhanced, timestamp: new Date().toLocaleString() },
          ...history,
        ]);
      } else setError(data.error || "Unknown error");
    } catch (e) {
      setError("Network error");
    }
    setLoading(false);
  };

  const handleCopy = async () => {
    if (enhanced) {
      try {
        await navigator.clipboard.writeText(enhanced);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        setCopied(false);
      }
    }
  };

  const handleReset = () => {
    setPrompt("");
    setEnhanced("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between">
        <span className="text-2xl font-extrabold text-blue-700 tracking-tight">Prompt Perfect</span>
        <span className="text-sm text-gray-400 font-semibold">AI Prompt & Chatbot</span>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center w-full px-2 py-8">
        <div className="w-full max-w-2xl space-y-8">
          {/* Prompt Enhancer Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600 text-center">Enhance Your AI Prompt</h2>
            <textarea
              className="w-full border p-2 rounded mb-4"
              rows={4}
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />
            <div className="flex gap-2 mb-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                onClick={handleEnhance}
                disabled={loading || !prompt.trim()}
              >
                {loading ? "Enhancing..." : "Enhance Prompt"}
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
                onClick={handleReset}
                disabled={loading && !enhanced}
              >
                Reset
              </button>
            </div>
            {enhanced && (
              <div className="mt-6">
                <h2 className="font-semibold mb-2">Enhanced Prompt:</h2>
                <div className="bg-gray-100 p-3 rounded whitespace-pre-line flex items-center justify-between">
                  <span>{enhanced}</span>
                  <button
                    className="ml-4 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleCopy}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            )}
            {error && (
              <div className="mt-4 text-red-600 bg-red-50 border border-red-200 rounded p-2 text-center font-medium">{error}</div>
            )}
            {history.length > 0 && (
              <div className="bg-gray-50 mt-6 p-4 rounded-lg border border-gray-200 shadow-inner">
                <h3 className="text-md font-bold mb-2 text-gray-700">Prompt History</h3>
                <ul className="space-y-3 max-h-56 overflow-y-auto">
                  {history.map((item, idx) => (
                    <li key={idx} className="border-b pb-2">
                      <div className="text-xs text-gray-400 mb-1">{item.timestamp}</div>
                      <div><span className="font-semibold">Original:</span> {item.prompt}</div>
                      <div><span className="font-semibold">Enhanced:</span> <span className="text-blue-800">{item.enhanced}</span></div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Chatbot Card */}
          <ChatBot />
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full py-4 bg-white shadow-inner text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Prompt Perfect &mdash; Built with React, FastAPI & Tailwind CSS
      </footer>
    </div>
  );
}

export default App;