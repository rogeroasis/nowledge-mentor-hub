import React, { useEffect } from 'react';
import Header from '@/components/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqItems } from '@/data/mockFaq';
import { Button } from '@/components/ui/button';
import SEO from "@/components/SEO";

const FAQ = () => {

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
    <div className="min-h-screen bg-background">
      <Header />
      <SEO title="Nowledge FAQs" description="Answers about mentors, booking, pricing, confidentiality, and becoming a mentor." canonicalPath="/faq" jsonLd={jsonLd} />
      <header className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">Everything you need to know about Nowledge.</p>
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

        <section className="mt-16 p-6 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-xl font-bold mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-4">We're here to help. Reach out and we'll get back within 24 hours.</p>
          <div className="flex gap-3">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <a href="mailto:hello@nowledge.app" aria-label="Email Nowledge support">Email support</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="/auth" aria-label="Go to sign in">Sign in to contact</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FAQ;
