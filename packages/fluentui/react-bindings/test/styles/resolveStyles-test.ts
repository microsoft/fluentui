import * as _ from 'lodash';
import {
  ComponentSlotStylesPrepared,
  ComponentVariablesObject,
  emptyTheme,
  ICSSInJSStyle,
  ThemePrepared,
} from '@fluentui/styles';
import resolveStyles from '../../src/styles/resolveStyles';
import { ResolveStylesOptions, StylesContextPerformance } from '../../src/styles/types';

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
  props?: ResolveStylesOptions['props'];
  rtl?: ResolveStylesOptions['rtl'];
}): ResolveStylesOptions => {
  const { componentStyles, displayNames = ['Test'], performance, props = {}, rtl = false } = options || {};

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
    props,
    rtl,
    disableAnimations: false,
    renderer: {
      renderRule: () => '',
    },
    performance: { ...defaultPerformanceOptions, ...performance },
    saveDebug: () => {},
  };
};

describe('resolveStyles', () => {
  test('resolves styles', () => {
    const { resolvedStyles } = resolveStyles(resolveStylesOptions(), resolvedVariables);

    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
  });

  test('caches resolved styles', () => {
    spyOn(testComponentStyles, 'root').and.callThrough();
    const { resolvedStyles } = resolveStyles(resolveStylesOptions(), resolvedVariables);

    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
    expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
    expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
  });

  test('does not render classes if not fetched', () => {
    const renderStyles = jest.fn();
    const { resolvedStyles } = resolveStyles(resolveStylesOptions(), resolvedVariables, renderStyles);

    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
    expect(renderStyles).not.toBeCalled();
  });

  test('renders classes when slot classes getter is accessed', () => {
    const renderStyles = jest.fn().mockReturnValue('a');
    const { classes } = resolveStyles(resolveStylesOptions(), resolvedVariables, renderStyles);

    expect(classes['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }));
  });

  test('caches rendered classes', () => {
    const renderStyles = jest.fn().mockReturnValue('a');
    const { classes } = resolveStyles(resolveStylesOptions(), resolvedVariables, renderStyles);

    expect(classes['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }));
    expect(classes['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledTimes(1);
  });

  test('caches resolved styles for no props', () => {
    spyOn(testComponentStyles, 'root').and.callThrough();
    const options = resolveStylesOptions();
    const { resolvedStyles } = resolveStyles(options, resolvedVariables);
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables);

    expect(resolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }));
    expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
    expect(secondResolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }));
    expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
  });

  test('caches classes for no props', () => {
    const renderStyles = jest.fn().mockReturnValue('a');
    const options = resolveStylesOptions({ displayNames: ['Test1'] });
    const { classes } = resolveStyles(options, resolvedVariables, renderStyles);
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles);

    expect(classes['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }));
    expect(secondClasses['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledTimes(1);
  });

  test('caches resolved styles for the same props', () => {
    spyOn(testComponentStyles, 'root').and.callThrough();
    const options = resolveStylesOptions({
      displayNames: ['Test2'],
      props: { primary: true },
    });
    const { resolvedStyles } = resolveStyles(options, resolvedVariables);
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables);

    expect(resolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }));
    expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
    expect(secondResolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }));
    expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
  });

  test('caches classes for the same props', () => {
    const renderStyles = jest.fn().mockReturnValue('a');
    const options = resolveStylesOptions({
      displayNames: ['Test3'],
      props: { primary: true },
    });
    const { classes } = resolveStyles(options, resolvedVariables, renderStyles);
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles);

    expect(classes['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }));
    expect(secondClasses['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledTimes(1);
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
    spyOn(testComponentStyles, 'root').and.callThrough();
    const options = resolveStylesOptions({
      displayNames: ['Test4'],
      props: { primary: true },
    });
    const { resolvedStyles } = resolveStyles(options, resolvedVariables);
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(
      { ...options, props: { primary: false } },
      resolvedVariables,
    );

    expect(resolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }));
    expect(testComponentStyles.root).toHaveBeenCalledTimes(1);
    expect(secondResolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }));
    expect(testComponentStyles.root).toHaveBeenCalledTimes(2);
  });

  test('considers props when caching classes', () => {
    const renderStyles = jest.fn().mockReturnValue('a');
    const options = resolveStylesOptions({
      displayNames: ['Test5'],
      props: { primary: true },
    });
    const { classes } = resolveStyles(options, resolvedVariables, renderStyles);

    options.props = { primary: false };
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles);

    expect(classes['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }));
    expect(secondClasses['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledTimes(2);
  });

  test('does not cache styles if caching is disabled', () => {
    spyOn(testComponentStyles, 'root').and.callThrough();
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
    const renderStyles = jest.fn().mockReturnValue('a');
    const options = resolveStylesOptions({
      performance: { enableStylesCaching: false },
    });
    const { classes } = resolveStyles(options, resolvedVariables, renderStyles);
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles);

    expect(classes['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }));
    expect(secondClasses['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledTimes(2);
  });

  test('does not cache styles if there are inline overrides', () => {
    spyOn(testComponentStyles, 'root').and.callThrough();
    const propsInlineOverrides: ResolveStylesOptions['props'][] = [
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

    _.forEach(propsInlineOverrides, (props, idx) => {
      const options = resolveStylesOptions({
        props,
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
    const renderStyles = jest.fn().mockReturnValue('a');
    const propsInlineOverrides: ResolveStylesOptions['props'][] = [
      { styles: { fontSize: '10px' } },
      { design: { left: '10px' } },
      { variables: { backgroundColor: 'yellow' } },
    ];

    const propsInlineOverridesSize = propsInlineOverrides.length;

    _.forEach(propsInlineOverrides, props => {
      const options = resolveStylesOptions({
        props,
        performance: { enableStylesCaching: false },
      });
      const { classes } = resolveStyles(options, resolvedVariables, renderStyles);
      const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles);

      expect(classes['root']).toBeDefined();
      expect(secondClasses['root']).toBeDefined();
    });

    expect(renderStyles).toHaveBeenCalledTimes(propsInlineOverridesSize * 2);
  });

  test('computes new styles when "rtl" changes', () => {
    const renderStyles = jest.fn().mockImplementation((style: ICSSInJSStyle) => style.content);

    const ltrOptions = resolveStylesOptions({ rtl: false });
    const rtlOptions = resolveStylesOptions({ rtl: true });

    const ltrStyles = resolveStyles(ltrOptions, resolvedVariables, renderStyles);
    const rtlStyles = resolveStyles(rtlOptions, resolvedVariables, renderStyles);

    expect(ltrStyles).toHaveProperty('resolvedStyles.root.content', expect.stringMatching(/rtl:false/));
    expect(ltrStyles).toHaveProperty('classes.root', expect.stringMatching(/rtl:false/));
    expect(renderStyles).toHaveBeenCalledTimes(1);

    expect(rtlStyles).toHaveProperty('resolvedStyles.root.content', expect.stringMatching(/rtl:true/));
    expect(rtlStyles).toHaveProperty('classes.root', expect.stringMatching(/rtl:true/));
    expect(renderStyles).toHaveBeenCalledTimes(2);
  });

  describe('enableBooleanVariablesCaching', () => {
    test('avoids "classes" computation when enabled', () => {
      const renderStyles = jest.fn().mockReturnValue('a');
      const options = resolveStylesOptions({
        props: { variables: { isFoo: true, isBar: null, isBaz: undefined } },
        performance: { enableBooleanVariablesCaching: true },
      });

      expect(resolveStyles(options, resolvedVariables, renderStyles)).toHaveProperty('classes.root', 'a');
      expect(resolveStyles(options, resolvedVariables, renderStyles)).toHaveProperty('classes.root', 'a');
      expect(renderStyles).toHaveBeenCalledTimes(1);
    });

    test('avoids "classes" computation when enabled and there is no variables', () => {
      const renderStyles = jest.fn().mockReturnValue('a');
      const options = resolveStylesOptions({
        performance: { enableBooleanVariablesCaching: true },
      });

      expect(resolveStyles(options, resolvedVariables, renderStyles)).toHaveProperty('classes.root', 'a');
      expect(resolveStyles(options, resolvedVariables, renderStyles)).toHaveProperty('classes.root', 'a');
      expect(renderStyles).toHaveBeenCalledTimes(1);
    });

    test('forces "classes" computation when disabled', () => {
      const renderStyles = jest.fn().mockReturnValue('a');
      const options = resolveStylesOptions({
        props: { variables: { isFoo: true, isBar: null, isBaz: undefined } },
        performance: { enableBooleanVariablesCaching: false },
      });

      expect(resolveStyles(options, resolvedVariables, renderStyles)).toHaveProperty('classes.root', 'a');
      expect(resolveStyles(options, resolvedVariables, renderStyles)).toHaveProperty('classes.root', 'a');
      expect(renderStyles).toHaveBeenCalledTimes(2);
    });

    test('avoids "styles" computation when enabled', () => {
      spyOn(testComponentStyles, 'root').and.callThrough();
      const options = resolveStylesOptions({
        props: { variables: { isFoo: true, isBar: null, isBaz: undefined } },
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
      spyOn(testComponentStyles, 'root').and.callThrough();
      const options = resolveStylesOptions({
        props: { variables: () => {} },
        performance: { enableBooleanVariablesCaching: true },
      });

      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('resolvedStyles.root');
      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('resolvedStyles.root');
      expect(testComponentStyles.root).toHaveBeenCalledTimes(2);
    });

    test('when enabled only "variables" as boolean or nil properties can be cached', () => {
      spyOn(testComponentStyles, 'root').and.callThrough();
      const options = resolveStylesOptions({
        props: { variables: { foo: 'bar' } },
        performance: { enableBooleanVariablesCaching: true },
      });

      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('resolvedStyles.root');
      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('resolvedStyles.root');
      expect(testComponentStyles.root).toHaveBeenCalledTimes(2);
    });
  });
});
