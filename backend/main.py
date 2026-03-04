import os
from fastapi import FastAPI, WebSocket
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Load the context into memory at startup
with open("context.txt", "r") as f:
    SYSTEM_CONTEXT = f.read()

app = FastAPI()

@app.websocket("/ws/agent")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            user_input = await websocket.receive_text()
            
            stream = client.chat.completions.create(
                model="llama3-8b-8192",
                messages=[
                    {
                        "role": "system", 
                        "content": (
                            f"You are Kanish's personal AI Agent. Use this context: {SYSTEM_CONTEXT}. "
                            "If the question is about Kanish or 2S-AHO or research project, use the context. "
                            "If the question is about general CS, coding, or life, answer normally as an expert assistant."
                        )
                    },
                    {"role": "user", "content": user_input}
                ],
                stream=True,
            )
            for chunk in stream:
                if chunk.choices[0].delta.content:
                    await websocket.send_text(chunk.choices[0].delta.content)
        except Exception:
            break