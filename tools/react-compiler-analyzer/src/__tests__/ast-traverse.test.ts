import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

import { parseSource } from '../ast/parse';
import { walkAst } from '../ast/traverse';

describe('AST traversal lifetime', () => {
  it('preserves ordered enter/exit visits and parent identity, including nested traversals', () => {
    const parsed = parseSource('export function Example(value: string) { return value; }', 'example.ts');
    const stack: string[] = [];
    let visited = 0;
    walkAst(
      parsed.program,
      {
        enter(node, parent) {
          expect(parent?.type ?? null).toBe(stack.at(-1) ?? null);
          stack.push(node.type);
          visited++;
          if (node.type === 'ReturnStatement') {
            let nested = 0;
            walkAst(parseSource('const x = 1;', 'nested.ts').program, { enter: () => nested++ });
            expect(nested).toBeGreaterThan(1);
          }
        },
        exit(node) {
          expect(stack.pop()).toBe(node.type);
        },
      },
      parsed.parents,
    );
    expect(visited).toBeGreaterThan(8);
    expect(stack).toEqual([]);
  });

  it('does not retain discarded per-file callback closures in a native visitor cache', () => {
    const entry = resolve(__dirname, '../ast/traverse.ts');
    const child = spawnSync(
      process.execPath,
      [
        '--expose-gc',
        '-e',
        `
      const { buildSync } = require('esbuild');
      const Module = require('node:module');
      const { dirname } = require('node:path');
      const filename = ${JSON.stringify(entry)};
      const built = buildSync({
        entryPoints: [filename], bundle: true, write: false, platform: 'node',
        format: 'cjs', external: ['oxc-parser'],
      });
      const loaded = new Module(filename, module);
      loaded.paths = Module._nodeModulePaths(dirname(filename));
      loaded._compile(built.outputFiles[0].text, filename);
      const { walkAst } = loaded.exports;
      const { parseSync } = require('oxc-parser');
      global.gc();
      const before = process.memoryUsage().heapUsed;
      for (let i = 0; i < 100; i++) {
        const program = parseSync('workspace/root' + (i % 10) + '/file' + i + '.tsx',
          'export function Example(value: string) { return <div>{value}</div>; }').program;
        const payload = new Array(100000).fill(i);
        walkAst(program, { enter: node => payload.length + node.start });
      }
      global.gc();
      console.log(JSON.stringify({ retained: process.memoryUsage().heapUsed - before }));
    `,
      ],
      { encoding: 'utf8', cwd: resolve(__dirname, '../..'), timeout: 30000 },
    );
    expect(child.error).toBeUndefined();
    expect(child.status).toBe(0);
    expect(child.stderr).toBe('');
    const result: { retained: number } = JSON.parse(child.stdout);
    expect(result.retained).toBeLessThan(16 * 1024 * 1024);
  });
});
