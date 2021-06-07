import * as React from 'react';

/* eslint-disable @typescript-eslint/naming-convention */

/** Type to get only the string keys of T. */
type StringKeyOf<T> = { [K in keyof T]: K extends string ? K : never }[keyof T];

/** Definition for a prop that is to be controlled by the Playground.  */
export interface PropDefinition<TType> {
  /** Name of the prop. */
  propName: keyof TType | 'content';

  /** Type of the prop, it can be boolean, string or an array of defined string values. */
  propType: 'boolean' | 'string' | string[];

  /** Default value for the prop. */
  defaultValue?: boolean | string;

  /** Callback to set the default value of the prop if it is boolean and controlled behavior is wanted. */
  setDefaultValue?: (value: boolean) => void;

  /**
   * An array of prop names that this prop requires to be truthy or falsy (prop name preceded by '~') in order to enable
   * this prop.
   */
  dependsOnProps?: (keyof TType | `~${StringKeyOf<TType>}` | 'content' | '~content')[];
}

/** Props received by the Playground component. */
export interface PlaygroundProps<TType> {
  /** Single children to clone with the playground props. */
  children: React.ReactElement;

  /** Sections of props for the playground, where each section has a name and an array of prop definitions. */
  sections: Array<{
    sectionName: string;
    propList: PropDefinition<TType>[];
  }>;
}
