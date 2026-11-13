import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Prose from "@/components/ui/Prose";
import { getLegal, legalDocs } from "@/lib/legal";

export const dynamicParams = false;
export const generateStaticParams = () => legalDocs.map((d) => ({ slug: d.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = getLegal((await params).slug);
  return d ? { title: d.title, description: d.description, alternates: { canonical: `/legal/${d.slug}` } } : {};
}
export default async function Legal({ params }: { params: Promise<{ slug: string }> }) {
  const d = getLegal((await params).slug);
  if (!d) notFound();
  return (
    <>
      <PageHero eyebrow="Legal" title={d.title} crumbs={[["Home", "/"], ["Legal", `/legal/${d.slug}`]]}>{d.description}</PageHero>
      <div className="container-x max-w-3xl py-14">
        <p className="mb-6 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">Draft document. Last updated: {d.updated}. Bracketed items require confirmation and legal review before launch.</p>
        <Prose sections={d.sections} />
      </div>
    </>
  );
}
