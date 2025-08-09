export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorAvatar?: string;
  date: string; // ISO
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: 'bp1',
    title: 'How to run a rapid GTM experiment in 48 hours',
    slug: 'rapid-gtm-experiment-48h',
    excerpt: 'A step-by-step playbook used by operators at high-growth startups to validate messaging and channels fast.',
    content: 'Operators share a lightweight framework to design, launch, and learn from GTM experiments without bloated processes. From hypothesis design to post-mortem.',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=60',
    author: 'Camila Duarte',
    authorAvatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=256&q=60',
    date: new Date().toISOString(),
    tags: ['Growth', 'GTM', 'Playbooks'],
  },
  {
    id: 'bp2',
    title: 'Designing product metrics that actually drive behavior',
    slug: 'product-metrics-that-matter',
    excerpt: 'North Stars, guardrails, and leading indicators—how to pick the right ones for your stage.',
    content: 'A practical guide to crafting metric systems that align teams and avoid vanity traps. With templates used at unicorns and early-stage companies.',
    coverImage: 'https://images.unsplash.com/photo-1551281044-8b89e82fbb52?auto=format&fit=crop&w=1400&q=60',
    author: 'Diego Fernández',
    authorAvatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=256&q=60',
    date: new Date(Date.now() - 864e5 * 3).toISOString(),
    tags: ['Product', 'Metrics'],
  },
  {
    id: 'bp3',
    title: 'Hiring your first data scientist: a founder’s guide',
    slug: 'first-data-scientist-founder-guide',
    excerpt: 'What to look for, what to avoid, and how to structure the first 90 days.',
    content: 'From scoping the role to balancing research and delivery, this guide distills lessons from 30+ early data hires.',
    coverImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=60',
    author: 'Nora Almeida',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=60',
    date: new Date(Date.now() - 864e5 * 7).toISOString(),
    tags: ['Data', 'Hiring'],
  },
  {
    id: 'bp4',
    title: 'Marketing ops stack for 2025: lean, fast, measurable',
    slug: 'marketing-ops-stack-2025',
    excerpt: 'The battle-tested stack used by fractional CMOs and growth advisors across stages.',
    content: 'A curated set of tools and workflows to keep your marketing machine focused on outcomes, not busywork.',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=60',
    author: 'Rafael Campos',
    authorAvatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=60',
    date: new Date(Date.now() - 864e5 * 11).toISOString(),
    tags: ['Marketing', 'Ops'],
  },
  {
    id: 'bp5',
    title: 'Legal checklists for SaaS founders: ship with confidence',
    slug: 'legal-checklists-saas',
    excerpt: 'From DPAs to SOC 2 and IP—what you need, when you need it, by stage.',
    content: 'Clarity on the noisy legal landscape, with checklists and explainers from seasoned legal counsels.',
    coverImage: 'https://images.unsplash.com/photo-1555375771-14b2a63968f0?auto=format&fit=crop&w=1400&q=60',
    author: 'María del Mar Ríos',
    authorAvatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=256&q=60',
    date: new Date(Date.now() - 864e5 * 15).toISOString(),
    tags: ['Legal', 'Compliance'],
  },
  {
    id: 'bp6',
    title: 'From idea to pilot: 30-day product discovery plan',
    slug: '30-day-product-discovery',
    excerpt: 'A pragmatic plan to align stakeholders and de-risk assumptions fast.',
    content: 'Used by fractional PMs to help teams find traction without analysis paralysis.',
    coverImage: 'https://images.unsplash.com/photo-1529336953121-ad3b8f1a5d67?auto=format&fit=crop&w=1400&q=60',
    author: 'Aisha Khan',
    authorAvatar: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=256&q=60',
    date: new Date(Date.now() - 864e5 * 20).toISOString(),
    tags: ['Product', 'Discovery'],
  },
  {
    id: 'bp7',
    title: 'Finance for operators: runway, burn, and unit economics',
    slug: 'finance-for-operators',
    excerpt: 'The core financial concepts every operator should master to drive outcomes.',
    content: 'Simple frameworks and spreadsheets used by finance advisors to keep teams grounded.',
    coverImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1400&q=60',
    author: 'Jorge Salinas',
    authorAvatar: 'https://images.unsplash.com/photo-1542326237-94b1c5a538d1?auto=format&fit=crop&w=256&q=60',
    date: new Date(Date.now() - 864e5 * 27).toISOString(),
    tags: ['Finance', 'SaaS'],
  },
  {
    id: 'bp8',
    title: 'Scaling engineering without breaking velocity',
    slug: 'scaling-eng-velocity',
    excerpt: 'Team topology, code ownership, and process—what actually works.',
    content: 'Lessons from engineering directors who kept speed while maturing processes.',
    coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=60',
    author: 'Lin Nguyen',
    authorAvatar: 'https://images.unsplash.com/photo-1545996124-0501ebae84d0?auto=format&fit=crop&w=256&q=60',
    date: new Date(Date.now() - 864e5 * 34).toISOString(),
    tags: ['Engineering', 'Scaling'],
  },
];
