// pages/About.js
import Head from 'next/head';
import Link from 'next/link';

const About = () => {
  return (
    <div className="flex flex-col p-6 gap-6 md:flex-row md:items-center">
  <div className="md:w-1/4">
    <img src="/profile.png" alt="Profile" className="rounded-full h-auto w-full" />
  </div>
  <div className="md:w-2/3 md:px-8">
    <p className="text-lg text-[#cbd5e1] tracking-wide">
      Hello, I'm Deepanshu Sarswat, a passionate individual with a keen interest in technology and innovation. I thrive on exploring new possibilities and transforming ideas into reality.
    </p>
    <p className="text-lg text-[#cbd5e1] tracking-wide mt-6">
      During my quest for efficient digital tools, I stumbled upon Astro Sign, a revolutionary digital signature app. Astro Sign caught my attention with its intuitive interface and robust features, offering a seamless solution for signing documents online. Its flexibility and reliability have made it my go-to tool for managing signatures effortlessly.
    </p>
    <div className="mt-6 text-lg text-[#cbd5e1] tracking-wide">
      Connect On: <Link className="text-[#93c5fd]" href="https://www.linkedin.com/in/deepanshu-sarswat-b356121a6/">Linkedin</Link>
    </div>
  </div>
</div>

  );
};

export default About;
