import { useState } from 'react';
import ChatInterface from '../ChatInterface';
import { Button } from '@/components/ui/button';

export default function ChatInterfaceExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        Open Chat Interface
      </Button>
      <ChatInterface
        articleTitle="Revolutionary AI System Breakthrough in Medical Diagnosis"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}