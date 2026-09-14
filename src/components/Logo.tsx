type LogoProps = {
  className?: string;
};

function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`inline-flex max-w-full items-center gap-3 ${className}`}>
      <span
        aria-hidden="true"
        className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-maroon font-heading text-4xl font-bold text-cream"
      >
        K
      </span>

      <div className="min-w-0">
        <p className="font-heading text-2xl leading-tight font-bold text-maroon">Khanyisile</p>

        <p className="text-xs leading-relaxed font-medium text-charcoal sm:text-sm">
          Day Care and Extra Classes
        </p>
      </div>
    </div>
  );
}

export default Logo;
