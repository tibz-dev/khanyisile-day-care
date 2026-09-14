function Home() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="scroll-mt-36 overflow-hidden"
    >
      <div className="page-container py-12 sm:py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="inline-flex rounded-full bg-gold px-4 py-2 text-sm font-semibold text-charcoal">
              Ga Matshwi, Limpopo
            </p>

            <h1
              id="home-title"
              className="mt-6 font-heading text-4xl leading-tight font-bold text-maroon sm:text-5xl lg:text-6xl"
            >
              Little steps.
              <br />
              Bright beginnings.
            </h1>

            <p className="mt-6 text-xl font-semibold text-charcoal">
              Welcome to Khanyisile Child Care &amp; Extra Classes.
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
              A place for young minds to explore, play, and learn. Our activities encourage
              curiosity, creativity, and growing confidence, one discovery at a time.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a href="#enrollment" className="button button-primary">
                Enroll Now
              </a>

              <a href="#contact" className="button button-outline">
                Contact Us
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div
              aria-hidden="true"
              className="absolute -top-4 -right-4 size-24 rounded-full bg-gold sm:size-32"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 size-28 rounded-full bg-coral sm:size-36"
            />

            <div className="relative rounded-3xl border border-maroon/10 bg-white p-5 shadow-sm sm:p-8">
              <img
                src="/khanyisile-logo.png"
                alt="Khanyisile Child Care & Extra Classes logo, featuring a buffalo emblem"
                width={1254}
                height={1254}
                fetchPriority="high"
                className="aspect-square w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;