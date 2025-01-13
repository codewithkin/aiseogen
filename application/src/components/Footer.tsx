import Link from "next/link";

export default function Footer () {
    return (
    <footer className="w-full fixed bottom-0 px-2 py-2 md:px-8 md:py-4 flex justify-between items-center border-t border-gray-200">
        <p>Copyright <Link className="underline" href="https://groundupmvp.com">GroundUpMVP</Link> 2025</p>
    </footer>
    )
}