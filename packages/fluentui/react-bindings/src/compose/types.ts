import * as React from 'react';

import { COMPOSE_PROP } from './compose';

export type ComposeInputComponent<P = {}> = React.FunctionComponent<P> & { [COMPOSE_PROP]?: ComposePreparedOptions };

export type ComposeInputOptions<
  AllProps extends Record<string, any>,
  BehaviorProps extends Record<string, any>,
  StylesProps extends Record<string, any>
> = {
  className?: string;
  displayName?: string;

  mapPropsToBehavior?: (props: AllProps) => BehaviorProps;
  mapPropsToStyles?: (props: AllProps) => StylesProps;

  handledProps?: (keyof AllProps)[];
  overrideStyles?: boolean;
};

export type ComposePreparedComponent<P = {}> = React.FunctionComponent<P> & { [COMPOSE_PROP]: ComposePreparedOptions };

export type ComposePreparedOptions = {
  className: string;
  displayNames: string[];

  mapPropsToBehaviorChain: ((props: Record<string, any>) => Record<string, any>)[];
  mapPropsToStylesChain: ((props: Record<string, any>) => Record<string, any>)[];

  handledProps: (keyof Record<string, any>)[];
  overrideStyles: boolean;
};

export type ComposeResolvedOptions = {
  className: string;
  displayNames: string[];

  behaviorProps: Record<string, any>;
  stylesProps: Record<string, any>;

  handledProps: (keyof Record<string, any>)[] | undefined;
  overrideStyles: boolean;
};
