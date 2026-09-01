"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

type ChatInputProps = {
  onSend: (message: string) => void;
  onStop: () => void;
  isGenerating: boolean;
};

export const ChatInput = ({ onSend, onStop, isGenerating }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-150">
        <div className="flex min-h-12 items-center gap-2 rounded-3xl border border-slate-700 bg-slate-900 p-2">
          <Textarea
            placeholder="Ask Xtarget..."
            className="min-h-12 max-h-40 resize-none overflow-y-auto border-0 text-white box-border focus-visible:ring-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <Button
            type={isGenerating ? "button" : "submit"}
            onClick={isGenerating ? onStop : undefined}
            className="size-10 rounded-full bg-orange-600 hover:bg-orange-700 flex justify-center items-center"
          >
            {isGenerating ? (
              <Image
                src="/svgviewer-output.svg"
                alt="!"
                width={12}
                height={12}
              />
            ) : (
              <Image src="/arrow.svg" width={12} height={12} alt="+" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
