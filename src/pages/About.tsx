
import React from 'react';
import Header from '@/components/Header';
import { Clock, DollarSign, Users, Star, CheckCircle, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-8 text-center bg-gray-50">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6" style={{ letterSpacing: "-0.04em" }}>
          TIRED OF BASIC COURSES AND<br />
          <span className="text-gray-600">INTERNET GURUS?</span>
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          TALK TO SOMEONE WHO ACTUALLY<br />
          DOES WHAT YOU NEED FOR A LIVING
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          One on one live and online mentorships with the best professionals in the industry.
        </p>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-12">
          They're busy actually doing stuff that they don't have time for TikToks and Motivational Quotes. 
          But they have a few hours a week to help people like you, solve what they need, fast.
        </p>
        <a
          href="/mentors"
          className="px-8 py-4 bg-black text-white rounded font-bold text-lg shadow-[4px_4px_0_0_#000] hover:shadow-none transition"
        >
          KNOW OUR MENTORS
        </a>
      </section>

      {/* The Problem Section */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-8">THE OPPORTUNITY</h2>
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              According to industry experts, there are thousands of specialists with 9-6 jobs in Mexico and worldwide. 
              We consider them specialists because their skills solve problems that many other people cannot.
            </p>
            <p>
              Why? Because nothing beats years of experience and constant practice. Since they are employed specialists, 
              they are practicing what they are best at every day.
            </p>
            <p>
              In a recent survey (2021), 75% of these professionals stated they would be willing to dedicate 2 to 6 extra hours 
              to help other professionals through consulting to solve problems and get paid for this time invested.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-12">HOW NOWLEDGE WORKS</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* For Mentors */}
            <div className="bg-white p-8 rounded-lg shadow-[4px_4px_0_0_#000] border-2 border-black">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Star className="mr-3 h-6 w-6" />
                FOR MENTORS
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Keep your awesome full-time job while helping others</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Make extra money sharing your knowledge and experience</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Work by the hour - you control your schedule</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Help shape the next generation of professionals</p>
                </div>
              </div>
            </div>

            {/* For Mentees */}
            <div className="bg-white p-8 rounded-lg shadow-[4px_4px_0_0_#000] border-2 border-black">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Users className="mr-3 h-6 w-6" />
                FOR BUSINESSES & PROFESSIONALS
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Access premium talent without the premium cost</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Get junior people coached by industry pros</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Pay only for the time you need - by the hour</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Solve problems fast with real-world expertise</p>
                </div>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Browse & Connect</h3>
              <p className="text-gray-600">Find the right mentor for your specific needs or apply for tasks that match your expertise</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Book by the Hour</h3>
              <p className="text-gray-600">Schedule sessions that fit your calendar - no long-term commitments required</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Get Results</h3>
              <p className="text-gray-600">Learn from real practitioners and solve actual business problems with expert guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Case Study */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-8">REAL EXAMPLE</h2>
          <div className="bg-gray-50 p-8 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000]">
            <p className="text-lg mb-6">
              "I'm the owner of an E-Commerce business and I want to scale it online. The courses available on the internet 
              are not sufficient to solve my problem, I need a specialist who can listen to me and give me a more targeted point of view."
            </p>
            <p className="text-lg mb-6">
              I enter Nowledge and see that the E-Commerce Manager Lead from Palacio de Hierro is available and has 2 hours 
              of his time next week and I book them.
            </p>
            <p className="text-lg mb-6">
              I fill out the form with a brief description of my problem and if visual supports are possible, all the information 
              that can help so that the time we talk is as productive as possible to move into action.
            </p>
            <p className="text-lg">
              The E-Commerce Lead from Palacio de Hierro receives the brief, has half an hour to review the brief, one hour to talk 
              with me and give me clarity on how I can solve my problem, and an extra half hour to use privately or to send me 
              some additional material.
            </p>
          </div>
        </div>
      </section>

      {/* What if you fall in love section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-8">WHAT HAPPENS IF YOU CONNECT WITH YOUR MENTOR?</h2>
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              You'll probably do it, if the relationship you develop with your mentor is one of growth for both parties, 
              we can be an ally that guarantees the security of both transactions between you two, support them with both 
              agendas, and while you continue registering hours in Nowledge, these hours become points that you can exchange 
              for more hours to talk with more specialists on more topics.
            </p>
            <p>
              Maybe now that you've solved your problem, you'd like to learn something new, or chat with the CEO of one of 
              the companies you admire most.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-black text-white text-center">
        <h2 className="text-4xl font-extrabold mb-6">READY TO GET STARTED?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Whether you want to share your expertise or learn from the best, Nowledge connects you with real professionals doing real work.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/mentors"
            className="px-8 py-4 bg-white text-black rounded font-bold text-lg shadow-[4px_4px_0_0_#666] hover:shadow-none transition inline-flex items-center"
          >
            FIND A MENTOR
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a
            href="/auth"
            className="px-8 py-4 border-2 border-white text-white rounded font-bold text-lg shadow-[4px_4px_0_0_#666] hover:shadow-none transition inline-flex items-center"
          >
            BECOME A MENTOR
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
