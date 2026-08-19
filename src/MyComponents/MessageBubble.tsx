import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import Image from "next/image";

type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

export const MessageBubble = ({
  role,
  content,
}: MessageBubbleProps) => {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex w-fit max-w-[70%] flex-col ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`whitespace-pre-wrap rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-orange-600 text-white"
              : "bg-slate-700 text-white"
          }`}
        >
          {content}
        </div>

        <div className="mt-1 flex gap-1">
          <Button
            onClick={() => navigator.clipboard.writeText(content)}
            variant="ghost"
            className="bg-transparent hover:bg-slate-500 hover:rounded-full"
          >
            <Image src="/copy-svgrepo-com.svg" alt="copy" width={25} height={25} />
          </Button>
        </div>
      </div>
    </div>
  );
};