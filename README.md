# SOEN 357 Prototype 
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Groq](https://img.shields.io/badge/Groq-000000?style=for-the-badge&logo=OpenAI&logoColor=white)
### Team members
| Name                 | Student ID | GitHub Profile | 
|:--------------------:|:----------:|:--------------:|
| Pamela Daniel       | 40286602    | [bypameladaniel](https://github.com/bypameladaniel) | 
| Mia Moreau     | 40275499    | [mia-moreau](https://github.com/mia-moreau) | 
| Carla Chamandi       | 40300354    | [Carlaeatdirt](https://github.com/Carlaeatdirt) | 
| Jaden Wright-Maurais       | 40276168    | [JA-WRI](https://github.com/JA-WRI) | 
| Nihal Islam       | 40242307    | [ImNotNihal](https://github.com/ImNotNihal) | 

# How to Run
SOEN 357 TAs: Link to .env file is provided in the final report document (please skip steps 3-4)<br>
### Prerequisits: 
- [Node.js](https://nodejs.org/en)
### Steps
1. Clone repo
```
git clone <repo-HTTPS>
cd study-buddy
```
2. Configure Environment Variables
Create a .env file in the root directory and add the following:
```
VITE_FIREBASE_API_KEY= 
VITE_FIREBASE_AUTH_DOMAIN= 
VITE_FIREBASE_PROJECT_ID= 
VITE_FIREBASE_STORAGE_BUCKET= 
VITE_FIREBASE_MESSAGING_SENDER_ID= 
VITE_FIREBASE_APP_ID=
VITE_GROQ_API_KEY= 
```
3. Setup Firebase project
   - Go to [Firebase console](https://firebase.google.com/?utm_source=google&utm_medium=cpc&utm_campaign=Cloud-SS-DR-Firebase-FY26-global-gsem-1713590&utm_content=text-ad&utm_term=KW_firebase&gclsrc=aw.ds&gad_source=1&gad_campaignid=23417478209&gbraid=0AAAAADpUDOgYAGr5cRMixriv4vtc3Yvin&gclid=CjwKCAjw4ufOBhBkEiwAfuC7-WQotYYNQJlXITOEYkrZDt0i5f12dUK6Y67Jy35IwV4qBMk0pdfZphoCrjgQAvD_BwE)
   - Create a new project
   - Enable authentication (Email/passwrod/Google signin) and Firestore database
   - Copy firebase config into the .env file
4. Create free Groq API Key
   - Go to [Groq website](https://groq.com/)
   - Generate API key
   - Paste API key into .env file<br>
   ⚠️Track usage and models on the Groq Dashboard
5. Navigate to frontend directory `study-buddy/frontend`
6. Install dependencies `npm i`
7. Run application `npm run dev`
8. Open browser to `http://localhost:5173`


# Limitations
Please be aware of usage limits for each provided model. There is a list of 4 models that were tested and work well with the premade prompts. If you have usage limits you can add/switch to different models provided by Groq. [Click here to view the list of models](https://console.groq.com/docs/models)

# Small Preview
https://github.com/user-attachments/assets/694582bc-2205-4bf2-95ec-95a8573b2301


