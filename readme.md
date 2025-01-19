# ReLeaf - Mental Health Website

## Slogan: ReLeaf a few minutes goes a long way

## Project Objective: 
  The goal of this project is to create an AI-powered mental health assistant. ReLeaf will enable users to fill out daily journals, create personalized self-care to-do lists, and engage in meaningful deep talks with the AI to better understand and regulate their emotional well-being.

## Application Layout:
- Dashboard Page (Home Screen):
  Displays the number of consecutive days the user has engaged in self-care.
- Left-upper Corner: Menu icon that opens to reveal three options: Journaling, Chat with AI, and Meditation.
- Right-upper Corner: Login icon that redirects users to the login interface.
Core Features:

## Main function

### Journaling:
- Allows users to log how they feel on a scale of 1 to 10.
- Users can write journal entries detailing their experiences and emotions for the day.
- Journal data is sent to the Gemini model along with the designated prompt (see below).

### Chat with AI:
- The user's journal data is processed through the Gemini API to provide insightful feedback and engage the user in a deep, meaningful conversation.
- Responses from the AI are displayed in a chat-based UI.
- User conversations are stored for continuity, enabling them to pick up from previous discussions.

### Meditation Page:
- Displays a variety of bubbles of different sizes, each containing activities like "Breathing Exercises" or other self-care practices.
- Clicking on a bubble triggers an audio or video playback from provided media links.

## Technology Stack:
- React.js: Used to build the user interface for a seamless and interactive experience.
- AI Integration: Gemini API: Used to facilitate AI-driven interactions and insights.

  Gemini API Usage:
javascript

// Import the required library:
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client with an API key:
const genAI = new GoogleGenerativeAI("AIzaSyCyKzSO3W6PuilLfFxlkJaKMqMr7QWBDKA");

// Define the prompt for AI interactions:
const prompt1 = "You are a compassionate and professional AI therapist. Based on the user's journal entries and responses, provide insightful feedback and craft thoughtful, guiding questions to help the user gain deeper self-awareness and find emotional comfort.";

// Send the prompt to the API and retrieve the response:
const result = await genAI.generateContent(prompt1);
console.log(result.response.text());