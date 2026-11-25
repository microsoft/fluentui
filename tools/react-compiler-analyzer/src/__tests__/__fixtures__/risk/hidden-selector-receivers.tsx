// Hidden selector hooks reached through receivers that are not plain identifiers.
// All four shapes resolve to the same hidden hook at runtime and crash identically.
declare const appStore: { use: { sessionID(): string } };
declare const nested: { inner: { use: { locale(): string } } };
declare function useWithSelectorsStore(scope: string): { use: { locale(): string; region(): string } };

export function IdentifierReceiver() {
  const sessionID = appStore.use.sessionID();
  return <div>{sessionID}</div>;
}

export function CallExpressionReceiver({ scope }: { scope: string }) {
  const locale = useWithSelectorsStore(scope).use.locale();
  return <div>{locale}</div>;
}

export function MemberExpressionReceiver() {
  const locale = nested.inner.use.locale();
  return <div>{locale}</div>;
}

export function ComputedField({ scope }: { scope: string }) {
  const region = useWithSelectorsStore(scope).use['region']();
  return <div>{region}</div>;
}

export function DynamicField({ scope, key }: { scope: string; key: 'locale' }) {
  const value = useWithSelectorsStore(scope).use[key]();
  return <div>{value}</div>;
}

declare const factories: { make(): { use: { locale(): string } } }[];

export function UnnamedReceiver() {
  const locale = factories[0].make().use.locale();
  return <div>{locale}</div>;
}

export const holder = {
  store: null as unknown as { use: { locale(): string } },
  read: function () {
    return this.store.use.locale();
  },
};

// Class methods are never memoized by the compiler, so they produce no event to attach to.
export class ClassHolder {
  store!: { use: { locale(): string } };
  read() {
    return this.store.use.locale();
  }
}
