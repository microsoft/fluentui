import { Project } from 'ts-morph';
import * as Root from '../mock/compat/ExportsComponents';
import Component, { __forTest } from '../../mods/ComponentToCompat/ComponentToCompat';

const createComponentToCompat = (componentName: string, exports: { [key: string]: any }) => {
  return {
    componentName: componentName,
    oldPath: './ExportsComponents',
    newComponentPath: 'compat/Button',
    namedExports: __forTest.getNamedExports(exports),
  };
};

describe('Component to compat', () => {
  let project = new Project();
  project.addSourceFilesAtPaths(`${process.cwd()}/**/__tests__/mock/compat/*.tsx`);
  it('correctly repaths from index', () => {
    let file = project.getSourceFileOrThrow('ImportsStuff.tsx');
    (Component as any).run(file, [{ component: 'Button', exports: Root }], createComponentToCompat);
    expect(file.getFullText()).toContain('compat/Button');
  });
});
