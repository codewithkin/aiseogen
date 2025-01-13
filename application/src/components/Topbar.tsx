import Link from "next/link";

export default function Topbar() {
  return (
    <section className="w-full px-2 py-2 md:px-8 md:py-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-2xl font-semibold">AISEOgen</h2>

        <article className="flex items-center justify-center gap-2">
            <Link className="px-4 py-2 transition duration-300 hover:bg-blue-500 hover:text-white rounded-xl border-2 border-blue-500 text-blue-500" href="mailto:support@aiseogen.com">
                Report a bug
            </Link>
            <Link className="px-4 py-2 transition duration-300 hover:bg-purple-700 rounded-xl bg-purple-500 text-white" href="mailto:support@aiseogen.com">
                Request a feature
            </Link>
        </article>
    </section>
  )
}
