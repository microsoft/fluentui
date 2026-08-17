import { Link } from 'react-router';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Fluent UI Documentation</h1>
      <ul className="flex gap-4 underline">
        <li>
          <Link to="/react">Fluent UI React v9</Link>
        </li>
        <li>
          <Link to="/headless">Headless components</Link>
        </li>
      </ul>
    </main>
  );
}
