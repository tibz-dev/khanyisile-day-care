type LogoProps = {
  className?: string;
};

function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`inline-flex max-w-full items-center gap-3 ${className}`}>
      <img
        src="/khanyisile-logoo.png"
        alt="Khanyisile buffalo emblem"
        width={80}
        height={80}
        className="size-20 shrink-0 rounded-xl bg-white object-contain"
      />

      <div className="min-w-0">
        <p className="font-heading text-2xl leading-tight font-bold text-maroon">
          Khanyisile
        </p>

        <p className="text-xs leading-relaxed font-medium text-charcoal sm:text-sm">
          Child Care &amp; Extra Classes
        </p>
      </div>
    </div>
  );
}

export default Logo;