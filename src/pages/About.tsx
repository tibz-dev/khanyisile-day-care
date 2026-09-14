const values = [
  {
    number: '01',
    title: 'Care comes first',
    description:
      'We believe every child deserves kindness, patience, and a sense of belonging.',
  },
  {
    number: '02',
    title: 'Curiosity matters',
    description:
      'We encourage little questions, new discoveries, and the joy of learning through play.',
  },
  {
    number: '03',
    title: 'Every child counts',
    description:
      'We value each child’s individuality and encourage them to grow at their own pace.',
  },
  {
    number: '04',
    title: 'Together we grow',
    description:
      'We believe families and educators work best together, with open communication and shared care.',
  },
];

function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-36 bg-white py-14 sm:py-20"
    >
      <div className="page-container">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold tracking-widest text-maroon uppercase">
              Rooted in our community
            </p>

            <h2
              id="about-title"
              className="mt-4 text-3xl font-bold text-maroon sm:text-4xl lg:text-5xl"
            >
              Small beginnings.
              <br />
              A world of possibility.
            </h2>

            <p className="mt-6 leading-relaxed">
              Since 2013, Khanyisile Child Care &amp; Extra Classes has been part of the Ga
              Matshwi community, helping its youngest members take their first steps into
              learning.
            </p>

            <p className="mt-4 leading-relaxed">
              Based in Ga Matshwi, within Greater Letaba Municipality in Limpopo, our centre
              is led by Principal DL Mawila. We believe a child’s early years are a time to
              explore, ask questions, make friends, and discover just how much they can do.
            </p>

            <p className="mt-4 leading-relaxed">
              From little discoveries to proud “I did it!” moments, we want learning to feel
              joyful and meaningful—for children and the families growing alongside them.
            </p>

            <div className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-cream px-5 py-4">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-maroon font-heading text-lg font-bold text-cream"
              >
                DL
              </span>

              <div>
                <p className="font-semibold text-maroon">DL Mawila</p>
                <p className="text-sm">Principal</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-coral bg-cream p-7 sm:p-10">
            <span className="inline-flex rounded-full bg-gold px-4 py-2 text-sm font-semibold text-charcoal">
              Growing together since 2013
            </span>

            <h3 className="mt-6 text-3xl font-bold text-maroon">Our mission</h3>

            <p className="mt-4 leading-relaxed">
              To nurture curious minds and confident little learners through care, play, and
              meaningful early learning, working alongside families to help every child build
              a strong foundation for the years ahead.
            </p>

            <div className="mt-7 border-t border-maroon/20 pt-7">
              <p className="font-heading text-2xl font-semibold text-maroon">
                A place to belong. A chance to discover. Room to grow.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-20">
          <h3 className="text-3xl font-bold text-maroon">The values we grow by</h3>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article
                key={value.number}
                className="rounded-2xl border border-maroon/10 bg-cream p-6"
              >
                <span
                  aria-hidden="true"
                  className="font-heading text-3xl font-bold text-maroon"
                >
                  {value.number}
                </span>

                <h4 className="mt-4 text-xl font-bold text-maroon">{value.title}</h4>

                <p className="mt-3 text-sm leading-relaxed">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;