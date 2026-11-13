import Link from "next/link";
export default function PageHero({ eyebrow, title, children, crumbs }: { eyebrow?: string; title: string; children?: React.ReactNode; crumbs?: [string, string][] }) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue/25 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-teal/15 blur-3xl" />
      <div className="container-x relative py-16 sm:py-20">
        {crumbs && <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60">{crumbs.map(([l, h], i) => <span key={h}>{i > 0 && " / "}<Link href={h} className="hover:text-white">{l}</Link></span>)}</nav>}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl text-4xl font-extrabold !text-white sm:text-5xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{children}</div>}
      </div>
    </section>
  );
}
