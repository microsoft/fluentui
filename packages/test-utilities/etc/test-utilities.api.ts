// @public
declare function safeCreate<TProps>(content: React.ReactElement<TProps>, callback: (wrapper: renderer.ReactTestRenderer) => void): void;

// @public
declare function safeMount<TComponent extends React.Component, TProps = TComponent['props'], TState = TComponent['state']>(content: React.ReactElement<TProps>, callback: (wrapper: ReactWrapper<TProps, TState, TComponent>) => void): void;


// (No @packageDocumentation comment for this package)
