import * as React from 'react';

export type ComposedComponent<
  InputProps extends Record<string, any> = {},
  InputStylesProps extends Record<string, any> = {},
  ParentProps extends Record<string, any> = {},
  ParentStylesProps extends Record<string, any> = {}
> = React.FunctionComponent<InputProps & ParentProps> & {
  fluentComposeConfig: ComposePreparedOptions<InputProps, InputStylesProps, ParentProps, ParentStylesProps>;
};

export type ComposeOptions<
  InputProps extends Record<string, any> = {},
  InputStylesProps extends Record<string, any> = {},
  ParentStylesProps extends Record<string, any> = {}
> = {
  className?: string;
  displayName?: string;

  mapPropsToStylesProps?: (props: ParentStylesProps & InputProps) => InputStylesProps;

  handledProps?: (keyof InputProps)[];
  overrideStyles?: boolean;
};

export type ComposePreparedOptions<
  InputProps extends Record<string, any> = {},
  InputStylesProps extends Record<string, any> = {},
  ParentProps extends Record<string, any> = {},
  ParentStylesProps extends Record<string, any> = {}
> = {
  className: string;
  displayNames: string[];

  mapPropsToStylesPropsChain: ((props: ParentStylesProps & InputProps) => InputStylesProps)[];

  handledProps: (keyof (ParentProps & InputProps))[];
  overrideStyles: boolean;
};
