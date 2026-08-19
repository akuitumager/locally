import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between rounded-md border border-orange-500 bg-slate-700 px-5">
      <div>
        <h1>Locally</h1>
      </div>
      <div className="flex flex-row gap-10">
        <Select defaultValue="qwen">
          <SelectTrigger className="w-40 border-slate-900">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="qwen">Qwen</SelectItem>
            <SelectItem value="llama">Llama</SelectItem>
          </SelectContent>
        </Select>

        <Button className="bg-orange-600 hover:bg-orange-700 size-10">
          <Image src="/settings-3110.svg" width={15} height={15} alt="setting" />
        </Button>
      </div>
    </header>
  );
};
