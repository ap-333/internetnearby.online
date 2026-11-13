import { faqs } from "@/data/faqs";
export default function Faq({ items = faqs, schema = true }: { items?: typeof faqs; schema?: boolean }) {
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="mx-auto max-w-3xl divide-y divide-line rounded-2xl border border-line bg-white shadow-card">
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
      {items.map((f) => (
        <details key={f.q} className="group p-5 open:bg-cloud/50">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading font-bold text-navy">
            {f.q}<span aria-hidden className="text-xl text-blue transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 leading-relaxed text-ink/90">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
