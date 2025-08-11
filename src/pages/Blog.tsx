import React, { useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/data/mockBlog';
import SEO from "@/components/SEO";

const Blog = () => {

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Nowledge Blog',
    url: window.location.origin + '/blog',
    blogPost: blogPosts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      datePublished: p.date,
      author: { '@type': 'Person', name: p.author },
      image: p.coverImage,
      url: window.location.origin + '/blog#' + p.slug,
      description: p.excerpt,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SEO title="Nowledge Blog – Insights from vetted operators" description="Playbooks and insights from 400+ vetted operators across Growth, Product, Data, Marketing, and Legal." canonicalPath="/blog" jsonLd={jsonLd} />

      <header className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Nowledge Blog</h1>
          <p className="text-muted-foreground">Insights and playbooks from vetted operators worldwide.</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8 grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <a key={post.id} href={"/blog#" + post.slug} className="block group focus:outline-none">
            <Card className="border border-border shadow-sm group-hover:shadow-md transition-shadow overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{post.author}</span>
                  <span className="text-black/60">{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <Badge key={t} variant="outline" className="border-border text-xs">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </main>
    </div>
  );
};

export default Blog;
