export function normalizeCliOutput(captured: string[], tempDir: string): string {
  const lines = captured.map(line => normalizeCompilerVersions(line.split(tempDir).join('<TEMP>')));
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].startsWith('Scanning: ') && /^─+$/.test(lines[i + 1])) {
      lines[i + 1] = '─'.repeat(lines[i].length);
    }
  }
  return lines.join('\n');
}

export function normalizeCompilerVersions(text: string): string {
  return text.replace(
    /Backend: Babel [^;]+; React Compiler [^;]+;/g,
    'Backend: Babel <VERSION>; React Compiler <VERSION>;',
  );
}

export function captureConsole(method: 'log' | 'warn' | 'error', output: string[]) {
  return jest.spyOn(console, method).mockImplementation((...args: unknown[]) => {
    output.push(args.map(String).join(' '));
  });
}

/** Keep diagnostics out of stdout even when Jest routes its console output through stdout. */
export async function captureJson<T>(run: () => Promise<number>): Promise<{ doc: T; code: number; stderr: string[] }> {
  const chunks: string[] = [];
  const stderr: string[] = [];
  const originalWrite = process.stdout.write;
  const originalError = console.error;

  process.stdout.write = ((chunk: string) => {
    chunks.push(String(chunk));
    return true;
  }) as typeof process.stdout.write;
  console.error = (...args: unknown[]) => {
    stderr.push(args.map(String).join(' '));
  };

  try {
    const code = await run();
    return { doc: JSON.parse(chunks.join('')) as T, code, stderr };
  } finally {
    process.stdout.write = originalWrite;
    console.error = originalError;
  }
}
import { jest } from '@jest/globals';
