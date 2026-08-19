type TemplateMessage = {
    role: "user" | "assistant";
    content:string;
}

export const MessageBubble = ({role,content}:TemplateMessage) => {
    const isUser = role === "user";

    return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 whitespace-pre-wrap  ${
          isUser
            ? "bg-orange-600 text-white"
            : "bg-slate-800 text-slate-100"
        }`}
      >
        {content}
      </div>
    </div>
  );
}