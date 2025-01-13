import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

export function SubmitButton({pending}: {pending: boolean}) {

  return (
    <Button className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white hover:bg-gradient-to-tr hover:from-purple-500 hover:to-blue-500 transition-all duration-300">
        {pending ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
      {pending ? "Generating..." : "Generate"}
    </Button>
  )
}