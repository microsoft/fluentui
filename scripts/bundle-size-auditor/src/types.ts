export interface Config {
  extraEntries?: string[];
  /**
   * Webpack will remove any unused import as a dead code (tree shaking).
   * Thus we are creating temporary JS files with top-level component imports
   * and console logging them. This will ensure that the code is active
   * and that webpack bundles it correctly.
   */
  createFixtures: (options: { writeFixture: (entryName: string, content: string) => void }) => string[];
}
