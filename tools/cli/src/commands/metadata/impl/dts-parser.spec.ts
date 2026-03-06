import * as path from 'node:path';

import { parseDtsEntry, type ParseResult } from './dts-parser';

const FIXTURES_DIR = path.resolve(__dirname, '../__fixtures__');
const SAMPLE_DTS = path.join(FIXTURES_DIR, 'sample-button.d.ts');

describe('parseDtsEntry', () => {
  let result: ParseResult;

  beforeAll(() => {
    result = parseDtsEntry(SAMPLE_DTS);
  });

  describe('components', () => {
    it('should detect SampleButton as a component', () => {
      expect(result.components).toHaveProperty('SampleButton');
    });

    it('should extract component description', () => {
      expect(result.components.SampleButton.description).toContain(
        'SampleButton gives people a way to trigger an action',
      );
    });

    it('should extract component type signature', () => {
      expect(result.components.SampleButton.typeSignature).toContain('ForwardRefExoticComponent');
    });

    it('should extract propsType reference', () => {
      const propsType = result.components.SampleButton.propsType;
      expect(propsType).toBeDefined();
      expect(propsType).toHaveProperty('$ref');
      expect((propsType as { $ref: string }).$ref).toBe('#/categories/types/SampleButtonProps');
    });
  });

  describe('hooks', () => {
    it('should detect useSampleButton_unstable as a hook', () => {
      expect(result.hooks).toHaveProperty('useSampleButton_unstable');
    });

    it('should detect useSampleButtonStyles_unstable as a hook', () => {
      expect(result.hooks).toHaveProperty('useSampleButtonStyles_unstable');
    });

    it('should detect useToggleState as a hook', () => {
      expect(result.hooks).toHaveProperty('useToggleState');
    });

    it('should extract hook parameters', () => {
      const hook = result.hooks.useSampleButton_unstable;
      expect(hook.parameters).toHaveLength(2);
      expect(hook.parameters[0].name).toBe('props');
      expect(hook.parameters[1].name).toBe('ref');
    });

    it('should extract @param descriptions', () => {
      const hook = result.hooks.useSampleButton_unstable;
      expect(hook.parameters[0].description).toContain('User provided props');
    });

    it('should extract hook return type', () => {
      const hook = result.hooks.useSampleButton_unstable;
      expect(hook.returnType).toContain('SampleButtonState');
    });
  });

  describe('types', () => {
    it('should detect SampleButtonProps as a type (interface)', () => {
      expect(result.types).toHaveProperty('SampleButtonProps');
      expect(result.types.SampleButtonProps.kind).toBe('interface');
    });

    it('should detect SampleButtonSlots as a type (type-alias)', () => {
      expect(result.types).toHaveProperty('SampleButtonSlots');
      expect(result.types.SampleButtonSlots.kind).toBe('type-alias');
    });

    it('should detect SampleButtonSize as a type (type-alias)', () => {
      expect(result.types).toHaveProperty('SampleButtonSize');
    });

    it('should detect ButtonVariant as an enum', () => {
      expect(result.types).toHaveProperty('ButtonVariant');
      expect(result.types.ButtonVariant.kind).toBe('enum');
    });

    it('should extract interface members', () => {
      const props = result.types.SampleButtonProps;
      expect(props.members).toHaveProperty('appearance');
      expect(props.members).toHaveProperty('disabled');
      expect(props.members).toHaveProperty('size');
    });

    it('should extract member types', () => {
      const appearance = result.types.SampleButtonProps.members.appearance;
      expect(appearance.type).toContain('primary');
      expect(appearance.required).toBe(false);
    });

    it('should extract @default values', () => {
      const appearance = result.types.SampleButtonProps.members.appearance;
      expect(appearance.defaultValue).toBe("'secondary'");
    });

    it('should extract member descriptions', () => {
      const appearance = result.types.SampleButtonProps.members.appearance;
      expect(appearance.description).toContain('visual style');
    });

    it('should extract @deprecated tag', () => {
      const variant = result.types.ButtonVariant;
      expect(variant.tags).toHaveProperty('deprecated');
    });

    it('should extract enum members', () => {
      const variant = result.types.ButtonVariant;
      expect(variant.members).toHaveProperty('Primary');
      expect(variant.members).toHaveProperty('Secondary');
      expect(variant.members.Primary.defaultValue).toBe('primary');
    });
  });

  describe('others', () => {
    it('should detect sampleButtonClassNames as other (variable)', () => {
      expect(result.others).toHaveProperty('sampleButtonClassNames');
      expect(result.others.sampleButtonClassNames.kind).toBe('variable');
    });

    it('should detect renderSampleButton_unstable as other (function)', () => {
      expect(result.others).toHaveProperty('renderSampleButton_unstable');
      expect(result.others.renderSampleButton_unstable.kind).toBe('function');
      expect(result.others.renderSampleButton_unstable.parameters).toBeDefined();
      expect(result.others.renderSampleButton_unstable.parameters!.length).toBeGreaterThan(0);
      expect(result.others.renderSampleButton_unstable.returnType).toBeDefined();
    });

    it('should extract render function description', () => {
      expect(result.others.renderSampleButton_unstable.description).toContain('Renders SampleButton');
    });

    it('should extract @internal tag', () => {
      expect(result.types.SampleButtonContextValue.tags).toHaveProperty('internal');
    });
  });

  describe('importedPackages', () => {
    it('should track imported package specifiers', () => {
      expect(result.importedPackages.has('react')).toBe(true);
    });
  });

  describe('classification boundaries', () => {
    it('should not misclassify hooks as others', () => {
      for (const name of Object.keys(result.others)) {
        expect(name).not.toMatch(/^use[A-Z]/);
      }
    });

    it('should not misclassify types as others', () => {
      for (const name of Object.keys(result.others)) {
        expect(result.types).not.toHaveProperty(name);
      }
    });
  });
});
