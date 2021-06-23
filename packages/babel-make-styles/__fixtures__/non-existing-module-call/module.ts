type FakeModule = {
  foo: () => void;
  bar: () => void;
  baz: () => void;
};

export function createModule(): FakeModule {
  return ({
    foo: () => {},
    bar: () => {},
  } as unknown) as FakeModule;
}
