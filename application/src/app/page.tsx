"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission
    e.preventDefault()

    // Cast e.target to HTMLFormElement
    const form = e.target as HTMLFormElement
    
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        url: (form.elements.namedItem('url') as HTMLInputElement).value,
        description: (form.elements.namedItem('description') as HTMLInputElement).value
      })
    })

    const data = await res.json();
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 md:px-64 lg:px-80 py-10">
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

      <SubmitButton />
    </form>
  )
}
