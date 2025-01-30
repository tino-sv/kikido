export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className="w-full py-4 mt-8 bg-background-light text-text">
      <div className="text-center space-y-2">
        <p className="text-text-muted">Version 1.0</p>
        <p className="text-text-muted">Built by tinodev</p>
        <p className="text-text-muted">
          MIT License © {date}
        </p>
      </div>
    </footer>
  );
}
