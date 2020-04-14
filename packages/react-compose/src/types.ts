import * as React from 'react';

export type ComposedComponent<
  InputProps = {},
  InputStylesProps = {},
  ParentProps = {},
  ParentStylesProps = {}
> = React.FunctionComponent<InputProps & ParentProps> & {
  className: string;
  fluentComposeConfig: ComposePreparedOptions<InputProps, InputStylesProps, ParentProps, ParentStylesProps>;
};

export type ComposeOptions<InputProps = {}, InputStylesProps = {}, ParentStylesProps = {}> = {
  className?: string;
  displayName?: string;

  mapPropsToStylesProps?: (props: ParentStylesProps & InputProps) => InputStylesProps;

  handledProps?: (keyof InputProps)[];
  overrideStyles?: boolean;
};

export type ComposePreparedOptions<InputProps = {}, InputStylesProps = {}, ParentProps = {}, ParentStylesProps = {}> = {
  className: string;
  displayNames: string[];

  mapPropsToStylesPropsChain: ((props: ParentStylesProps & InputProps) => InputStylesProps)[];

  handledProps: (keyof (ParentProps & InputProps))[];
  overrideStyles: boolean;
};
