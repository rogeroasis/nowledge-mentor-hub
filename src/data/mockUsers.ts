export type MockUser = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  avatar: string;
  country?: string;
};

export const mockUsers: MockUser[] = [
  { id: 'u1', name: 'María González', email: 'maria.gonzalez@example.com', company: 'Kora Labs', role: 'Product Manager', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=60', country: 'MX' },
  { id: 'u2', name: 'João Pereira', email: 'joao.pereira@example.com', company: 'Nimbus', role: 'Growth Lead', avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=256&q=60', country: 'BR' },
  { id: 'u3', name: 'Aisha Khan', email: 'aisha.khan@example.com', company: 'Flowbyte', role: 'Data Scientist', avatar: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=256&q=60', country: 'PK' },
  { id: 'u4', name: 'Diego Fernández', email: 'diego.fernandez@example.com', company: 'Hiper', role: 'Head of Product', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=256&q=60', country: 'AR' },
  { id: 'u5', name: 'Chen Wei', email: 'chen.wei@example.com', company: 'Orbit', role: 'Marketing Ops', avatar: 'https://images.unsplash.com/photo-1545996124-0501ebae84d0?auto=format&fit=crop&w=256&q=60', country: 'CN' },
  { id: 'u6', name: 'Sofia Rossi', email: 'sofia.rossi@example.com', company: 'Aster', role: 'Legal Counsel', avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=256&q=60', country: 'IT' },
  { id: 'u7', name: 'Omar El-Sayed', email: 'omar.sayed@example.com', company: 'Vector', role: 'Engineering Manager', avatar: 'https://images.unsplash.com/photo-1542326237-94b1c5a538d1?auto=format&fit=crop&w=256&q=60', country: 'EG' },
  { id: 'u8', name: 'Priya Patel', email: 'priya.patel@example.com', company: 'Nova', role: 'UX Researcher', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=60', country: 'IN' },
  { id: 'u9', name: 'James O’Connor', email: 'j.oconnor@example.com', company: 'Helix', role: 'Finance Lead', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=256&q=60', country: 'IE' },
  { id: 'u10', name: 'Fatima Zahra', email: 'fatima.zahra@example.com', company: 'Pivotal', role: 'Strategy Advisor', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=60', country: 'MA' },
  { id: 'u11', name: 'Liam Wilson', email: 'liam.wilson@example.com', company: 'Quanta', role: 'Data Engineer', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=256&q=60', country: 'UK' },
  { id: 'u12', name: 'Ana Souza', email: 'ana.souza@example.com', company: 'Lumen', role: 'Community Lead', avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=256&q=60', country: 'PT' },
  { id: 'u13', name: 'Hiro Tanaka', email: 'hiro.tanaka@example.com', company: 'Kite', role: 'PMM', avatar: 'https://images.unsplash.com/photo-1545996124-0501ebae84d0?auto=format&fit=crop&w=256&q=60', country: 'JP' },
  { id: 'u14', name: 'Zanele Ndlovu', email: 'zanele.ndlovu@example.com', company: 'Aurora', role: 'Operations', avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=256&q=60', country: 'ZA' },
  { id: 'u15', name: 'Arman Petrosyan', email: 'arman.petrosyan@example.com', company: 'Sierra', role: 'Full‑stack Dev', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=256&q=60', country: 'AM' },
  { id: 'u16', name: 'Luna Rivera', email: 'luna.rivera@example.com', company: 'Apex', role: 'Brand Designer', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=60', country: 'CO' },
  { id: 'u17', name: 'Mikhail Orlov', email: 'mikhail.orlov@example.com', company: 'Stellar', role: 'Security Analyst', avatar: 'https://images.unsplash.com/photo-1542326237-94b1c5a538d1?auto=format&fit=crop&w=256&q=60', country: 'RU' },
  { id: 'u18', name: 'Noura Al‑Harbi', email: 'noura.harbi@example.com', company: 'Switch', role: 'People Ops', avatar: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=256&q=60', country: 'SA' },
  { id: 'u19', name: 'Lucía Méndez', email: 'lucia.mendez@example.com', company: 'Pulse', role: 'Copywriter', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=60', country: 'ES' },
  { id: 'u20', name: 'Noah Lee', email: 'noah.lee@example.com', company: 'North', role: 'BizOps', avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=256&q=60', country: 'SG' },
];
