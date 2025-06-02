/* eslint-disable @fluentui/max-len, @typescript-eslint/naming-convention */
import * as React from 'react';

// Mirror of the removed interface React.Props<T> since React 18
export interface IReactProps<T> {
  children?: React.ReactNode | undefined;
  key?: React.Key | undefined;
  ref?: React.LegacyRef<T> | undefined;
}

/**
 * React 18 types introduced breaking changes to the RefAttributes interface.
 * Following Breaking Change landed in @types/react@18.2.61 (replacing ref with `LegacyRef`)
 *  - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/68720
 *  - https://app.unpkg.com/@types/react@18.2.61/files/index.d.ts
 *
 * In React 19 types this was reverted back to the original `Ref<T>` type.
 * in order to maintain compatibility with React 17,18,19, we are forced to use our own version of RefAttributes and align with latest developments if they don't Break.
 */
export interface RefAttributes<T> extends React.Attributes {
  ref?: React.Ref<T> | undefined;
}
