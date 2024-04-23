import * as React from 'react';
import { IStyleSetBase } from '@fluentui/style-utilities';
import { ISlottableProps, ValidProps } from '../ISlots';
import { IComponentOptions } from './IComponent';

/**
 * Signature of components created using composed.
 */
export interface IFoundationComponent<
  TComponentProps extends ValidProps & ISlottableProps<TComponentSlots>,
  TTokens,
  TStyleSet extends IStyleSetBase,
  TViewProps extends TComponentProps = TComponentProps,
  TComponentSlots = {},
  TStatics = {},
> extends React.FunctionComponent {
  __options?: IComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics>;
}
