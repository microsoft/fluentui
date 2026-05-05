import * as React from 'react';

/**
 * Properties used by render function interface for providing overrideable render callbacks.
 *
 * Properties used by render function interface for providing overrideable render callbacks.
 *
 * {@docCategory IComponentAsProps}
 *
 * @public
 */
export type IComponentAsProps<T> = T & { defaultRender?: React.ComponentType<T> };

/**
 * Render function interface for providing overrideable render callbacks.
 *
 * Render function interface for providing overrideable render callbacks.
 *
 * {@docCategory IComponentAs}
 *
 * @public
 */
export type IComponentAs<T> = React.ComponentType<IComponentAsProps<T>>;
