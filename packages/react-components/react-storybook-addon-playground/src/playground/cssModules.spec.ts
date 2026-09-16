import { compileCssModule, findCompiledCssModule, toCssModuleSpecifier, updateCssModuleSource } from './cssModules';

const buttonCss = `
.button {
  background: var(--accent);
}
.button:hover {
  background: var(--accent-strong);
}
.demo .icon {
  width: 14px;
}
:global(.sr-only) {
  position: absolute;
}
`;

describe('cssModules', () => {
  describe('toCssModuleSpecifier', () => {
    it('maps a basename or path to the transformed story import', () => {
      expect(toCssModuleSpecifier('button.module.css')).toBe('./styles/button.module.css');
      expect(toCssModuleSpecifier('./toggle-button.module.css')).toBe('./styles/toggle-button.module.css');
    });
  });

  describe('compileCssModule', () => {
    it('hashes local classes and unwraps :global() selectors for injection', () => {
      const compiled = compileCssModule({ name: 'button.module.css', source: buttonCss });

      expect(compiled.specifier).toBe('./styles/button.module.css');
      expect(compiled.locals.button).toMatch(/^button__button--/);
      expect(compiled.locals.demo).toMatch(/^button__demo--/);
      expect(compiled.locals.icon).toMatch(/^button__icon--/);
      expect(compiled.cssText).toContain(`.${compiled.locals.button} {`);
      expect(compiled.cssText).toContain(`.${compiled.locals.button}:hover {`);
      expect(compiled.cssText).toContain(`.${compiled.locals.demo} .${compiled.locals.icon} {`);
      expect(compiled.cssText).toContain('.sr-only');
      expect(compiled.cssText).not.toContain(':global(');
      expect(compiled.cssText).not.toContain('.__PG_GLOBAL_');
    });

    it('is stable for the same source', () => {
      const first = compileCssModule({ name: 'button.module.css', source: buttonCss });
      const second = compileCssModule({ name: 'button.module.css', source: buttonCss });

      expect(first.locals).toEqual(second.locals);
      expect(first.cssText).toBe(second.cssText);
    });
  });

  describe('findCompiledCssModule', () => {
    it('matches the transformed specifier or a relative basename', () => {
      const compiled = compileCssModule({ name: 'button.module.css', source: '.root {}' });

      expect(findCompiledCssModule('./styles/button.module.css', [compiled])).toBe(compiled);
      expect(findCompiledCssModule('./button.module.css', [compiled])).toBe(compiled);
      expect(findCompiledCssModule('./missing.module.css', [compiled])).toBeUndefined();
    });
  });

  describe('updateCssModuleSource', () => {
    it('replaces the source of the named module', () => {
      const next = updateCssModuleSource(
        [
          { name: 'button.module.css', source: '.root { color: red; }' },
          { name: 'icon.module.css', source: '.icon {}' },
        ],
        'button.module.css',
        '.root { color: blue; }',
      );

      expect(next).toEqual([
        { name: 'button.module.css', source: '.root { color: blue; }' },
        { name: 'icon.module.css', source: '.icon {}' },
      ]);
    });
  });
});
