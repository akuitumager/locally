import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";

type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

export const MessageBubble = ({ role, content }: MessageBubbleProps) => {
  const isUser = role === "user";
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isUser && !content) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isUser, content]);

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex w-fit max-w-[70%] flex-col ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser ? "bg-orange-600 text-white" : "bg-slate-700 text-white"
          }`}
        >
          {!isUser && !content ? (
            <span className="italic text-slate-400 flex items-center gap-1 font-mono">
              Thinking{dots}
            </span>
          ) : (
            <div className="prose prose-invert max-w-none break-words">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>

        {content && (
          <div className="mt-1 flex gap-1">
            <Button
              onClick={() => navigator.clipboard.writeText(content)}
              variant="ghost"
              className="bg-transparent hover:bg-slate-500 hover:rounded-full"
            >
              <Image
                src="/copy-svgrepo-com.svg"
                alt="copy"
                width={25}
                height={25}
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
