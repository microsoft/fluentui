import * as _ from 'lodash';
import { ComponentSlotStylesPrepared, ComponentVariablesObject, emptyTheme, ICSSInJSStyle } from '@fluentui/styles';
import resolveStyles from '../../src/styles/resolveStyles';
import { ResolveStylesOptions } from '../../src/styles/types';

const componentStyles: ComponentSlotStylesPrepared<{}, { color: string }> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    color: v.color
  })
};

const resolvedVariables: ComponentVariablesObject = {
  color: 'red'
};

const resolveStylesOptions = (options?: {
  displayName?: ResolveStylesOptions['displayName'];
  performance?: ResolveStylesOptions['performance'];
  props?: ResolveStylesOptions['props'];
}): ResolveStylesOptions => {
  const {
    displayName = 'Test',
    performance = {
      enableVariablesCaching: true,
      enableStylesCaching: true
    },
    props = {}
  } = options || {};

  return {
    theme: {
      ...emptyTheme,
      componentStyles: {
        [displayName]: componentStyles
      }
    },
    displayName,
    props,
    rtl: false,
    disableAnimations: false,
    renderer: {
      renderRule: () => ''
    },
    performance,
    saveDebug: () => {}
  };
};

describe('resolveStyles', () => {
  test('resolves styles', () => {
    const { resolvedStyles } = resolveStyles(resolveStylesOptions(), resolvedVariables);

    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
  });

  test('caches resolved styles', () => {
    spyOn(componentStyles, 'root').and.callThrough();
    const { resolvedStyles } = resolveStyles(resolveStylesOptions(), resolvedVariables);

    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
    expect(componentStyles.root).toHaveBeenCalledTimes(1);
    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
    expect(componentStyles.root).toHaveBeenCalledTimes(1);
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
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' });
  });

  test('caches rendered classes', () => {
    const renderStyles = jest.fn().mockReturnValue('a');
    const { classes } = resolveStyles(resolveStylesOptions(), resolvedVariables, renderStyles);

    expect(classes['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' });
    expect(classes['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledTimes(1);
  });

  test('caches resolved styles for no props', () => {
    spyOn(componentStyles, 'root').and.callThrough();
    const options = resolveStylesOptions();
    const { resolvedStyles } = resolveStyles(options, resolvedVariables);
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables);

    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
    expect(componentStyles.root).toHaveBeenCalledTimes(1);
    expect(secondResolvedStyles.root).toMatchObject({ color: 'red' });
    expect(componentStyles.root).toHaveBeenCalledTimes(1);
  });

  test('caches classes for no props', () => {
    const renderStyles = jest.fn().mockReturnValue('a');
    const options = resolveStylesOptions({ displayName: 'Test1' });
    const { classes } = resolveStyles(options, resolvedVariables, renderStyles);
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles);

    expect(classes['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' });
    expect(secondClasses['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledTimes(1);
  });

  test('caches resolved styles for the same props', () => {
    spyOn(componentStyles, 'root').and.callThrough();
    const options = resolveStylesOptions({
      displayName: 'Test2',
      props: { primary: true }
    });
    const { resolvedStyles } = resolveStyles(options, resolvedVariables);
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables);

    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
    expect(componentStyles.root).toHaveBeenCalledTimes(1);
    expect(secondResolvedStyles.root).toMatchObject({ color: 'red' });
    expect(componentStyles.root).toHaveBeenCalledTimes(1);
  });

  test('caches classes for the same props', () => {
    const renderStyles = jest.fn().mockReturnValue('a');
    const options = resolveStylesOptions({
      displayName: 'Test3',
      props: { primary: true }
    });
    const { classes } = resolveStyles(options, resolvedVariables, renderStyles);
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles);

    expect(classes['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' });
    expect(secondClasses['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledTimes(1);
  });

  test('considers props when caching resolved styles', () => {
    spyOn(componentStyles, 'root').and.callThrough();
    const options = resolveStylesOptions({
      displayName: 'Test4',
      props: { primary: true }
    });
    const { resolvedStyles } = resolveStyles(options, resolvedVariables);

    options.props = { primary: false };
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables);

    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
    expect(componentStyles.root).toHaveBeenCalledTimes(1);
    expect(secondResolvedStyles.root).toMatchObject({ color: 'red' });
    expect(componentStyles.root).toHaveBeenCalledTimes(2);
  });

  test('considers props when caching classes', () => {
    const renderStyles = jest.fn().mockReturnValue('a');
    const options = resolveStylesOptions({
      displayName: 'Test5',
      props: { primary: true }
    });
    const { classes } = resolveStyles(options, resolvedVariables, renderStyles);

    options.props = { primary: false };
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles);

    expect(classes['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' });
    expect(secondClasses['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledTimes(2);
  });

  test('does not cache styles if caching is disabled', () => {
    spyOn(componentStyles, 'root').and.callThrough();
    const options = resolveStylesOptions({ performance: { enableStylesCaching: false } });
    const { resolvedStyles } = resolveStyles(options, resolvedVariables);
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables);

    expect(resolvedStyles.root).toMatchObject({ color: 'red' });
    expect(secondResolvedStyles.root).toMatchObject({ color: 'red' });
    expect(componentStyles.root).toHaveBeenCalledTimes(2);
  });

  test('does not cache classes if caching is disabled', () => {
    const renderStyles = jest.fn().mockReturnValue('a');
    const options = resolveStylesOptions({ performance: { enableStylesCaching: false } });
    const { classes } = resolveStyles(options, resolvedVariables, renderStyles);
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles);

    expect(classes['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' });
    expect(secondClasses['root']).toBeDefined();
    expect(renderStyles).toHaveBeenCalledTimes(2);
  });

  test('does not cache styles if there are inline overrides', () => {
    spyOn(componentStyles, 'root').and.callThrough();
    const propsInlineOverrides: ResolveStylesOptions['props'][] = [
      { styles: { fontSize: '10px' } },
      { design: { left: '10px' } },
      { variables: { backgroundColor: 'yellow' } }
    ];

    const propsInlineOverridesResolvedStyles: ICSSInJSStyle[] = [
      { color: 'red', fontSize: '10px' },
      { color: 'red', left: '10px' },
      { color: 'red' }
    ];

    const propsInlineOverridesSize = propsInlineOverrides.length;

    _.forEach(propsInlineOverrides, (props, idx) => {
      const options = resolveStylesOptions({
        props,
        performance: { enableStylesCaching: false }
      });

      const { resolvedStyles } = resolveStyles(options, resolvedVariables);
      const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables);

      expect(resolvedStyles.root).toMatchObject(propsInlineOverridesResolvedStyles[idx]);
      expect(secondResolvedStyles.root).toMatchObject(propsInlineOverridesResolvedStyles[idx]);
      resolveStyles(options, resolvedVariables);
    });

    expect(componentStyles.root).toHaveBeenCalledTimes(propsInlineOverridesSize * 2);
  });

  test('does not cache classes if there are inline overrides', () => {
    const renderStyles = jest.fn().mockReturnValue('a');
    const propsInlineOverrides: ResolveStylesOptions['props'][] = [
      { styles: { fontSize: '10px' } },
      { design: { left: '10px' } },
      { variables: { backgroundColor: 'yellow' } }
    ];

    const propsInlineOverridesSize = propsInlineOverrides.length;

    _.forEach(propsInlineOverrides, props => {
      const options = resolveStylesOptions({
        props,
        performance: { enableStylesCaching: false }
      });
      const { classes } = resolveStyles(options, resolvedVariables, renderStyles);
      const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles);

      expect(classes['root']).toBeDefined();
      expect(secondClasses['root']).toBeDefined();
    });

    expect(renderStyles).toHaveBeenCalledTimes(propsInlineOverridesSize * 2);
  });
});
