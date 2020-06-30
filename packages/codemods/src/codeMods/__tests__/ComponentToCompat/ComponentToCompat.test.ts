import { Project } from 'ts-morph';
import * as Root from '../mock/compat/mockIndex';
import {
  rawCompat,
  runComponentToCompat,
  getNamedExports,
  buildCompatHash as buildHash,
  repathNamedImports,
  repathPathedImports,
} from '../../mods/ComponentToCompat/CompatHelpers';

const createComponentToCompat = (compat: rawCompat) => {
  return {
    oldPath: './mockIndex',
    newComponentPath: 'compat/Button',
    namedExports: getNamedExports(compat.namedExports),
  };
};

describe('Component to compat', () => {
  let project: Project;
  beforeEach(() => {
    project = new Project();
    project.addSourceFilesAtPaths(`${process.cwd()}/**/__tests__/mock/compat/*.tsx`);
  });

  it('correctly repaths from exact known import', () => {
    let file = project.getSourceFileOrThrow('ImportsStuff.tsx');
    let hash = buildHash([{ componentName: 'Button', namedExports: Root }], createComponentToCompat);
    repathPathedImports(file, hash);
    expect(file.getFullText()).toContain('compat/Button');
  });

  it('correctly repaths from index', () => {
    let file = project.getSourceFileOrThrow('ImportsStuff.tsx');
    let hash = buildHash([{ componentName: 'Button', namedExports: Root }], createComponentToCompat);
    repathNamedImports(file, hash, './DefaultButton');
    expect(file.getFullText()).toContain('compat/Button');
  });

  it('correctly moves all named imports from index', () => {
    let file = project.getSourceFileOrThrow('ImportsStuff.tsx');
    let hash = buildHash([{ componentName: 'Button', namedExports: Root }], createComponentToCompat);
    repathNamedImports(file, hash, './Button');

    let named = file.getImportDeclaration(d => d.getModuleSpecifierValue() === 'compat/Button')?.getNamedImports();
    named?.forEach(v => {
      expect(v.getName() === 'Button' || v.getName() === 'OtherButton').toEqual(true);
    });
    expect(named?.some(v => !!v.getAliasNode())).toEqual(true);
  });

  it('correctly moves all named imports and all other imports', () => {
    let file = project.getSourceFileOrThrow('ImportsStuff.tsx');
    let hash = buildHash([{ componentName: 'Button', namedExports: Root }], createComponentToCompat);
    runComponentToCompat(file, hash, './DefaultButton');

    let named = file.getImportDeclaration(d => d.getModuleSpecifierValue() === 'compat/Button')?.getNamedImports();
    named?.forEach(v => {
      expect(v.getName() === 'Button' || v.getName() === 'DefaultButton').toEqual(true);
    });
  });

  it('correctly removes index if no imports left', () => {
    let file = project.getSourceFileOrThrow('ImportsStuff.tsx');
    let hash = buildHash([{ componentName: 'Button', namedExports: Root }], createComponentToCompat);
    repathNamedImports(file, hash, './DefaultButton');
    expect(file.getFullText()).not.toContain('./DefaultButton');
  });

  it('correctly builds a hash map', () => {
    let hash = buildHash([{ componentName: 'Button', namedExports: Root }], createComponentToCompat);
    expect(hash.exactPathMatch['./mockIndex']).toEqual('compat/Button');
    expect(hash.namedExportsMatch['DefaultButton']).toEqual('compat/Button');
  });
});
