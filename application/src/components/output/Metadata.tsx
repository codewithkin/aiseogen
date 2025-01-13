"use client";
import { Check, Copy } from "lucide-react";
import { Button } from "../ui/button";
import { copyToClipboard } from "./copyToClipboard";
import { useState } from "react";
import { toast } from "sonner";

export default function Metadata ({data}: {data: any}) {
  const [copied, setCopied] = useState<boolean>(false);

    return (
        <div className="rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Metadata</h3>
          {
            copied ?
            <Button
            variant="outline"
            size="sm"
            className="bg-green-400 text-white"
            onClick={() => {
              copyToClipboard(JSON.stringify("", null, 2));
              setCopied(false);
              toast("Removed Metadata from Clipboard");
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
              toast.success("Copied Metadata to clipboard");
            }}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          }
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="text-sm">
            <span className="font-medium">Title: </span>
            {data.metadata.title}
          </div>
          <div className="text-sm">
            <span className="font-medium">Meta Description: </span>
            {data.metadata.metaTags.description}
          </div>
          <div className="text-sm">
            <span className="font-medium">Keywords: </span>
            {data.metadata.metaTags.keywords}
          </div>
        </div>
      </div>
    )
}