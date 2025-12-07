import React from 'react';
import RAGChatbot from '../components/RAGChatbot';

export default function Root({ children }) {
  return (
    <>
      {children}
      <RAGChatbot />
    </>
  );
}