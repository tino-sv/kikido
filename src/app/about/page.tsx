export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <h1 className="text-4xl font-bold">About me and this app</h1>
      <p className="text-lg">
        This app is built with Next.js, TypeScript, Tailwind CSS, and Clerk. It is a simple todo app that allows you to manage your todos.
      </p>
      <br/>
      <p className="text-lg">
         I'm a beginner dev, and am actually porting this site from vite + react to next.js.
      </p>
      <br/>
      <p className="text-lg">
         the name kiki comes from my cat. just thought it was cute and fun.   
      </p>
      <br/>
      <p className="text-lg">
         you can check out my github at <a href="https://github.com/tino-sv" className="text-primary hover:text-primary-hover transition-colors">https://github.com/tino-sv</a>
      </p>
      <br/>
      <p className="text-lg">
         you can also check out my portfolio at <a href="https://tinodev.vercel.app" className="text-primary hover:text-primary-hover transition-colors">https://tinodev.vercel.app</a>
      </p>
    </div>
  );
}
