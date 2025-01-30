export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className="w-full py-4 mt-8 bg-gray-800 text-white">
      <div className="text-center">
        <p>Version 1.0</p>
        <p>Built by tinodev</p>
        <p>MIT License {date}</p>
      </div>
    </footer>
  );
}
