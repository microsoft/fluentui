import resolveVariables from '../../src/styles/resolveVariables';
import { ComponentVariablesPrepared, emptyTheme, ThemePrepared } from '@fluentui/styles';

const siteVariables = {
  ...emptyTheme.siteVariables,
  brand: 'blue'
};
const componentVariables: ComponentVariablesPrepared = (siteVariables = emptyTheme.siteVariables) => ({
  backgroundColor: siteVariables.brand
});

const createTheme: (displayName?: string) => ThemePrepared = displayName => ({
  ...emptyTheme,
  siteVariables,
  componentVariables: {
    [displayName || 'Test']: componentVariables
  }
});

describe('resolveVariables', () => {
  test('resolved variables', () => {
    const variables = resolveVariables('Test', createTheme('Test'), {}, false);
    expect(variables).toMatchObject({ backgroundColor: 'blue' });
  });

  test('merges theme with input variables', () => {
    const propsVariables = () => ({
      color: 'red'
    });
    const variables = resolveVariables('Test', createTheme('Test'), propsVariables, false);
    expect(variables).toMatchObject({ backgroundColor: 'blue', color: 'red' });
  });

  test("allows input variabes to override theme's", () => {
    const propsVariables = {
      backgroundColor: 'green'
    };
    const variables = resolveVariables('Test', createTheme('Test'), propsVariables, false);
    expect(variables).toMatchObject({ backgroundColor: 'green' });
  });

  test('caches resolved variables', () => {
    const componentVariablesMock = jest.fn().mockReturnValue({ backgroundColor: 'blue' });
    const theme = createTheme();
    theme.componentVariables['Test'] = componentVariablesMock;

    const variables = resolveVariables('Test', theme, {}, true);
    const secondVariables = resolveVariables('Test', theme, {}, true);

    expect(variables).toMatchObject(secondVariables);
    expect(componentVariablesMock).toHaveBeenCalledTimes(1);
  });

  test('considers displayName while caching resolved variables', () => {
    const componentVariablesMock1 = jest.fn().mockReturnValue({ backgroundColor: 'blue' });
    const componentVariablesMock2 = jest.fn().mockReturnValue({ color: 'red' });
    const theme = createTheme();
    theme.componentVariables['Test1'] = componentVariablesMock1;
    theme.componentVariables['Test2'] = componentVariablesMock2;

    const variables = resolveVariables('Test1', theme, {}, true);
    const secondVariables = resolveVariables('Test2', theme, {}, true);

    expect(variables).toMatchObject({ backgroundColor: 'blue' });
    expect(secondVariables).toMatchObject({ color: 'red' });
    expect(componentVariablesMock1).toHaveBeenCalledTimes(1);
    expect(componentVariablesMock2).toHaveBeenCalledTimes(1);
  });

  test('considers theme while caching resolved variables', () => {
    const componentVariablesMock = jest.fn().mockReturnValue({ backgroundColor: 'blue' });
    const theme = createTheme('Test');
    const secondTheme = createTheme('Test');
    theme.componentVariables['Test'] = componentVariablesMock;
    secondTheme.componentVariables['Test'] = componentVariablesMock;

    const variables = resolveVariables('Test', theme, {}, true);
    const secondVariables = resolveVariables('Test', secondTheme, {}, true);

    expect(variables).toMatchObject({ backgroundColor: 'blue' });
    expect(secondVariables).toMatchObject({ backgroundColor: 'blue' });
    expect(componentVariablesMock).toHaveBeenCalledTimes(2);
  });
});
