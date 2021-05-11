import { Project } from 'ts-morph';
import * as Root from '../mock/compat/mockIndex';
import {
  RawCompat,
  runComponentToCompat,
  getNamedExports,
  buildCompatHash as buildHash,
  repathNamedImports,
  repathPathedImports,
} from '../../mods/componentToCompat/compatHelpers';

const createComponentToCompat = (compat: RawCompat) => {
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
    project.addSourceFilesAtPaths(`${process.cwd()}/**/tests/mock/compat/*.tsx`);
  });

  it('correctly repaths from exact known import', () => {
    const file = project.getSourceFileOrThrow('ImportsStuff.tsx');
    const hash = buildHash([{ componentName: 'Button', namedExports: Object.keys(Root) }], createComponentToCompat);
    repathPathedImports(file, hash.exactPathMatch);
    const imps = file.getImportDeclarations();
    expect(imps.some(dec => dec.getModuleSpecifierValue() === 'compat/Button')).toEqual(true);
  });

  it('correctly repaths from index', () => {
    const file = project.getSourceFileOrThrow('ImportsStuff.tsx');
    const hash = buildHash([{ componentName: 'Button', namedExports: Object.keys(Root) }], createComponentToCompat);
    repathNamedImports(file, hash.namedExportsMatch, './DefaultButton');
    const repathed = file.getImportDeclaration(d => d.getModuleSpecifierValue() === 'compat/Button');
    expect(repathed).toBeTruthy();
  });

  it("correctly repaths and leaves named imports that don't match", () => {
    const file = project.getSourceFileOrThrow('ImportsStuff.tsx');
    const hash = buildHash([{ componentName: 'Button', namedExports: ['Button'] }], createComponentToCompat);
    repathNamedImports(file, hash.namedExportsMatch, './Button');
    const repathed = file.getImportDeclaration(d => d.getModuleSpecifierValue() === 'compat/Button');
    expect(repathed).toBeTruthy();
    const oldImport = file.getImportDeclaration(d => d.getModuleSpecifierValue() === './Button');
    expect(oldImport).toBeTruthy();
    const named = oldImport?.getNamedImports();
    expect(named?.length).toEqual(1);
    expect(named![0].getName()).toEqual('OtherButton');
  });

  it('correctly moves all named imports from index', () => {
    const file = project.getSourceFileOrThrow('ImportsStuff.tsx');
    const hash = buildHash([{ componentName: 'Button', namedExports: Object.keys(Root) }], createComponentToCompat);
    repathNamedImports(file, hash.namedExportsMatch, './Button');

    const named = file.getImportDeclaration(d => d.getModuleSpecifierValue() === 'compat/Button')?.getNamedImports();
    named?.forEach(v => {
      expect(v.getName() === 'Button' || v.getName() === 'OtherButton').toEqual(true);
    });
    expect(named?.some(v => !!v.getAliasNode())).toEqual(true);
  });

  it('correctly moves all named imports and all other imports', () => {
    const file = project.getSourceFileOrThrow('ImportsStuff.tsx');
    const hash = buildHash([{ componentName: 'Button', namedExports: Object.keys(Root) }], createComponentToCompat);
    runComponentToCompat(file, hash, './DefaultButton');

    const named = file.getImportDeclaration(d => d.getModuleSpecifierValue() === 'compat/Button')?.getNamedImports();
    named?.forEach(v => {
      expect(v.getName() === 'Button' || v.getName() === 'DefaultButton').toEqual(true);
    });
  });

  it('correctly removes index if no imports left', () => {
    const file = project.getSourceFileOrThrow('ImportsStuff.tsx');
    const hash = buildHash([{ componentName: 'Button', namedExports: Object.keys(Root) }], createComponentToCompat);
    repathNamedImports(file, hash.namedExportsMatch, './DefaultButton');
    expect(file.getFullText()).not.toContain('./DefaultButton');
  });

  it('correctly builds a hash map', () => {
    const hash = buildHash([{ componentName: 'Button', namedExports: Object.keys(Root) }], createComponentToCompat);
    expect(hash.exactPathMatch['./mockIndex']).toEqual('compat/Button');
    expect(hash.namedExportsMatch.DefaultButton).toEqual('compat/Button');
  });
});
