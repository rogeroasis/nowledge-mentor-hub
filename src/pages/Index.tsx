
import React from "react";
import Header from "@/components/Header";
import MentorCard from "@/components/MentorCard";
import SEO from "@/components/SEO";

const Index = () => {
  const handleBookMentor = (mentorName: string) => {
    console.log(`Booking session with ${mentorName}`);
    // This will be implemented when we add the booking system
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SEO title="Nowledge — Learn from the best mentors" description="Connect with industry experts and accelerate your career growth with personalized mentorship." canonicalPath="/" />
      
      {/* Hero Section */}
      <section className="py-20 px-8 text-center bg-gradient-to-b from-primary/5 to-transparent">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6" style={{ letterSpacing: "-0.04em" }}>
          LEARN FROM THE<br />
          <span className="text-muted-foreground">BEST MENTORS</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Connect with industry experts and accelerate your career growth with personalized mentorship
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/mentors"
            className="px-8 py-4 bg-primary text-primary-foreground rounded font-bold text-lg shadow-sm hover:shadow-none transition"
            style={{ letterSpacing: "-0.03em" }}
          >
            FIND A MENTOR
          </a>
          <a
            href="/tasks"
            className="px-8 py-4 border-2 border-primary text-primary rounded font-bold text-lg shadow-sm hover:shadow-none transition"
            style={{ letterSpacing: "-0.03em" }}
          >
            BROWSE TASKS
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-12">HOW IT WORKS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Browse Mentors & Tasks</h3>
              <p className="text-gray-600">Find experienced professionals or tasks that match your expertise</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Connect & Apply</h3>
              <p className="text-gray-600">Book mentoring sessions or apply for tasks</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Learn & Earn</h3>
              <p className="text-gray-600">Get mentored or share your expertise and earn money</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentors Preview */}
      <section id="mentors" className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-4">FEATURED MENTORS</h2>
            <p className="text-muted-foreground text-lg">Learn from industry leaders and experts</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <MentorCard
              name="Sarah Chen"
              company="Google"
              role="Senior Product Manager"
              bio="10+ years in product management at top tech companies. Helped launch products used by millions of users worldwide."
              onBook={() => handleBookMentor("Sarah Chen")}
            />
            <MentorCard
              name="Marcus Johnson"
              company="Tesla"
              role="Lead Software Engineer"
              bio="Full-stack engineer with expertise in AI/ML. Led teams building scalable systems for autonomous vehicles."
              onBook={() => handleBookMentor("Marcus Johnson")}
            />
            <MentorCard
              name="Emily Rodriguez"
              company="Goldman Sachs"
              role="VP of Marketing"
              bio="Marketing executive with 12+ years experience. Expert in brand strategy and digital marketing campaigns."
              onBook={() => handleBookMentor("Emily Rodriguez")}
            />
          </div>

          <div className="text-center">
            <a
              href="/mentors"
              className="px-8 py-3 bg-accent text-accent-foreground rounded font-bold shadow-sm hover:shadow-none transition"
            >
              VIEW ALL MENTORS
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-primary text-primary-foreground text-center">
        <h2 className="text-4xl font-extrabold mb-6">READY TO START YOUR JOURNEY?</h2>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who have accelerated their careers with expert mentorship
        </p>
        <a
          href="/auth"
          className="px-8 py-4 bg-background text-foreground border border-border rounded font-bold text-lg shadow-sm hover:shadow-none transition"
        >
          GET STARTED TODAY
        </a>
      </section>
    </div>
  );
};

export default Index;
