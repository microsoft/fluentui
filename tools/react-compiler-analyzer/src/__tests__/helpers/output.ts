export function normalizeCliOutput(captured: string[], tempDir: string): string {
  const lines = captured.map(line => line.split(tempDir).join('<TEMP>'));
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].startsWith('Scanning: ') && /^─+$/.test(lines[i + 1])) {
      lines[i + 1] = '─'.repeat(lines[i].length);
    }
  }
  return lines.join('\n');
}

export function captureConsole(method: 'log' | 'warn' | 'error', output: string[]) {
  return jest.spyOn(console, method).mockImplementation((...args: unknown[]) => {
    output.push(args.map(String).join(' '));
  });
}
import { jest } from '@jest/globals';
