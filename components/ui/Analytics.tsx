"use client";
import Script from "next/script";
import { useEffect } from "react";
import { TRACKING } from "@/lib/site";
import { captureAttribution } from "@/lib/tracking";

/** Loads GTM / Google Ads only when IDs are configured. See Cookie & Tracking Notice. */
export default function Analytics() {
  useEffect(() => captureAttribution(), []);
  return (
    <>
      {TRACKING.gtmId && (
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${TRACKING.gtmId}');`}</Script>
      )}
      {TRACKING.adsId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING.adsId}`} strategy="afterInteractive" />
          <Script id="gads" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${TRACKING.adsId}');`}</Script>
        </>
      )}
    </>
  );
}
