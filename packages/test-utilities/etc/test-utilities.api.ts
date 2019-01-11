// @public
export function safeCreate<TProps>(content: React.ReactElement<TProps>, callback: (wrapper: renderer.ReactTestRenderer) => void): void;

// @public
export function safeMount<TComponent extends React.Component, TProps = TComponent['props'], TState = TComponent['state']>(content: React.ReactElement<TProps>, callback: (wrapper: ReactWrapper<TProps, TState, TComponent>) => void): void;

// (No @packagedocumentation comment for this package)
