import asyncio
import uuid
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

app = FastAPI(title="EDUVAULT API", description="Backend for EDUVAULT Platform", version="1.0.0")

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---

class Course(BaseModel):
    course_id: str
    title: str
    tutor_name: str
    difficulty_level: str
    price: float
    description: str

class EnrollRequest(BaseModel):
    student_id: str
    course_id: str

class EnrollResponse(BaseModel):
    status: str
    message: str

class ScheduleRequest(BaseModel):
    student_id: str
    tutor_id: str
    date_time: str
    topic: str

class ScheduleResponse(BaseModel):
    status: str
    message: str
    session_id: str

class PaymentRequest(BaseModel):
    amount: float
    currency: str = "USD"
    payment_method: str

class PaymentResponse(BaseModel):
    status: str
    transaction_id: str
    message: str

class AITutorRequest(BaseModel):
    question: str

class AITutorResponse(BaseModel):
    answer: str

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str
    role: str

class ContactResponse(BaseModel):
    status: str
    message: str

# --- Mock Data ---
MOCK_COURSES = [
    Course(
        course_id="c-101",
        title="Advanced Calculus & Algebra",
        tutor_name="Dr. Alan Turing",
        difficulty_level="Advanced",
        price=150.00,
        description="Master the foundations of continuous change and abstract structures."
    ),
    Course(
        course_id="c-102",
        title="Fundamentals of Physics",
        tutor_name="Prof. Marie Curie",
        difficulty_level="Intermediate",
        price=120.00,
        description="A comprehensive introduction to mechanics, thermodynamics, and electromagnetism."
    ),
    Course(
        course_id="c-103",
        title="World History: Ancient to Modern",
        tutor_name="Dr. Howard Zinn",
        difficulty_level="Beginner",
        price=90.00,
        description="Explore the defining moments of human civilization."
    ),
]

# --- API Endpoints ---

@app.get("/courses", response_model=List[Course])
async def get_courses():
    """Returns a list of available courses."""
    return MOCK_COURSES

@app.post("/enroll", response_model=EnrollResponse)
async def enroll(request: EnrollRequest):
    """Simulates enrolling a student in a course."""
    # In a real app, verify the student_id and course_id in the database
    return EnrollResponse(
        status="success",
        message=f"Successfully enrolled student {request.student_id} in course {request.course_id}."
    )

@app.post("/schedule-session", response_model=ScheduleResponse)
async def schedule_session(request: ScheduleRequest):
    """Simulates scheduling a session with a tutor."""
    session_id = str(uuid.uuid4())
    return ScheduleResponse(
        status="success",
        message=f"Session scheduled successfully for {request.date_time}.",
        session_id=session_id
    )

@app.post("/payment", response_model=PaymentResponse)
async def process_payment(request: PaymentRequest):
    """Simulates a payment with a 2-second delay."""
    await asyncio.sleep(2)
    transaction_id = f"tx-{uuid.uuid4().hex[:8]}"
    return PaymentResponse(
        status="success",
        transaction_id=transaction_id,
        message=f"Payment of {request.amount} {request.currency} processed successfully."
    )

@app.post("/ai-tutor", response_model=AITutorResponse)
async def ai_tutor(request: AITutorRequest):
    """Enhanced rule-based intelligent tutor with persona."""
    question = request.question.lower()
    
    # 1. Greetings & Meta
    if any(k in question for k in ["hello", "hi", "hey", "who are you"]):
        answer = "Greetings. I am the EDUVAULT Cognitive Assistant. I am here to provide elite academic guidance and help you master complex subjects. How can I assist your learning journey today?"
    
    # 2. STEM Topics
    elif any(k in question for k in ["math", "algebra", "calculus", "equation", "formula"]):
        answer = "Mathematics is the language of logic. To master this topic, we should decompose the problem into its foundational axioms. Would you like to walk through a specific derivation or solve a practice theorem?"
        
    elif any(k in question for k in ["science", "physics", "chemistry", "gravity", "atom", "energy"]):
        answer = "The physical world operates on elegant principles. Whether it's quantum mechanics or classical thermodynamics, the key is understanding the transfer of energy and matter. What specific phenomenon shall we analyze?"
        
    elif any(k in question for k in ["code", "programming", "python", "javascript", "react", "algorithm"]):
        answer = "Engineering is about building robust systems from simple instructions. I can help you debug logic, optimize complexity, or explain architectural patterns. What are we building today?"

    # 3. Humanities
    elif any(k in question for k in ["history", "war", "century", "empire", "civilization"]):
        answer = "History is a tapestry of cause and effect. To truly understand an era, we must examine the socio-economic drivers behind the events. Which historical inflection point interests you?"
        
    elif any(k in question for k in ["write", "essay", "literature", "grammar"]):
        answer = "Clarity of thought leads to clarity of prose. I can help you structure your thesis, refine your vocabulary, or analyze literary themes. What is the core argument of your piece?"

    # 4. Support & Motivation
    elif any(k in question for k in ["confused", "hard", "don't understand", "help me", "stuck"]):
        answer = "Cognitive friction is a sign of neural growth. Don't be discouraged. Let's pivot our approach: can you describe the very first point where the logic feels unclear? We will rebuild from there."
        
    elif any(k in question for k in ["exam", "test", "study", "prepare"]):
        answer = "Peak performance requires strategic preparation. I recommend active recall and spaced repetition. Shall we create a study roadmap or review high-yield concepts for your upcoming assessment?"

    # 5. Default
    else:
        answer = "That is an intriguing inquiry. As an advanced academic model, I'm analyzing the optimal way to assist you. Could you provide a bit more context so I can tailor my guidance to your specific learning objective?"

    return AITutorResponse(answer=answer)

@app.post("/contact", response_model=ContactResponse)
async def contact(request: ContactRequest):
    """Simulates storing a contact form submission."""
    # In a real application, store this in a database
    return ContactResponse(
        status="success",
        message=f"Thank you {request.name}. Your inquiry has been received."
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
