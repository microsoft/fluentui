import { readFile } from 'node:fs/promises';

export function getHTMLFixture(fileName: 'code-block' | 'subheadings'): Promise<string> {
  try {
    const filePath = `./__fixtures__/html/${fileName}`;
    return readFile(filePath, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to read HTML fixture: ${error instanceof Error ? error.message : String(error)}`);
  }
}
