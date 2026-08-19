const OLLAMA_URL = "http://localhost:11434";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export type OllamaModel = {
  name: string;
};

export async function getOllamaModels(): Promise<OllamaModel[]> {
  const response = await fetch(`${OLLAMA_URL}/api/tags`);

  if (!response.ok) {
    throw new Error("Failed to fetch Ollama models");
  }

  const data = await response.json();

  return data.models;
}

export async function chatWithOllama(
  model: string,
  messages: Message[],
  onChunk: (chunk: string) => void,
  signal?: AbortSignal,
) {
  const payload = {
    model,
    messages,
    stream: true,
  };

  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to connect to Ollama");
  }

  if (!response.body) {
    throw new Error("Ollama response body is empty");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {
    if (signal?.aborted) {
    await reader.cancel();
    break;
  }

    const { value, done } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");

    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.trim()) continue;

      const data = JSON.parse(line);

      if (data.message?.content) {
        onChunk(data.message.content);
      }
    }
  }
}