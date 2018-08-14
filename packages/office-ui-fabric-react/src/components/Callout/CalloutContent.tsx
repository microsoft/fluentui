import { styled } from '../../Utilities';
import { ICalloutProps, ICalloutContentStyles, ICalloutContentStyleProps } from './Callout.types';
import { CalloutContentBase } from './CalloutContent.base';
import { getStyles } from './CalloutContent.styles';

export const CalloutContent: (props: ICalloutProps) => JSX.Element = styled<
  ICalloutProps,
  ICalloutContentStyleProps,
  ICalloutContentStyles
>(CalloutContentBase, getStyles, undefined, { scope: 'CalloutContent' });
