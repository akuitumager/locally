import { MessageBubble } from "./MessageBubble";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type MainLayerProps = {
  messages: Message[];
};

export const MainLayer = ({ messages }: MainLayerProps) => {
  return (
    <main className="flex flex-1 flex-col min-h-0">
      <section className="flex-1 h-full overflow-y-auto p-6">
        <div className="flex flex-col gap-4">
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
