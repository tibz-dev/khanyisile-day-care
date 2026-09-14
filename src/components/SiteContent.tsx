import About from '../pages/About';
import Home from '../pages/Home';

function SiteContent() {
  return (
    <>
      <Home />
      <About />

      <div className="page-container space-y-6 py-12 sm:py-16">
        <section
          id="programs"
          aria-labelledby="programs-title"
          className="surface-card scroll-mt-36"
        >
          <h2 id="programs-title" className="text-3xl font-bold text-maroon">
            Programs &amp; Extra Classes
          </h2>
        </section>

        <section
          id="enrollment"
          aria-labelledby="enrollment-title"
          className="surface-card scroll-mt-36"
        >
          <h2 id="enrollment-title" className="text-3xl font-bold text-maroon">
            Enrollment
          </h2>

          <p className="mt-4">
            Online applications are coming soon. Contact us to enquire about enrollment.
          </p>

          <a href="tel:+27607423467" className="button button-primary mt-6">
            Call to Enquire
          </a>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-title"
          className="surface-card scroll-mt-36"
        >
          <h2 id="contact-title" className="text-3xl font-bold text-maroon">
            Let’s chat about your little one
          </h2>

          <p className="mt-4">
            Get in touch with Khanyisile Child Care &amp; Extra Classes.
          </p>

          <address className="mt-6 space-y-4 not-italic">
            <p>Ga Matshwi, Greater Letaba Municipality, Limpopo</p>

            <p>
              <a
                href="tel:+27607423467"
                className="inline-flex min-h-11 items-center rounded font-semibold text-maroon underline underline-offset-4"
              >
                060 742 3467
              </a>
            </p>

            <p>
              <a
                href="mailto:info@kccaec.co.za"
                className="inline-flex min-h-11 items-center rounded text-maroon underline underline-offset-4"
              >
                info@kccaec.co.za
              </a>
            </p>
          </address>

          <a
            href="https://wa.me/27607423467"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary mt-6"
          >
            Chat on WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>
      </div>
    </>
  );
}

export default SiteContent;