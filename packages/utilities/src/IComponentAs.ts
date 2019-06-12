import * as React from 'react';

/**
 * Properties used by render function interface for providing overrideable render callbacks.
 *
 * @public
 * {@docCategory IComponentAsProps}
 */
export type IComponentAsProps<T> = T & { defaultRender?: React.ComponentType<T> };

/**
 * Render function interface for providing overrideable render callbacks.
 *
 * @public
 * {@docCategory IComponentAs}
 */
export type IComponentAs<T> = React.ComponentType<IComponentAsProps<T>>;
