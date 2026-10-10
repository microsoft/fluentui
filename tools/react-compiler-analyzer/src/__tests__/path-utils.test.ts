import { toPosixPath, toWorkspacePath } from '../path-utils';

describe('path utilities', () => {
  it('uses one canonical representation for workspace-relative paths', () => {
    expect(toWorkspacePath('/workspace', '/workspace')).toBe('.');
    expect(toWorkspacePath('/workspace', '/workspace/src/A.tsx')).toBe('src/A.tsx');
  });

  it('normalizes Windows separators', () => {
    expect(toPosixPath('src\\components\\A.tsx')).toBe('src/components/A.tsx');
  });
});
