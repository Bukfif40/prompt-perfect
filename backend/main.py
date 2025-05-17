from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI(
    title="Prompt Perfect API",
    description="API that improves user prompts and provides AI chat using OpenAI's GPT-3.5 model",
    version="1.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.post("/enhance")
async def enhance_prompt(body: PromptRequest):
    try:
        prompt = body.prompt.strip()
        if not prompt:
            return {"error": "Prompt is required."}
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an assistant that rewrites and enhances user prompts, making them clearer, more specific, and more effective for AI models. Do not answer the prompt, just rewrite it."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=50
        )
        enhanced = response.choices[0].message.content.strip()
        return {"enhanced": enhanced}
    except Exception as e:
        return {"error": str(e)}

# --- Chatbot endpoint ---
chat_memory = []  # In-memory chat history; not for production use

class ChatbotRequest(BaseModel):
    message: str

@app.post("/chatbot")
async def chatbot_response(body: ChatbotRequest):
    user_message = body.message.strip()

    if not user_message:
        return JSONResponse(status_code=400, content={"error": "Message is required."})

    # Add user message to memory
    chat_memory.append({"role": "user", "content": user_message})

    # System prompt at the start
    messages = [
        {"role": "system", "content": "You are a helpful assistant."}
    ] + chat_memory

    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=100
        )
        ai_message = response.choices[0].message.content.strip()
        chat_memory.append({"role": "assistant", "content": ai_message})
        return {"response": ai_message}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})