import * as _ from 'lodash';
import { ResolveStylesOptions, StylesContextPerformance } from '@fluentui/react-bindings';
import { RendererRenderRule, noopRenderer } from '@fluentui/react-northstar-styles-renderer';
import {
  ComponentSlotStylesPrepared,
  ComponentVariablesObject,
  emptyTheme,
  ICSSInJSStyle,
  ThemePrepared,
} from '@fluentui/styles';

import { resolveStyles } from '../../src/styles/resolveStyles';

const testComponentStyles: ComponentSlotStylesPrepared<{}, { color: string }> = {
  root: ({ variables: v, rtl }): ICSSInJSStyle => ({
    color: v.color,
    content: `"rtl:${rtl.toString()}"`,
  }),
};

const resolvedVariables: ComponentVariablesObject = {
  color: 'red',
};

const defaultPerformanceOptions: StylesContextPerformance = {
  enableSanitizeCssPlugin: true,
  enableStylesCaching: true,
  enableVariablesCaching: true,
  enableBooleanVariablesCaching: false,
};

const resolveStylesOptions = (options?: {
  displayNames?: ResolveStylesOptions['allDisplayNames'];
  componentStyles?: Record<string, ComponentSlotStylesPrepared>;
  performance?: Partial<ResolveStylesOptions['performance']>;
  componentProps?: ResolveStylesOptions['componentProps'];
  inlineStylesProps?: ResolveStylesOptions['inlineStylesProps'];
  rtl?: ResolveStylesOptions['rtl'];
  renderRule?: RendererRenderRule;
}): ResolveStylesOptions => {
  const {
    componentStyles,
    displayNames = ['Test'],
    performance,
    componentProps = {},
    inlineStylesProps = {},
    renderRule = () => '',
    rtl = false,
  } = options || {};

  const theme: ThemePrepared = {
    ...emptyTheme,
    componentStyles: {
      [displayNames[0]]: testComponentStyles,
      ...componentStyles,
    },
  };
  return {
    theme,
    allDisplayNames: displayNames,
    primaryDisplayName: displayNames[0],
    componentProps,
    inlineStylesProps,
    rtl,
    disableAnimations: false,
    renderer: {
      ...noopRenderer,
      renderRule,
    },
    performance: { ...defaultPerformanceOptions, ...performance },
    saveDebug: () => {},
    telemetry: undefined,
  };
};

