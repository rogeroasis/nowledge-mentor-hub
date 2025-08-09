import React, { useEffect } from 'react';
import Header from '@/components/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqItems } from '@/data/mockFaq';

const FAQ = () => {
  useEffect(() => {
    document.title = 'Nowledge FAQs – How it works';
    const desc = 'Answers about mentors, booking, pricing, confidentiality, and becoming a mentor.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + '/faq');
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <header className="border-b-2 border-black">
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Frequently Asked Questions</h1>
          <p className="text-black/70">Everything you need to know about Nowledge.</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-8">
        <Accordion type="single" collapsible>
          {faqItems.map((item, idx) => (
            <AccordionItem key={idx} value={"item-" + idx}>
              <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
};

export default FAQ;
