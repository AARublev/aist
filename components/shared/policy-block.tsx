import { ReactNode } from "react"

interface PolicyBlockProps {
    children: ReactNode
}

export function PolicyBlock({
    children,
}: PolicyBlockProps) {
    return (
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
            {children}
        </section>
    )
}