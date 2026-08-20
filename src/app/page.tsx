"use client";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@base-ui/react";
import { Header } from "@/MyComponents/Header";
import { MainLayer } from "@/MyComponents/Main";
import { Under } from "@/MyComponents/Under";
import { useState, useEffect, useRef } from "react";
import { chatWithOllama, getOllamaModels, OllamaModel } from "@/lib/ollama";
import { Message } from "@/lib/types";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(0);

  const stopGeneration = () => {
    abortControllerRef.current?.abort();
  };

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      role: "user",
      content,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages([
      ...updatedMessages,
      {
        role: "assistant",
        content: "",
      },
    ]);

    const controller = new AbortController();

    abortControllerRef.current = controller;
    setIsGenerating(true);

    let assistantResponse = "";

    try {
      await chatWithOllama(
        selectedModel,
        updatedMessages,
        (chunk) => {
          assistantResponse += chunk;

          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;

            updated[lastIndex] = {
              ...updated[lastIndex],
              content: assistantResponse,
            };

            return updated;
          });
        },
        controller.signal,
      );
    } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;

        if (lastIndex >= 0) {
          if (!updated[lastIndex].content) {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: "you stopped this response",
            };
          }
        }
        return updated;
      });
    } else {
      console.error(error);
    }
  } finally {
    setIsGenerating(false);
    abortControllerRef.current = null;
  }
  };
  const [models, setModels] = useState<OllamaModel[]>([]);
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    async function loadModels() {
      try {
        const models = await getOllamaModels();

        setModels(models);

        if (models.length > 0) {
          setSelectedModel(models[0].name);
        }
      } catch (error) {
        console.error("Failed to load Ollama models:", error);
      }
    }

    loadModels();
  }, []);

  return (
    <div className="bg-slate-950 relative h-screen flex flex-col text-white">
      <Header
        models={models}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        hideHeader={hideHeader}
      />
      <MainLayer messages={messages} setHideHeader={setHideHeader} />
      <Under
        onSendTo={handleSend}
        onStop={stopGeneration}
        isGenerating={isGenerating}
      />
    </div>
  );
}
