"use client";
import { AppSidebar } from "@/MyComponents/appSidebar";
import { MainLayer } from "@/MyComponents/Main";
import { Under } from "@/MyComponents/Under";
import { useState, useEffect, useRef } from "react";
import { chatWithOllama, getOllamaModels, OllamaModel } from "@/lib/ollama";
import { Message } from "@/lib/types";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-white">
      <AppSidebar
        models={models}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />

      <main className="flex flex-1 flex-col h-full overflow-hidden relative">
        <div className="p-2 min-h-screen w-10 border border-slate-600 flex items-start">
          <SidebarTrigger className="text-slate-400 hover:text-white" />
        </div>

        <MainLayer messages={messages} setHideHeader={setHideHeader} />
        <Under
          onSendTo={handleSend}
          onStop={stopGeneration}
          isGenerating={isGenerating}
        />
      </main>
    </div>
  );
}
