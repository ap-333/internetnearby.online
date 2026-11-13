import Link from "next/link";
export default function NotFound() {
  return <div className="container-x py-32 text-center"><p className="eyebrow">404</p><h1 className="mt-2 text-4xl font-extrabold">We could not find that page</h1><Link href="/" className="btn btn-primary mt-8">Back to home</Link></div>;
}
