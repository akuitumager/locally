import { ChatInput } from "./ChatInput";
import { Button } from "@/components/ui/button";

type ChatInputProps = {
  onSendTo: (message: string) => void;
};

export const Under = ({onSendTo}:ChatInputProps) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2 sticky bottom-2">
      <ChatInput onSend={onSendTo} />
      <Button className="bg-slate-900 size-14 rounded-full text-2xl text-bold">+</Button>
    </div>
  );
};
