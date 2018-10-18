import { createThemeRegistry, IThemeRegistry } from './themeRegistry';

interface IPartialTestTheme {
  val: number;
}

interface ITestTheme {
  val: number;
  sum: number;
}

function _resolveTestTheme(definition: IPartialTestTheme | undefined, parent: ITestTheme): ITestTheme {
  const val: number = (definition && definition.val) || 0;
  return {
    val,
    sum: parent.sum + val
  };
}

function _addTen(theme: ITestTheme): IPartialTestTheme {
  return {
    val: theme.val + 10
  };
}

function _testRegistry(): IThemeRegistry<ITestTheme, IPartialTestTheme> {
  return createThemeRegistry<ITestTheme, IPartialTestTheme>({ val: 0, sum: 0 }, _resolveTestTheme);
}

describe('theme registry tests', () => {
  it('immediate query of default', () => {
    const registry = _testRegistry();
    const def = registry.getTheme();
    expect(def.sum).toEqual(0);
  });

  it('default overriding from platform', () => {
    const registry = _testRegistry();
    registry.registerTheme({ val: 1 });
    expect(registry.getTheme().sum).toEqual(1);
  });

  it('simple chain test', () => {
    const registry = _testRegistry();
    registry.registerTheme({ val: 1 });
    registry.registerTheme({ val: 2 }, 'test');
    expect(registry.getTheme('test').sum).toEqual(3);
  });

  it('update chain test', () => {
    const registry = _testRegistry();
    registry.registerTheme({ val: 1 });
    registry.registerTheme({ val: 2 }, 'test');
    expect(registry.getTheme('test').sum).toEqual(3);
    registry.registerTheme({ val: 2 });
    expect(registry.getTheme('test').sum).toEqual(4);
  });

  it('update platform value test', () => {
    const registry = _testRegistry();
    registry.registerTheme({ val: 1 });
    registry.registerTheme({ val: 2 }, 'test');
    expect(registry.getTheme().sum).toEqual(1);
    expect(registry.getTheme('test').sum).toEqual(3);
    registry.updatePlatformDefaults({ val: 0, sum: 1 });
    expect(registry.getTheme().sum).toEqual(2);
    expect(registry.getTheme('test').sum).toEqual(4);
  });

  it('update multiple dependencies', () => {
    const registry = _testRegistry();
    registry.registerTheme({ val: 1 });
    registry.registerTheme({ val: 2 }, 'test');
    registry.registerTheme({ val: 2 }, 'test2', 'test');
    registry.registerTheme({ val: 3 }, 'test3', 'test');
    expect(registry.getTheme('test2').sum).toEqual(5);
    expect(registry.getTheme('test3').sum).toEqual(6);
    const defTheme = registry.getTheme();
    expect(registry.getTheme().sum).toEqual(1);
    expect(registry.getTheme('test').sum).toEqual(3);
    registry.registerTheme({ val: 3 }, 'test');
    expect(registry.getTheme('test2').sum).toEqual(6);
    expect(registry.getTheme('test3').sum).toEqual(7);
    expect(registry.getTheme()).toBe(defTheme);
    expect(registry.getTheme('test').sum).toEqual(4);
  });

  it('validate unknown theme fallback', () => {
    const registry = _testRegistry();
    registry.registerTheme({ val: 4 });
    expect(registry.getTheme('nothingSet').sum).toEqual(4);
  });

  it('self reference error', () => {
    const registry = _testRegistry();
    expect(() => { registry.registerTheme({ val: 3 }, 'test', 'test'); }).toThrow();
  });

  it('cycle detect error', () => {
    const registry = _testRegistry();
    registry.registerTheme({ val: 1 }, 'test');
    registry.registerTheme({ val: 1 }, 'test2', 'test');
    registry.registerTheme({ val: 1 }, 'test3', 'test2');
    registry.registerTheme({ val: 1 }, 'test4', 'test3');
    expect(() => { registry.registerTheme({ val: 1 }, 'test', 'test4'); }).toThrow();
  });

  it('bad parent error', () => {
    const registry = _testRegistry();
    registry.registerTheme({ val: 1 }, 'test');
    expect(() => { registry.registerTheme({ val: 1 }, 'test2', 'test3'); }).toThrow();
  });

  it('functional definitions', () => {
    const registry = _testRegistry();
    registry.registerTheme(_addTen, 'add10');
    registry.registerTheme(_addTen, '10more', 'add10');
    expect(registry.getTheme('add10').sum).toEqual(10);
    expect(registry.getTheme('10more').sum).toEqual(30);
    // now change the base
    registry.registerTheme({ val: 1 });
    expect(registry.getTheme('10more').sum).toEqual(33);
    expect(registry.getTheme('add10').sum).toEqual(12);
  });
});
