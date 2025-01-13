import { SeoData } from "@/lib/types";
import Metadata from "./output/Metadata";
import ContentSuggestions from "./output/ContentSuggestions";

interface SeoResultsProps {
  data: SeoData;
}

export function SeoResults({ data }: SeoResultsProps) {
  return (
    <div className="mt-8 space-y-6">
      <Metadata data={data} />

      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6071419245494198"
        crossOrigin="anonymous"></script>
    <ins className="adsbygoogle"
        style={{display: "block"}}
        data-ad-client="ca-pub-6071419245494198"
        data-ad-slot="9448868815"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>

      <ContentSuggestions data={data} />
    </div>
  );
} 