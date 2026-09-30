export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="mx-auto max-w-6xl px-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Aether Wellness. All rights reserved.
      </div>
    </footer>
  );
}
