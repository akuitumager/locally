"use client";
import { MessageBubble } from "./MessageBubble";
import { useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type MainLayerProps = {
  messages: Message[];
  setHideHeader: (hide: boolean) => void;
};

export const MainLayer = ({ messages, setHideHeader }: MainLayerProps) => {
  const chatContainerRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentScrollY = container.scrollTop;

      if (currentScrollY < 20) {
        setHideHeader(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;

      if (diff > 10) {
        setHideHeader(true);
      } else if (diff < -10) {
        setHideHeader(false);
      }

      lastScrollY.current = currentScrollY;
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [setHideHeader]);

  return (
    <main className="relative flex flex-1 flex-col min-h-0 h-full">
      <section
        className="h-full flex-1 overflow-y-auto px-6 pb-6 pt-20"
        ref={chatContainerRef}
      >
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
        </div>
      </section>
    </main>
  );
};