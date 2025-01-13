import { SeoData } from "@/lib/types";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { copyToClipboard } from "./output/copyToClipboard";
import Metadata from "./output/Metadata";
import ContentSuggestions from "./output/ContentSuggestions";

interface SeoResultsProps {
  data: SeoData;
}

export function SeoResults({ data }: SeoResultsProps) {

  return (
    <div className="mt-8 space-y-6">
      <Metadata data={data} />

      <ContentSuggestions data={data} />
    </div>
  );
} 