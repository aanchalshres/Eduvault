'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = { id: string; name: string };
type ChatMessage = { role: string; text: string };

interface AppState {
  user: User;
  enrolledCourses: string[];
  scheduledSessions: any[];
  chatHistory: ChatMessage[];
}

interface StateContextType {
  state: AppState;
  updateState: (newState: Partial<AppState>) => void;
  enrollCourse: (courseId: string) => void;
  addSession: (session: any) => void;
  addChatMessage: (msg: ChatMessage) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const defaultState: AppState = {
  user: { id: 'u-123', name: 'Student' },
  enrolledCourses: [],
  scheduledSessions: [],
  chatHistory: [
    { role: 'tutor', text: 'Hello. I am your EDUVAULT AI Assistant. How may I support your academic progress today?' }
  ]
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('ev_user');
    const savedEnrolled = localStorage.getItem('ev_enrolled');
    const savedSessions = localStorage.getItem('ev_sessions');
    const savedChat = localStorage.getItem('ev_chat');

    setState({
      user: savedUser ? JSON.parse(savedUser) : defaultState.user,
      enrolledCourses: savedEnrolled ? JSON.parse(savedEnrolled) : defaultState.enrolledCourses,
      scheduledSessions: savedSessions ? JSON.parse(savedSessions) : defaultState.scheduledSessions,
      chatHistory: savedChat ? JSON.parse(savedChat) : defaultState.chatHistory,
    });
    setIsLoaded(true);
  }, []);

  const updateState = (newState: Partial<AppState>) => {
    setState(prev => {
      const next = { ...prev, ...newState };
      if (newState.user) localStorage.setItem('ev_user', JSON.stringify(next.user));
      if (newState.enrolledCourses) localStorage.setItem('ev_enrolled', JSON.stringify(next.enrolledCourses));
      if (newState.scheduledSessions) localStorage.setItem('ev_sessions', JSON.stringify(next.scheduledSessions));
      if (newState.chatHistory) localStorage.setItem('ev_chat', JSON.stringify(next.chatHistory));
      return next;
    });
  };

  const enrollCourse = (courseId: string) => {
    if (!state.enrolledCourses.includes(courseId)) {
      updateState({ enrolledCourses: [...state.enrolledCourses, courseId] });
    }
  };

  const addSession = (session: any) => {
    updateState({ scheduledSessions: [...state.scheduledSessions, session] });
  };

  const addChatMessage = (msg: ChatMessage) => {
    updateState({ chatHistory: [...state.chatHistory, msg] });
  };

  if (!isLoaded) return null; // Avoid hydration mismatch

  return (
    <StateContext.Provider value={{ 
      state, 
      updateState, 
      enrollCourse, 
      addSession, 
      addChatMessage,
      isSidebarOpen,
      setSidebarOpen
    }}>
      {children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
}
