import React, { useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/data/mockBlog';

const Blog = () => {
  useEffect(() => {
    document.title = 'Nowledge Blog – Insights from vetted operators';
    const desc = 'Playbooks and insights from 400+ vetted operators across Growth, Product, Data, Marketing, and Legal.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + '/blog');
  }, []);

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
    <div className="min-h-screen bg-white">
      <Header />

      <header className="border-b-2 border-black">
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Nowledge Blog</h1>
          <p className="text-black/70">Insights and playbooks from vetted operators worldwide.</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8 grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <a key={post.id} href={"/blog#" + post.slug} className="block group focus:outline-none">
            <Card className="border-2 border-black shadow-[4px_4px_0_0_#000] group-hover:shadow-[6px_6px_0_0_#000] transition-shadow overflow-hidden">
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
                    <Badge key={t} variant="outline" className="border-black text-xs">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
};

export default Blog;
