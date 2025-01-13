import { SeoData } from "@/lib/types";
import { Button } from "../ui/button";
import { copyToClipboard } from "./copyToClipboard";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default async function ({data}: {data: SeoData}) {
    const [copied, setCopied] = useState<boolean>(false);

    return (
        <div className="rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Content Suggestions</h3>
          {
            copied ?
            <Button
            variant="outline"
            size="sm"
            onClick={() => {
              copyToClipboard(JSON.stringify("", null, 2));
              setCopied(false);
              toast("Removed Content Suggestions from clipboard")
            }}
          >
            <Check className="h-4 w-4 mr-2" />
            Copied
          </Button> :
            <Button
            variant="outline"
            size="sm"
            onClick={() =>  { 
              copyToClipboard(JSON.stringify(data.metadata, null, 2)); 
              setCopied(true)
              toast.success("Copied Content Suggestions to clipboard");
            }}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          }
        </div>
        
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="font-medium mb-2">Suggested Headings:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {data.content.headings.map((heading, index) => (
                <li key={index} className="text-sm">{heading}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Suggested Paragraphs:</h4>
            {data.content.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-sm mb-2">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    )
}