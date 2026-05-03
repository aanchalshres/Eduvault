export const API_BASE_URL = 'https://eduvault-laravel-backend-337943981820.us-central1.run.app/api';

export class ApiService {
  static async request(endpoint: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  static getCourses() {
    return this.request('/courses');
  }

  static enroll(studentId: string, courseId: string) {
    return this.request('/enroll', {
      method: 'POST',
      body: JSON.stringify({ student_id: studentId, course_id: courseId })
    });
  }

  static scheduleSession(studentId: string, tutorId: string, dateTime: string, topic: string) {
    return this.request('/schedule-session', {
      method: 'POST',
      body: JSON.stringify({
        student_id: studentId,
        tutor_id: tutorId,
        date_time: dateTime,
        topic: topic
      })
    });
  }

  static processPayment(amount: number, paymentMethod: string) {
    return this.request('/payment', {
      method: 'POST',
      body: JSON.stringify({ amount, payment_method: paymentMethod })
    });
  }

  static askAITutor(question: string) {
    return this.request('/ai-tutor', {
      method: 'POST',
      body: JSON.stringify({ question })
    });
  }

  static submitContact(data: any) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}
