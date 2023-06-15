export interface Config {
  extraEntries?: string[];
  createFixtures: (options: { writeFixture: (entryName: string, content: string) => void }) => string[];
}
