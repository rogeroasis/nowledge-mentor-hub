
import Header from "@/components/Header";

// Editorial homepage inspired by reference images

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-white text-black font-sans">
      <Header />
      {/* HERO SECTION */}
      <section className="w-full max-w-6xl mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between border-b border-black gap-8 md:gap-12">
        {/* Illustration Placeholder */}
        <div className="flex-shrink-0 flex justify-center md:w-[360px] w-full">
          {/* Replace with actual SVG/drawing later */}
          <div className="h-72 w-72 bg-dot-pattern rounded-full border-2 border-black flex items-center justify-center">
            {/* Use illustration here */}
            <span className="text-6xl font-extrabold">👨‍💼</span>
          </div>
        </div>
        {/* Hero Text */}
        <div className="flex-1 text-left space-y-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight" style={{ letterSpacing: "-0.03em" }}>
            GOOGLE ADS? THAT'S LIKE TIGHTENING MY SHOELACES.
          </h2>
          <div className="text-black/90 text-lg font-medium leading-snug">
            Victor Navarro, Head of Digital Paid Media at VMLY&R<br />
            Clients include: Uber, Movistar, Sony
          </div>
          <div className="flex flex-col md:flex-row gap-3 flex-wrap mt-3 font-bold">
            <a href="#" className="px-6 py-2 rounded bg-black text-white shadow-[3px_3px_0_0_#000] hover:shadow-none transition">BOOK ONE HOUR WITH VICTOR</a>
            <a href="#" className="px-6 py-2 rounded bg-black text-white shadow-[3px_3px_0_0_#000] hover:shadow-none transition">KNOW MORE MENTORS</a>
            <a href="#" className="px-6 py-2 rounded bg-black text-white shadow-[3px_3px_0_0_#000] hover:shadow-none transition">WHAT THE HECK IS NOWLEDGE?</a>
          </div>
          <p className="mt-6 text-black/70 font-medium">
            Serious professionals, no bs internet gurus. Find the right to accompany you in your project.
          </p>
        </div>
      </section>
      {/* VALUE SECTION */}
      <section className="w-full max-w-5xl mx-auto px-8 py-20 text-center border-b border-black">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-5" style={{ letterSpacing: "-0.03em" }}>
          TIRED OF BASIC COURSES AND INTERNET GURUS?
        </h2>
        <h3 className="text-xl md:text-2xl font-extrabold mb-7" style={{ letterSpacing: "-0.02em" }}>
          TALK TO SOMEONE WHO ACTUALLY DOES WHAT YOU NEED FOR A LIVING
        </h3>
        <div className="text-black text-lg font-medium mb-6 max-w-2xl mx-auto">
          One on one live and online mentorships with the best professionals in the industry.
        </div>
        <div className="text-black/80 mb-8 max-w-2xl mx-auto font-medium">
          They're busy actually doing stuff that they don't have time for TikToks and Motivational Quotes. But they have a few hours a week to help people like you solve what they need, fast.
        </div>
        <a href="#" className="inline-block px-8 py-3 rounded bg-black text-white font-bold shadow-[3px_3px_0_0_#000] hover:shadow-none text-lg transition">
          KNOW OUR MENTORS
        </a>
      </section>
      {/* Later: MENTOR GRID, REGISTRATION STEPS, FAQ, etc */}
      <footer className="w-full max-w-6xl mx-auto px-8 py-8 border-t border-black mt-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left text-black/60 text-sm">
        <span>© {new Date().getFullYear()} Nowledge</span>
        <span>
          For professionals & companies.
        </span>
      </footer>
    </div>
  );
};

export default Index;
