import {
  styled
} from '../../Utilities';
import { ICalloutProps } from './Callout.types';
import { CalloutContentBase } from './CalloutContent.base';
import { getStyles } from './CalloutContent.styles';

export const CalloutContent: (props: ICalloutProps) => JSX.Element = styled(
  CalloutContentBase,
  getStyles
);