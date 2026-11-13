// EDITABLE LEGAL DRAFTS. These are starting-point templates, not legal advice:
// have qualified counsel review them before launch. Bracketed text [LIKE THIS] marks values
// that must be confirmed. Business details are pulled from environment configuration.
import { BUSINESS, COMPANY_NAME, SITE } from "./site";

type Doc = { slug: string; title: string; description: string; updated: string; sections: { h: string; p: string[]; list?: string[] }[] };

const email = BUSINESS.email || "[SUPPORT EMAIL — to be added]";
const addr = BUSINESS.address || "[BUSINESS ADDRESS — to be added]";
const co = COMPANY_NAME;
const UPDATED = "[EFFECTIVE DATE — set at launch]";

export const legalDocs: Doc[] = [
  {
    slug: "privacy-policy", title: "Privacy Policy", description: "How InternetNearby collects, uses, shares and protects personal information.", updated: UPDATED,
    sections: [
      { h: "Who we are", p: [`${co} ("InternetNearby", "we", "us") operates ${SITE.url}. We are an independent retailer of internet services and are not an internet service provider. Contact: ${email}. Address: ${addr}.`] },
      { h: "Information we collect", p: ["We collect information you give us and information collected automatically."], list: ["Telephone calls you make to us: your phone number, the date, time and length of the call, the web page or advertisement that led to the call, and notes our specialists take. [CONFIRM: call recordings and transcripts, if used.]", "Service address and ZIP code", "Name, telephone number and optional email address", "Your stated needs (for example new connection, switching, business)", "Consent choices, with the wording shown, version and time", "Technical and campaign data: IP address, browser, pages visited, referrer, UTM parameters and advertising click identifiers such as gclid"] },
      { h: "How we use information", p: ["We use your information to answer your calls, verify service availability, contact you about your request, assist with enrollment with a provider you choose, operate and secure the website, measure advertising and improve our services. We send promotional calls or texts only if you separately opted in."] },
      { h: "How we share information", p: ["We share information with the provider you choose to enroll with, as needed to process your request; with service vendors that help us operate (hosting, communications, analytics, CRM) under confidentiality obligations; and where required by law. We do not sell personal information for money. [CONFIRM: describe any sharing for advertising purposes that may be a 'sale' or 'share' under state law.]"] },
      { h: "Telephone calls", p: ["Phone calls are our main way of helping customers. When you call, a specialist may ask for your name, service address and needs in order to verify availability. [CONFIRM: if calls are recorded or monitored, say so here and announce it at the start of every call. Some states require consent from every party to a recorded call.] Call details are used to serve your request, measure advertising and train our team, and are shared only as described in this policy."] },
      { h: "Cookies and tracking", p: ["See our Cookie & Tracking Notice for details on cookies, Google Ads and analytics, and call tracking."] },
      { h: "Your choices and rights", p: ["You may opt out of promotional calls and texts at any time (reply STOP to a text or tell us on a call). Depending on your state, you may have rights to know, access, correct, delete and opt out of certain uses of your personal information. Contact us at " + email + ". We will not discriminate against you for exercising your rights. [CONFIRM state-specific disclosures, e.g. California, with counsel.]"] },
      { h: "Retention and security", p: ["We keep lead and consent records for as long as needed for the purposes above and to meet legal obligations [SET RETENTION PERIOD]. We use technical and organizational safeguards, but no method of transmission or storage is completely secure."] },
      { h: "Children", p: ["Our services are not directed to children under 13 and we do not knowingly collect their information."] },
      { h: "Changes", p: ["We may update this policy and will post the new effective date here."] },
    ],
  },
  {
    slug: "terms-and-conditions", title: "Terms and Conditions", description: "Terms for using the InternetNearby website and services.", updated: UPDATED,
    sections: [
      { h: "About these terms", p: [`These terms govern your use of ${SITE.url} operated by ${co}. By using the site you agree to them.`] },
      { h: "What we do", p: ["InternetNearby is an independent retailer that helps customers learn about internet service options, check availability and enroll with authorized providers. We do not provide the internet service itself."] },
      { h: "Calling us", p: ["Calling InternetNearby does not obligate you to buy anything. Specialists speak for InternetNearby, an independent retailer, and will identify the provider whose service is being discussed. Pricing, speeds and availability they describe are based on information from providers and are confirmed by the provider before you enroll. [CONFIRM: call recording language.]"] },
      { h: "Provider terms", p: ["Service, pricing, promotions, equipment, installation, contracts, billing, repairs and customer support are provided by the provider, under the provider's own terms. You will be shown or told key terms before you enroll. Providers can change terms and pricing."] },
      { h: "No guarantee of availability", p: ["Information on this site is general. Availability, speeds and pricing depend on your address and are confirmed by the provider. Advertised speeds are typically maximums and actual speeds vary."] },
      { h: "Your information", p: ["You agree to give accurate information. Our use of your information is described in the Privacy Policy."] },
      { h: "Acceptable use", p: ["Do not misuse the site, attempt unauthorized access, submit false or another person's information without permission, or interfere with its operation."] },
      { h: "Intellectual property", p: ["The InternetNearby name, logo and site content belong to us. Provider names and marks belong to their owners and are used only with permission."] },
      { h: "Disclaimers and limitation of liability", p: ["The site is provided 'as is'. To the extent permitted by law, we are not liable for indirect or consequential damages, or for acts or omissions of providers. [COUNSEL TO REVIEW.]"] },
      { h: "Governing law", p: ["These terms are governed by the laws of [STATE — to be confirmed]. [COUNSEL TO REVIEW dispute resolution.]"] },
      { h: "Contact", p: [`${co}, ${addr}, ${email}.`] },
    ],
  },
  {
    slug: "customer-disclosure", title: "Customer Disclosure", description: "What InternetNearby does, what providers do, and what to confirm before you enroll.", updated: UPDATED,
    sections: [
      { h: "Who is who", p: ["InternetNearby is the retailer. The provider you choose is your internet service provider. You will have a service relationship and billing relationship with the provider."] },
      { h: "When you call us", p: ["When you call, the specialist will tell you they are with InternetNearby, an independent retailer, not with your current or prospective provider. We will tell you which provider a plan belongs to before discussing enrollment, and the final terms are disclosed by the provider before you agree. Calling is free and creates no obligation."] },
      { h: "What InternetNearby provides", p: ["Availability checks and guidance, plan information supplied by providers, help with enrollment, and assistance reaching the right provider contact."] },
      { h: "What the provider is responsible for", list: ["Delivering, installing and maintaining the service", "Pricing, promotional offers, taxes and fees", "Equipment, contracts and cancellation terms", "Billing, repairs, credits and technical support", "Final confirmation of availability at your address"], p: [] },
      { h: "Before you enroll, confirm", list: ["Monthly price and what it becomes after any promotional period", "Equipment, installation and activation charges", "Contract length and early termination terms", "Data policies or usage limits", "Expected installation date"], p: [] },
      { h: "Compensation", p: ["[CONFIRM AND DESCRIBE: InternetNearby may receive compensation from providers when customers enroll. This does not change the price you pay.]"] },
    ],
  },
  {
    slug: "authorized-retailer-disclosure", title: "Authorized Retailer Disclosure", description: "InternetNearby's relationship with internet providers and use of provider names.", updated: UPDATED,
    sections: [
      { h: "Independent authorized retailer", p: [`${co} is an independent retailer. Where this site lists a provider, it does so under a retailer or sales-agent agreement with that provider [CONFIRM: only list providers with a signed agreement].`] },
      { h: "Not a provider website", p: ["This is not the official website of any internet provider. We are not an internet service provider and do not own or operate the networks described here."] },
      { h: "Use of names and logos", p: ["Provider names, logos and marks are the property of their owners and appear only where permitted. Their appearance does not imply endorsement beyond the authorized relationship."] },
      { h: "Provider responsibility", p: ["Each provider is solely responsible for its service, network, pricing, promotions, billing, installation and support."] },
      { h: "Questions", p: [`Contact ${email}. To verify our relationship with a specific provider, [CONFIRM verification process].`] },
    ],
  },
  {
    slug: "cookie-notice", title: "Cookie and Tracking Notice", description: "How InternetNearby uses cookies, analytics, advertising and call tracking.", updated: UPDATED,
    sections: [
      { h: "What we use", p: ["We use cookies and similar technologies for essential site functions, analytics, advertising measurement (such as Google Ads conversion tracking via Google Tag Manager), and campaign attribution (UTM parameters and click identifiers kept in your browser session)."] },
      { h: "Call tracking", p: ["The telephone number shown on this website may be a tracking number, and may change depending on the page or advertisement that brought you here. When you click or call it, we may record the source page, campaign, time and your phone number with Google Ads and our call-tracking provider so we can measure advertising. It connects you to InternetNearby. [If calls are recorded, disclose it here and at the start of calls, and comply with applicable consent laws.]"] },
      { h: "Your choices", p: ["You can block or delete cookies in your browser settings, use Global Privacy Control where supported, and opt out of Google ad personalization at adssettings.google.com. [IMPLEMENT: consent banner where required by law before loading non-essential tags.]"] },
    ],
  },
  {
    slug: "telephone-sms-consent", title: "Telephone and SMS Consent", description: "Consent terms for phone calls and text messages from InternetNearby.", updated: UPDATED,
    sections: [
      { h: "When you call us", p: ["Calling InternetNearby does not require you to agree to marketing calls or texts. If you give us your number on a call, we use it to follow up on your request. Promotional calls or texts require your separate opt-in, which we will ask for clearly and never assume."] },
      { h: "Contact about your request", p: ["When you submit a request and check the first consent box, you agree that we may contact you by phone, text message or email about that request. This consent is not a condition of purchase."] },
      { h: "Optional promotional calls", p: [`If you separately check the promotional calls box, you agree that ${co} may call you at the number provided with promotional offers, including with automated technology. Consent is not required to purchase.`] },
      { h: "Optional promotional text messages", p: ["If you separately check the promotional texts box, you agree to receive recurring promotional texts. Message frequency varies. Message and data rates may apply. Reply STOP to cancel and HELP for help. Carriers are not liable for delayed or undelivered messages."] },
      { h: "Revoking consent", p: [`You may revoke consent at any time by replying STOP, telling us on a call or emailing ${email}. We will honor requests promptly.`] },
      { h: "Records", p: ["We store the consent language shown, its version, the date and time, and your IP address."] },
    ],
  },
  {
    slug: "accessibility-statement", title: "Accessibility Statement", description: "InternetNearby's commitment to an accessible website.", updated: UPDATED,
    sections: [
      { h: "Our commitment", p: ["We aim to make this website usable by everyone, and to meet WCAG 2.1 Level AA. We use semantic HTML, keyboard-operable controls, visible focus states, sufficient color contrast and text alternatives."] },
      { h: "Feedback", p: [`If you have trouble using any part of the site, or need information in another format, contact ${email}${BUSINESS.phoneDisplay ? " or " + BUSINESS.phoneDisplay : ""}. We will respond promptly and work to provide the information you need.`] },
      { h: "Ongoing work", p: ["Accessibility is an ongoing effort. [UPDATE after your formal accessibility audit.]"] },
    ],
  },
];
export const getLegal = (slug: string) => legalDocs.find((d) => d.slug === slug);
