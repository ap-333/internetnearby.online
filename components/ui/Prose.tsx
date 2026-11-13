export default function Prose({ sections }: { sections: { h: string; p: string[]; list?: string[] }[] }) {
  return (
    <div className="prose-legal">
      {sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          {s.p.map((t, i) => <p key={i}>{t}</p>)}
          {s.list && <ul>{s.list.map((l) => <li key={l}>{l}</li>)}</ul>}
        </section>
      ))}
    </div>
  );
}
