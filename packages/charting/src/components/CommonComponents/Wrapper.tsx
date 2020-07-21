import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { IWrapperStyles, IWrapperStyleProps, IWrapperProps } from './Wrapper.types';
import { WrapperBase } from './Wrapper.base';
import { getStyles } from './Wrapper.styles';

export const Base: React.FunctionComponent<IWrapperProps> = styled<IWrapperProps, IWrapperStyleProps, IWrapperStyles>(
  WrapperBase,
  getStyles,
);
