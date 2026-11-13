import PageHero from "./PageHero";
import CtaBand from "./CtaBand";

export type Block = { h: string; p?: string[]; list?: string[] };
export default function ContentPage({ eyebrow, title, intro, blocks, cta = true, children }: { eyebrow: string; title: string; intro: string; blocks: Block[]; cta?: boolean; children?: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title}>{intro}</PageHero>
      <div className="container-x max-w-4xl space-y-12 py-16">
        {blocks.map((b) => (
          <section key={b.h}><h2 className="text-2xl font-extrabold">{b.h}</h2>
            {b.p?.map((t) => <p key={t} className="mt-3 leading-relaxed text-ink/90">{t}</p>)}
            {b.list && <ul className="mt-3 space-y-2">{b.list.map((l) => <li key={l} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />{l}</li>)}</ul>}
          </section>
        ))}
        {children}
      </div>
      {cta && <CtaBand />}
    </>
  );
}
