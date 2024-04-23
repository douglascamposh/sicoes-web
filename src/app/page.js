import runScraper from "./services/runScraper";

export default function Home() {
  runScraper();
  return (
    <main>
      <h1>Main page</h1>
    </main>
  );
}
