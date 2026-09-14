import Logo from './components/Logo';

const palette = [
  {
    name: 'Maroon',
    hex: '#7A1E2B',
    className: 'bg-maroon text-cream',
  },
  {
    name: 'Gold',
    hex: '#E8A93C',
    className: 'bg-gold text-charcoal',
  },
  {
    name: 'Coral',
    hex: '#F4A896',
    className: 'bg-coral text-charcoal',
  },
  {
    name: 'Cream',
    hex: '#FDF6EC',
    className: 'border border-charcoal/20 bg-cream text-charcoal',
  },
  {
    name: 'Charcoal',
    hex: '#2E2A26',
    className: 'bg-charcoal text-cream',
  },
];

function App() {
  return (
    <main className="page-container py-10 sm:py-16">
      <Logo />

      <section className="mt-10" aria-labelledby="design-title">
        <p className="text-sm font-semibold text-maroon">Design system preview</p>

        <h1 id="design-title" className="mt-3 max-w-3xl text-4xl font-bold text-maroon sm:text-5xl">
          A warm welcome to a world of learning.
        </h1>

        <p className="mt-5 max-w-2xl text-base sm:text-lg">
          Friendly colours, rounded headings, and clear text will give our website a warm,
          family-friendly feel.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="palette-title">
        <h2 id="palette-title" className="text-2xl font-bold text-maroon">
          Our colours
        </h2>

        <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {palette.map((colour) => (
            <li key={colour.name} className={`rounded-2xl p-5 ${colour.className}`}>
              <p className="font-semibold">{colour.name}</p>
              <p className="mt-2 text-sm">{colour.hex}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="surface-card mt-10" aria-labelledby="type-title">
        <h2 id="type-title" className="text-3xl font-bold text-maroon">
          Room to learn, play, and grow
        </h2>

        <p className="mt-4 max-w-2xl">
          Headings use Baloo 2. Paragraphs use Poppins, with comfortable spacing for reading on
          phones, tablets, and larger screens.
        </p>

        <h3 className="mt-8 text-xl font-bold text-maroon">Button styles</h3>

        <p className="mt-2 text-sm">
          These are visual samples. They do not submit forms or navigate yet.
        </p>

        <div className="mt-5 flex flex-wrap gap-4">
          <button type="button" className="button button-primary">
            Primary button
          </button>

          <button type="button" className="button button-secondary">
            Secondary button
          </button>

          <button type="button" className="button button-outline">
            Outline button
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
