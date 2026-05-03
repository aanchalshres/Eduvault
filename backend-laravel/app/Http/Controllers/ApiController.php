<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class ApiController extends Controller
{
    private $mockCourses = [
        [
            "course_id" => "c-101",
            "title" => "Advanced Calculus & Algebra",
            "tutor_name" => "Dr. Alan Turing",
            "difficulty_level" => "Advanced",
            "price" => 150.00,
            "description" => "Master the foundations of continuous change and abstract structures."
        ],
        [
            "course_id" => "c-102",
            "title" => "Fundamentals of Physics",
            "tutor_name" => "Prof. Marie Curie",
            "difficulty_level" => "Intermediate",
            "price" => 120.00,
            "description" => "A comprehensive introduction to mechanics, thermodynamics, and electromagnetism."
        ],
        [
            "course_id" => "c-103",
            "title" => "World History: Ancient to Modern",
            "tutor_name" => "Dr. Howard Zinn",
            "difficulty_level" => "Beginner",
            "price" => 90.00,
            "description" => "Explore the defining moments of human civilization."
        ],
    ];

    public function getCourses()
    {
        return response()->json($this->mockCourses);
    }

    public function enroll(Request $request)
    {
        $request->validate([
            'student_id' => 'required|string',
            'course_id' => 'required|string',
        ]);

        return response()->json([
            "status" => "success",
            "message" => "Successfully enrolled student {$request->student_id} in course {$request->course_id}."
        ]);
    }

    public function scheduleSession(Request $request)
    {
        $request->validate([
            'student_id' => 'required|string',
            'tutor_id' => 'required|string',
            'date_time' => 'required|string',
            'topic' => 'required|string',
        ]);

        return response()->json([
            "status" => "success",
            "message" => "Session scheduled successfully for {$request->date_time}.",
            "session_id" => Str::uuid()->toString()
        ]);
    }

    public function processPayment(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'payment_method' => 'required|string',
        ]);

        // Simulate a 2-second delay
        sleep(2);

        return response()->json([
            "status" => "success",
            "transaction_id" => "tx-" . Str::random(8),
            "message" => "Payment of {$request->amount} processed successfully."
        ]);
    }

    public function aiTutor(Request $request)
    {
        $request->validate([
            'question' => 'required|string',
        ]);

        $question = strtolower($request->question);
        $answer = "";

        if (Str::contains($question, ['hello', 'hi', 'hey', 'who are you'])) {
            $answer = "Greetings. I am the EDUVAULT Cognitive Assistant. I am here to provide elite academic guidance and help you master complex subjects. How can I assist your learning journey today?";
        } elseif (Str::contains($question, ['math', 'algebra', 'calculus', 'equation', 'formula'])) {
            $answer = "Mathematics is the language of logic. To master this topic, we should decompose the problem into its foundational axioms. Would you like to walk through a specific derivation or solve a practice theorem?";
        } elseif (Str::contains($question, ['science', 'physics', 'chemistry', 'gravity', 'atom', 'energy'])) {
            $answer = "The physical world operates on elegant principles. Whether it's quantum mechanics or classical thermodynamics, the key is understanding the transfer of energy and matter. What specific phenomenon shall we analyze?";
        } elseif (Str::contains($question, ['code', 'programming', 'python', 'javascript', 'react', 'algorithm'])) {
            $answer = "Engineering is about building robust systems from simple instructions. I can help you debug logic, optimize complexity, or explain architectural patterns. What are we building today?";
        } elseif (Str::contains($question, ['history', 'war', 'century', 'empire', 'civilization'])) {
            $answer = "History is a tapestry of cause and effect. To truly understand an era, we must examine the socio-economic drivers behind the events. Which historical inflection point interests you?";
        } elseif (Str::contains($question, ['write', 'essay', 'literature', 'grammar'])) {
            $answer = "Clarity of thought leads to clarity of prose. I can help you structure your thesis, refine your vocabulary, or analyze literary themes. What is the core argument of your piece?";
        } elseif (Str::contains($question, ["confused", "hard", "don't understand", "help me", "stuck"])) {
            $answer = "Cognitive friction is a sign of neural growth. Don't be discouraged. Let's pivot our approach: can you describe the very first point where the logic feels unclear? We will rebuild from there.";
        } elseif (Str::contains($question, ['exam', 'test', 'study', 'prepare'])) {
            $answer = "Peak performance requires strategic preparation. I recommend active recall and spaced repetition. Shall we create a study roadmap or review high-yield concepts for your upcoming assessment?";
        } else {
            $answer = "That is an intriguing inquiry. As an advanced academic model, I'm analyzing the optimal way to assist you. Could you provide a bit more context so I can tailor my guidance to your specific learning objective?";
        }

        return response()->json(["answer" => $answer]);
    }

    public function contact(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
            'role' => 'required|string',
        ]);

        return response()->json([
            "status" => "success",
            "message" => "Thank you {$request->name}. Your inquiry has been received."
        ]);
    }
}
