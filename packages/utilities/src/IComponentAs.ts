import * as React from 'react';

/**
 * Component "as" interface, allowing components and primitives to be replaced.
 */
export type IComponentAs<TProps> = React.StatelessComponent<TProps> | React.ComponentClass<TProps>;
