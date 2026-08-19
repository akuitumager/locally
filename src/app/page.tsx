"use client";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@base-ui/react";
import { Header } from "@/MyComponents/Header";
import { MainLayer } from "@/MyComponents/Main";
import { Under } from "@/MyComponents/Under";
import { useState } from "react";
import { chatWithOllama } from "@/lib/ollama";
import { Message } from "@/lib/types";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      role: "user",
      content,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "",
      },
    ]);

    try {
      console.log("HISTORY SENT:", JSON.stringify(updatedMessages, null, 2));
      await chatWithOllama("llama3.2:3b", updatedMessages, (chunk) => {
        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;

          const lastMessage = updated[lastIndex];

          if (lastMessage.role === "assistant") {
            updated[lastIndex] = {
              ...lastMessage,
              content: lastMessage.content + chunk,
            };
          }

          return updated;
        });
      });
    } catch (error) {
      console.error("Ollama error:", error);
    }
  };
  return (
    <div className="bg-slate-950 min-h-screen flex flex-col text-white">
      <Header />
      <MainLayer messages={messages} />
      <Under onSendTo={handleSend} />
    </div>
  );
}
