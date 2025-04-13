# Interviuzilla AI

A web application that helps job seekers prepare for interviews by generating AI-powered questions based on their resume.

## Features

- GitHub Authentication
- Resume Upload & Text Extraction
- AI-Generated Interview Questions
- Webcam & Microphone Integration
- Answer Recording & Transcription
- AI-Powered Feedback

<table>
  <tr>
    <td width="33%">
     <img width="1710" alt="image" src="https://github.com/user-attachments/assets/83f6a160-6e10-4ffe-ba79-d24ecfd999f1" />
      <p align="center">Login</p>
    </td>
    <td width="33%">
      <img src="https://github.com/user-attachments/assets/b63d51bc-b173-48d7-aae2-84b81fad5ffc" alt="Upload Resume" />
      <p align="center">Resume Upload</p>
    </td>
    <td width="33%">
      <img src="https://github.com/user-attachments/assets/98a8f160-0459-4eca-b10c-ef14467d28cb" alt="Question Generation" />
      <p align="center">Question Generation</p>
    </td>
  </tr>
  <tr>
    <td width="33%">
      <img src="https://github.com/user-attachments/assets/11c597f0-b8f3-45a3-a440-b159b7ffedd7" alt="Interview Mode" />
      <p align="center">Interview Mode</p>
    </td>
    <td width="33%">
      <img src="https://github.com/user-attachments/assets/a48fbe63-5ed6-4c78-8638-ccb533d20d68" alt="Feedback" />
      <p align="center">Record Answer</p>
    </td>
    <td width="33%">
     <img width="1710" alt="image" src="https://github.com/user-attachments/assets/7e43d1a1-7f3f-4c6e-88a9-fd960ddb3cb3" />
      <p align="center">Response Analysis</p>
    </td>
  </tr>
</table>

## 🛠️ Tech Stack

- **Frontend**: Next.js, React.js, Tailwind CSS
- **Database**: Neon Database with Drizzle ORM
- **Authentication**: Clerk
- **AI**: Google Gemini API
- **Document Processing**: ```convertapi```

## Getting Started

```bash

git clone https://github.com/yourusername/resume-question-generator.git


npm install

# Create a .env file with:
# - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# - CLERK_SECRET_KEY
# - NEXT_PUBLIC_CLERK_SIGN_IN_URL
# - NEXT_PUBLIC_CLERK_SIGN_UP_URL
# - NEXT_PUBLIC_DATABASE_URL
# - NEXT_PUBLIC_GEMINI_API_KEY
# - NEXT_PUBLIC_HR_INTERVIEW_QUESTIONS

npm run dev
```

## How It Works

1. Sign in with GitHub
2. Upload your resume (PDF)
3. AI extracts information and generates relevant questions
4. Practice answering questions with your webcam on
5. Record your answers for transcription
6. Get AI feedback on your responses

---

Made with ❤️ by Rishi
