import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Bot, MessageSquare, Cpu } from "lucide-react";
import { OllamaModel } from "@/lib/ollama";

interface AppSidebarProps {
  models: OllamaModel[];
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function AppSidebar({
  models,
  selectedModel,
  onModelChange,
}: AppSidebarProps) {
  return (
    <Sidebar className="bg-slate-900 border-r border-slate-800 text-slate-100">
      <SidebarHeader className="p-4 gap-4 bg-slate-900">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Bot className="h-6 w-6 text-blue-500" />
          <span>Xtarg AI</span>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-sm font-medium hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </button>
      </SidebarHeader>

      <SidebarContent className="px-2 bg-slate-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400">
            Ollama Model
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={selectedModel}
              onValueChange={(value) => {
                if (value !== null) {
                  onModelChange(value);
                }
              }}
            >
              <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-slate-200 focus:ring-blue-500">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                {models.map((model) => (
                  <SelectItem key={model.name} value={model.name}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400">
            History
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="hover:bg-slate-800/80 text-slate-300">
                  <MessageSquare className="h-4 w-4 text-slate-400" />
                  <span className="truncate">Local Model Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Cpu className="h-4 w-4 text-emerald-400" />
          <span>Ollama Connected</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
