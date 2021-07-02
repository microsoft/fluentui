type FakeModule = {
  foo: () => void;
  bar: () => void;
  baz: () => void;
};

export function createModule(): FakeModule {
  return ({
    foo: () => {},
    bar: () => {},
    // this implementation intentionally missing "baz" property to throw on calls in runtime
  } as unknown) as FakeModule;
}