describe('resolveStyles', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('resolves styles', () => {
    const { resolvedStyles } = resolveStyles(resolveStylesOptions(), resolvedVariables);

    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
  });

  test('caches resolved styles', () => {
    jest.spyOn(testComponentStyles, 'root');
    const { resolvedStyles } = resolveStyles(resolveStylesOptions(), resolvedVariables);

    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
    expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
    expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
  });

  test('does not render classes if not fetched', () => {
    const renderRule = jest.fn();
    const { resolvedStyles } = resolveStyles(resolveStylesOptions({ renderRule }), resolvedVariables);

    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
    expect(renderRule).not.toBeCalled();
  });

  test('renders classes when slot classes getter is accessed', () => {
    const renderRule = jest.fn().mockReturnValue('a');
    const { classes } = resolveStyles(resolveStylesOptions({ renderRule }), resolvedVariables);

    expect(classes['root']).toBeDefined();
    expect(renderRule).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }), expect.anything());
  });

  test('caches rendered classes', () => {
    const renderRule = jest.fn().mockReturnValue('a');
    const { classes } = resolveStyles(resolveStylesOptions({ renderRule }), resolvedVariables);

    expect(classes['root']).toBeDefined();
    expect(renderRule).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }), expect.anything());
    expect(classes['root']).toBeDefined();
    expect(renderRule).toHaveBeenCalledTimes(1);
  });

  test('caches resolved styles for no props', () => {
    jest.spyOn(testComponentStyles, 'root');
    const options = resolveStylesOptions();
    const { resolvedStyles } = resolveStyles(options, resolvedVariables);
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables);

    expect(resolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }));
    expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
    expect(secondResolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }));
    expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
  });

  test('caches classes for no props', () => {
    const renderRule = jest.fn().mockReturnValue('a');
    const options = resolveStylesOptions({ displayNames: ['Test1'], renderRule });
    const { classes } = resolveStyles(options, resolvedVariables);
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables);

    expect(classes['root']).toBeDefined();
    expect(renderRule).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }), expect.anything());
    expect(secondClasses['root']).toBeDefined();
    expect(renderRule).toHaveBeenCalledTimes(1);
  });

  test('caches resolved styles for the same props', () => {
    jest.spyOn(testComponentStyles, 'root');
    const options = resolveStylesOptions({
      displayNames: ['Test2'],
      componentProps: { primary: true },
    });
    const { resolvedStyles } = resolveStyles(options, resolvedVariables);
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables);

    expect(resolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }));
    expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
    expect(secondResolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }));
    expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
  });

  test('caches classes for the same props', () => {
    const renderRule = jest.fn().mockReturnValue('a');
    const options = resolveStylesOptions({
      displayNames: ['Test3'],
      componentProps: { primary: true },
      renderRule,
    });
    const { classes } = resolveStyles(options, resolvedVariables);
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables);

    expect(classes['root']).toBeDefined();
    expect(renderRule).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }), expect.anything());
    expect(secondClasses['root']).toBeDefined();
    expect(renderRule).toHaveBeenCalledTimes(1);
  });

  test('handles multiple displayNames', () => {
    const options = resolveStylesOptions({
      displayNames: ['Test', 'Other'],
      componentStyles: {
        Other: { root: () => ({ background: 'pink' }) },
      },
    });

    expect(resolveStyles(options, resolvedVariables)).toHaveProperty(
      'resolvedStyles.root',
      expect.objectContaining({
        color: 'red',
        background: 'pink',
      }),
    );
  });

  test('considers props when caching resolved styles', () => {
    jest.spyOn(testComponentStyles, 'root');
    const options = resolveStylesOptions({
      displayNames: ['Test4'],
      componentProps: { primary: true },
    });
    const { resolvedStyles } = resolveStyles(options, resolvedVariables);
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(
      { ...options, componentProps: { primary: false } },
      resolvedVariables,
    );

    expect(resolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }));
    expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
    expect(secondResolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }));
    expect(testComponentStyles.root).toHaveBeenCalledTimes(2);
  });

  test('considers props when caching classes', () => {
    const renderRule = jest.fn().mockReturnValue('a');
    const options = resolveStylesOptions({
      displayNames: ['Test5'],
      componentProps: { primary: true },
      renderRule,
    });
    const { classes } = resolveStyles(options, resolvedVariables);

    options.componentProps = { primary: false };
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables);

    expect(classes['root']).toBeDefined();
    expect(renderRule).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }), expect.anything());
    expect(secondClasses['root']).toBeDefined();
    expect(renderRule).toHaveBeenCalledTimes(2);
  });

  test('does not cache styles if caching is disabled', () => {
    jest.spyOn(testComponentStyles, 'root');
    const options = resolveStylesOptions({
      performance: { enableStylesCaching: false },
    });
    const { resolvedStyles } = resolveStyles(options, resolvedVariables);
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables);

    expect(resolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }));
    expect(secondResolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }));
    expect(testComponentStyles.root).toHaveBeenCalledTimes(2);
  });

  test('does not cache classes if caching is disabled', () => {
    const renderRule = jest.fn().mockReturnValue('a');
    const options = resolveStylesOptions({
      performance: { enableStylesCaching: false },
      renderRule,
    });
    const { classes } = resolveStyles(options, resolvedVariables);
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables);

    expect(classes['root']).toBeDefined();
    expect(renderRule).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }), expect.anything());
    expect(secondClasses['root']).toBeDefined();
    expect(renderRule).toHaveBeenCalledTimes(2);
  });

  test('does not cache styles if there are inline overrides', () => {
    jest.spyOn(testComponentStyles, 'root');
    const propsInlineOverrides: ResolveStylesOptions['inlineStylesProps'][] = [
      { styles: { fontSize: '10px' } },
      { design: { left: '10px' } },
      { variables: { backgroundColor: 'yellow' } },
    ];

    const propsInlineOverridesResolvedStyles: ICSSInJSStyle[] = [
      { color: 'red', fontSize: '10px' },
      { color: 'red', left: '10px' },
      { color: 'red' },
    ];

    const propsInlineOverridesSize = propsInlineOverrides.length;

    _.forEach(propsInlineOverrides, (inlineStylesProps, idx) => {
      const options = resolveStylesOptions({
        inlineStylesProps,
        performance: { enableStylesCaching: false },
      });

      const { resolvedStyles } = resolveStyles(options, resolvedVariables);
      const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables);

      expect(resolvedStyles.root).toMatchObject(propsInlineOverridesResolvedStyles[idx]);
      expect(secondResolvedStyles.root).toMatchObject(propsInlineOverridesResolvedStyles[idx]);
      resolveStyles(options, resolvedVariables);
    });

    expect(testComponentStyles.root).toHaveBeenCalledTimes(propsInlineOverridesSize * 2);
  });

  test('does not cache classes if there are inline overrides', () => {
    const renderRule = jest.fn().mockReturnValue('a');
    const propsInlineOverrides: ResolveStylesOptions['inlineStylesProps'][] = [
      { styles: { fontSize: '10px' } },
      { design: { left: '10px' } },
      { variables: { backgroundColor: 'yellow' } },
    ];

    const propsInlineOverridesSize = propsInlineOverrides.length;

    _.forEach(propsInlineOverrides, inlineStylesProps => {
      const options = resolveStylesOptions({
        inlineStylesProps,
        performance: { enableStylesCaching: false },
        renderRule,
      });
      const { classes } = resolveStyles(options, resolvedVariables);
      const { classes: secondClasses } = resolveStyles(options, resolvedVariables);

      expect(classes['root']).toBeDefined();
      expect(secondClasses['root']).toBeDefined();
    });

    expect(renderRule).toHaveBeenCalledTimes(propsInlineOverridesSize * 2);
  });

  test('computes new styles when "rtl" changes', () => {
    const renderRule = jest.fn().mockImplementation((style: ICSSInJSStyle) => style.content);

    const ltrOptions = resolveStylesOptions({ rtl: false, renderRule });
    const rtlOptions = resolveStylesOptions({ rtl: true, renderRule });

    const ltrStyles = resolveStyles(ltrOptions, resolvedVariables);
    const rtlStyles = resolveStyles(rtlOptions, resolvedVariables);

    expect(ltrStyles).toHaveProperty('resolvedStyles.root.content', expect.stringMatching(/rtl:false/));
    expect(ltrStyles).toHaveProperty('classes.root', expect.stringMatching(/rtl:false/));
    expect(renderRule).toHaveBeenCalledTimes(1);

    expect(rtlStyles).toHaveProperty('resolvedStyles.root.content', expect.stringMatching(/rtl:true/));
    expect(rtlStyles).toHaveProperty('classes.root', expect.stringMatching(/rtl:true/));
    expect(renderRule).toHaveBeenCalledTimes(2);
  });

  describe('enableBooleanVariablesCaching', () => {
    test('avoids "classes" computation when enabled', () => {
      const renderRule = jest.fn().mockReturnValue('a');
      const options = resolveStylesOptions({
        inlineStylesProps: { variables: { isFoo: true, isBar: null, isBaz: undefined } },
        performance: { enableBooleanVariablesCaching: true },
        renderRule,
      });

      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('classes.root', 'a');
      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('classes.root', 'a');
      expect(renderRule).toHaveBeenCalledTimes(1);
    });

    test('avoids "classes" computation when enabled and there is no variables', () => {
      const renderRule = jest.fn().mockReturnValue('a');
      const options = resolveStylesOptions({
        performance: { enableBooleanVariablesCaching: true },
        renderRule,
      });

      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('classes.root', 'a');
      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('classes.root', 'a');
      expect(renderRule).toHaveBeenCalledTimes(1);
    });

    test('forces "classes" computation when disabled', () => {
      const renderRule = jest.fn().mockReturnValue('a');
      const options = resolveStylesOptions({
        inlineStylesProps: { variables: { isFoo: true, isBar: null, isBaz: undefined } },
        performance: { enableBooleanVariablesCaching: false },
        renderRule,
      });

      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('classes.root', 'a');
      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('classes.root', 'a');
      expect(renderRule).toHaveBeenCalledTimes(2);
    });

    test('avoids "styles" computation when enabled', () => {
      jest.spyOn(testComponentStyles, 'root');
      const options = resolveStylesOptions({
        inlineStylesProps: { variables: { isFoo: true, isBar: null, isBaz: undefined } },
        performance: { enableBooleanVariablesCaching: true },
      });

      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('resolvedStyles.root');
      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('resolvedStyles.root');
      expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
    });

    test('requires "enableStylesCaching" to be enabled', () => {
      const options = resolveStylesOptions({
        performance: { enableStylesCaching: false, enableBooleanVariablesCaching: true },
      });

      expect(() => resolveStyles(options, resolvedVariables)).toThrowError(
        /Please check your "performance" settings on "Provider"/,
      );
    });

    test('when enabled only "variables" as plain objects can be cached', () => {
      jest.spyOn(testComponentStyles, 'root');
      const options = resolveStylesOptions({
        inlineStylesProps: { variables: () => {} },
        performance: { enableBooleanVariablesCaching: true },
      });

      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('resolvedStyles.root');
      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('resolvedStyles.root');
      expect(testComponentStyles.root).toHaveBeenCalledTimes(2);
    });

    test('when enabled only "variables" as boolean or nil properties can be cached', () => {
      jest.spyOn(testComponentStyles, 'root');
      const options = resolveStylesOptions({
        inlineStylesProps: { variables: { foo: 'bar' } },
        performance: { enableBooleanVariablesCaching: true },
      });

      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('resolvedStyles.root');
      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('resolvedStyles.root');
      expect(testComponentStyles.root).toHaveBeenCalledTimes(2);
    });
  });
});
