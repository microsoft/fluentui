import { mkdtempSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

/** A component that the React Compiler can optimize (has useMemo). */
export const COMPILABLE_COMPONENT = `import { useMemo, useState } from 'react';

export function CompilableComponent({ items }: { items: string[] }) {
  const [count, setCount] = useState(0);
  const sorted = useMemo(() => [...items].sort(), [items]);
  return <div>{sorted.join(', ')} {count}</div>;
}
`;

/** A component with a 'use no memo' directive on a compilable function. */
export const DIRECTIVE_COMPONENT = `import { useState } from 'react';

export function DirectiveComponent({ label }: { label: string }) {
  'use no memo';
  const [count, setCount] = useState(0);
  return <div onClick={() => setCount(c => c + 1)}>{label} {count}</div>;
}
`;

export interface TempPackage {
  dir: string;
  srcDir: string;
  packageName: string;
}

/**
 * Create a temporary package directory with a package.json and src/ folder.
 * Returns the paths and package name for use in tests.
 */
export function createTempPackage(name: string): TempPackage {
  const dir = mkdtempSync(join(tmpdir(), `multi-path-${name}-`));
  const srcDir = join(dir, 'src');
  mkdirSync(srcDir, { recursive: true });
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name }));
  return { dir, srcDir, packageName: name };
}

/**
 * Write a component file into a temp package's src/ directory.
 */
export function writeComponent(pkg: TempPackage, fileName: string, content: string): string {
  const filePath = join(pkg.srcDir, fileName);
  writeFileSync(filePath, content);
  return filePath;
}
