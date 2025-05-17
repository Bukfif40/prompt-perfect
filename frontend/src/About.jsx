import React from "react";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-4">About Prompt Perfect</h1>
      <p className="mb-4">
        <strong>Prompt Perfect</strong> is a free, user-friendly web app that helps you instantly rewrite and improve any prompt for use with AI models like ChatGPT.
      </p>
      <ul className="mb-4 list-disc pl-6">
        <li>Make your prompts clearer, more specific, and more effective</li>
        <li>Get better results from AI tools</li>
        <li>Never get an answer—just a better version of your prompt!</li>
      </ul>
      <h2 className="text-xl font-semibold mt-4 mb-2">Who is it for?</h2>
      <ul className="mb-4 list-disc pl-6">
        <li>Anyone who wants to write better prompts for AI models</li>
        <li>Teachers and students</li>
        <li>Developers and content creators</li>
        <li>Business professionals</li>
        <li>And more!</li>
      </ul>
      <h2 className="text-xl font-semibold mt-4 mb-2">How does it work?</h2>
      <ol className="mb-4 list-decimal pl-6">
        <li>Type or paste your prompt into the app</li>
        <li>Click <strong>Enhance Prompt</strong></li>
        <li>Get an improved version you can copy or reuse</li>
      </ol>
      <p className="text-sm text-gray-500 mt-6">Built with React, Tailwind CSS, FastAPI, and OpenAI GPT-3.5. Your prompts are never stored or shared.</p>
    </div>
  );
}
