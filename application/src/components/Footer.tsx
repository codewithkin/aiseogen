import { Megaphone } from "lucide-react";
import Link from "next/link";

export default function Footer () {
    return (
    <footer className="w-full fixed bottom-0 px-2 py-2 md:px-8 md:py-4 flex justify-between items-center border-t border-gray-200">
        <p><Link className="underline" href="https://groundupmvp.com">GroundUpMVP</Link> 2025</p>

        <Link className="px-4 py-2 md:hidden transition duration-300 hover:bg-blue-500 hover:text-white rounded-xl border-2 border-blue-500 text-blue-500" href="mailto:support@aiseogen.com">
                Report a bug
            </Link>
    </footer>
    )
}