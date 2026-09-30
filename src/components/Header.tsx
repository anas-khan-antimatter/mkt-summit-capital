export default function Header() {
  return (
    <header className="w-full border-b border-border/40 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="text-lg font-semibold tracking-tight">Aether Wellness</a>
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <a href="/services" className="hover:text-foreground">Services</a>
          <a href="/about" className="hover:text-foreground">About</a>
          <a href="/book" className="hover:text-foreground">Book</a>
        </nav>
      </div>
    </header>
  );
}
