import { getDependencies } from './getDepdencies';

describe('getDependencies', () => {
  it('should find all dependencies in a file', () => {
    const code = `
      import { stuff } from 'dependency';
      import * as allStuff from 'dependency1';
      import { moreStuff } from '@dependency/dependency';
      import {
        someOtherStuff,
      } from "@multiline/importDouble";
      import {
        someOtherStuff,
      } from '@multiline/import';
    `;
    const deps = getDependencies(code, {}, {});

    expect(deps).toEqual({
      '@dependency/dependency': 'latest',
      '@multiline/importDouble': 'latest',
      '@multiline/import': 'latest',
      dependency: 'latest',
      dependency1: 'latest',
    });
  });

  it('should ignore separate entrypoints', () => {
    const code = `
      import { stuff } from 'dependency/unstable';
      import { moreStuff } from 'dependency/unstable/component';
      import { moreStuff2 } from '@dependency/unstable';
      import { moreStuff3 } from '@dependency/unstable/component';
    `;
    const deps = getDependencies(code, {}, {});

    expect(deps).toEqual({
      dependency: 'latest',
      '@dependency/unstable': 'latest',
    });
  });

  it('versions in optionalDependencies should win ', () => {
    const code = `
      import { stuff } from 'dependency';
    `;
    const deps = getDependencies(code, {}, { dependency: '1.0.0' });

    expect(deps).toEqual({
      dependency: '1.0.0',
    });
  });

  it('versions in requiredDependencies should win ', () => {
    const code = `
      import { stuff } from 'dependency';
    `;
    const deps = getDependencies(code, { dependency: '1.0.0' }, {});

    expect(deps).toEqual({
      dependency: '1.0.0',
    });
  });

  it('versions in requiredDependencies should win ', () => {
    const code = `
      import { stuff } from 'dependency';
    `;
    const deps = getDependencies(code, { required: '1.0.0' }, {});

    expect(deps).toEqual({
      dependency: 'latest',
      required: '1.0.0',
    });
  });
});
