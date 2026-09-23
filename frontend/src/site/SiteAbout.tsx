
const fraunces = { fontFamily: "'Fraunces V', Georgia, serif" };

/** About, carried over from the old portfolio in the Editorial style. */
export default function SiteAbout() {
  return (
    <section id="about" className="px-6 pb-16 md:px-16">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_1.2fr] md:gap-14">
        <h2 className="g-reveal text-4xl font-[340] leading-[1.02] tracking-[-0.04em] opacity-0 md:text-5xl" style={fraunces}>
          Engineering instincts. <em className="font-[300] text-primary">A builder’s approach.</em>
        </h2>
        <div className="g-reveal flex flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground opacity-0">
          <p>
            I’m an aerospace engineering graduate who builds AI workflows and software. Through Lumora AI, my automation consultancy, I work from the
            business problem outward: map the process, find the useful intervention, build it, and make it understandable to the people using it.
          </p>
          <p>
            At Celestica, I worked across engineering and project management, including Power BI reporting for executive stakeholders. That
            experience shapes how I approach AI: clear requirements, visible progress, and systems people can operate.
          </p>
        </div>
      </div>

    </section>
  );
}
