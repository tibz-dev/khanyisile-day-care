type ParentReview = {
  id: string;
  name: string;
  quote: string;
};

const reviews: ParentReview[] = [];

function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="scroll-mt-36 bg-cream py-14 sm:py-20"
    >
      <div className="page-container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-maroon uppercase">
            Our parent community
          </p>

          <h2
            id="testimonials-title"
            className="mt-4 text-3xl font-bold text-maroon sm:text-4xl lg:text-5xl"
          >
            Your experiences matter.
          </h2>

          <p className="mt-5 text-base leading-relaxed sm:text-lg">
            Every family has a story. We look forward to sharing the experiences
            of parents who are part of our Khanyisile community.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="min-w-0 lg:col-span-2">
            {reviews.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {reviews.map((review) => (
                  <figure
                    key={review.id}
                    className="flex h-full flex-col rounded-3xl border border-maroon/10 bg-white p-6 sm:p-8"
                  >
                    <span
                      aria-hidden="true"
                      className="font-heading text-6xl leading-none text-maroon"
                    >
                      &ldquo;
                    </span>

                    <blockquote className="mt-3 flex-1 leading-relaxed">
                      <p>{review.quote}</p>
                    </blockquote>

                    <figcaption className="mt-6 border-t border-maroon/10 pt-5 font-semibold text-maroon">
                      {review.name}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="flex h-full flex-col items-start justify-center rounded-3xl border border-maroon/10 bg-white p-7 sm:p-10">
                <span
                  aria-hidden="true"
                  className="flex size-16 items-center justify-center rounded-2xl bg-coral"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-8 text-maroon"
                    focusable="false"
                  >
                    <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
                    <path d="M8 10h8M8 14h5" />
                  </svg>
                </span>

                <h3 className="mt-6 text-2xl font-bold text-maroon sm:text-3xl">
                  A space for your stories
                </h3>

                <p className="mt-4 max-w-xl leading-relaxed">
                  We have not published any parent reviews yet. When families
                  share their experiences, you will find them here.
                </p>

                <p className="mt-5 inline-flex rounded-full bg-cream px-4 py-2 text-sm font-medium text-maroon">
                  Parent reviews coming soon
                </p>
              </div>
            )}
          </div>

          <aside
            aria-labelledby="feedback-title"
            className="flex flex-col rounded-3xl border border-coral bg-white p-7 sm:p-8"
          >
            <span
              aria-hidden="true"
              className="h-2 w-12 rounded-full bg-gold"
            />

            <h3
              id="feedback-title"
              className="mt-6 text-2xl font-bold text-maroon"
            >
              Already part of the family?
            </h3>

            <p className="mt-4 leading-relaxed">
              We would love to hear what is going well and where we can improve.
              Send your feedback directly to our team.
            </p>

            <div className="mt-auto pt-7">
              <a
                href="mailto:info@kccaec.co.za?subject=Parent%20feedback"
                className="button button-primary w-full"
              >
                Share Your Feedback
              </a>

              <p className="mt-4 text-sm leading-relaxed">
                Your email goes to our team and is not automatically published.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;