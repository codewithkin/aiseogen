"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SeoData } from "@/lib/types";
import { SeoResults } from "@/components/SeoResults";
import { json } from "stream/consumers";
import { toast } from "sonner";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | SeoData>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
    const form = e.target as HTMLFormElement;
    const url = (form.elements.namedItem('url') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;

    const res = await fetch(`${process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://aiseogen.com"}/api/generate`, {
        method: "POST",
        body: JSON.stringify({url, description}),
        headers: {
          "Content-Type": "application/json"
        }
    })

      const myData: {seoData: string} | null = await res.json();

      if(!myData) {
        throw new Error("No data returned from server");
      }

      if(res.status !== 200) {
        console.log("An error occured on the server");
        return toast.error("An error occured, please try again later");
      }

      const ss: SeoData = JSON.parse(myData.seoData);

      setData(ss);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return data ? <SeoResults data={data} /> : (
    <form onSubmit={handleSubmit} className="px-4 md:px-64 lg:px-80 py-10">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6071419245494198"
        crossOrigin="anonymous"></script>
    <ins className="adsbygoogle"
        style={{display: "block"}}
        data-ad-client="ca-pub-6071419245494198"
        data-ad-slot="9448868815"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    <script>
        <p>(adsbygoogle = window.adsbygoogle || []).push({})</p>
    </script>
      <h2 className="text-2xl font-semibold">Let's get started</h2>

      <article className="grid my-4 gap-1">
        <Label>Your site's url</Label>
          <Input
          name="url"
          placeholder="https://aiseogen.com"
          required  
        />
      </article>

      <article className="grid my-4 gap-1">
        <Label>Describe your site in your own words</Label>
          <Textarea
          name="description"
          placeholder="So basically this site is for an awesome AI assistant that improves your site's SEO. That's about it !"
          required  
        />
      </article>

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

      <SubmitButton pending={loading} />
    </form>
  )
}
