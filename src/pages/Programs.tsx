const programs = [
  {
    number: '01',
    title: 'Full-Day Childcare',
    badge: 'All children welcome',
    description:
      'Care for your little one throughout the day, with a warm welcome and space to play, explore, and grow.',
    features: [
      'Full-day childcare',
      'Daily and monthly care options',
      'Contact us to discuss your child’s needs',
    ],
    action: 'Enquire About Childcare',
    href: 'https://wa.me/27607423467?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20childcare.',
    colour: 'bg-coral',
  },
  {
    number: '02',
    title: 'Extra Classes',
    badge: 'All grades up to Grade 10',
    description:
      'A little extra support can make a big difference. Give your child more opportunities to understand, practise, and build confidence in their schoolwork.',
    features: [
      'All subjects covered',
      'Support for all grades up to Grade 10',
      'Contact us about class times and availability',
    ],
    action: 'Enquire About Extra Classes',
    href: 'https://wa.me/27607423467?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20extra%20classes.',
    colour: 'bg-gold',
  },
];

function Programs() {
  return (
    <section id="programs" aria-labelledby="programs-title" className="scroll-mt-36 py-14 sm:py-20">
      <div className="page-container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-maroon uppercase">
            Care and learning
          </p>

          <h2
            id="programs-title"
            className="mt-4 text-3xl font-bold text-maroon sm:text-4xl lg:text-5xl"
          >
            Little learners.
            <br />
            Growing confidence.
          </h2>

          <p className="mt-5 text-base leading-relaxed sm:text-lg">
            From full-day childcare to extra help with school subjects, discover the support that
            suits your family.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {programs.map((program) => (
            <article
              key={program.number}
              className="flex flex-col overflow-hidden rounded-3xl border border-maroon/10 bg-white"
            >
              <div className={`px-6 py-5 sm:px-8 ${program.colour}`}>
                <p className="text-sm font-semibold text-charcoal">{program.badge}</p>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="text-3xl font-bold text-maroon">{program.title}</h3>

                <p className="mt-4 leading-relaxed">{program.description}</p>

                <ul className="mt-6 space-y-3">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        focusable="false"
                        className="mt-1 size-5 shrink-0 text-maroon"
                      >
                        <path d="m5 12 4 4L19 6" />
                      </svg>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <a
                    href={program.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary w-full"
                  >
                    {program.action}
                    <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-sm">
          For fees, availability, and arrangements, call{' '}
          <a
            href="tel:+27607423467"
            className="rounded font-semibold text-maroon underline underline-offset-4"
          >
            060 742 3467
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export default Programs;
