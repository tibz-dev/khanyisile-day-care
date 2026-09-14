import Logo from './Logo';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Contact Us', href: '#contact' },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-maroon/10 bg-white">
      <div className="page-container py-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Logo />

            <p className="mt-5 text-sm text-charcoal">
              Ga Matshwi, Limpopo, South Africa
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-xl font-bold text-maroon">Explore</h2>

            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded px-1 text-sm font-medium text-maroon underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-maroon/10 pt-6">
          <p className="text-sm leading-relaxed text-charcoal">
            © {currentYear} Khanyisile Child Care &amp; Extra Classes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;