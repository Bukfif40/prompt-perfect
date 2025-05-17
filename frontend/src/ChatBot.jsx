import { useState } from "react";

function ChatBot() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setChat([...chat, { role: "user", content: input }]);
    try {
      const res = await fetch("http://localhost:8000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      if (data.response) {
        setChat(c => [...c, { role: "assistant", content: data.response }]);
      } else if (data.error) {
        setChat(c => [...c, { role: "assistant", content: `Error: ${data.error}` }]);
      } else {
        setChat(c => [...c, { role: "assistant", content: "Sorry, I couldn't generate a response." }]);
      }
    } catch (err) {
      setChat(c => [...c, { role: "assistant", content: `Network error: ${err.message || err}` }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="mt-10 w-full max-w-xl mx-auto bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold text-center mb-4">Chat with AI Agent</h2>
      <div className="h-72 overflow-y-auto bg-gray-50 border rounded p-3 mb-4">
        {chat.length === 0 && (
          <div className="text-gray-400 text-center my-8">Start the conversation!</div>
        )}
        {chat.map((msg, i) => (
          <div key={i} className={`mb-2 text-sm ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span className={msg.role === "user" ? "text-blue-700" : "text-green-700"}>
              <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded"
          onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
