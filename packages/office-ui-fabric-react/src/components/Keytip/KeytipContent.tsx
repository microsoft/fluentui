import { styled } from '../../Utilities';
import { IKeytipProps, IKeytipStyleProps, IKeytipStyles } from './Keytip.types';
import { KeytipContentBase } from './KeytipContent.base';
import { getStyles } from './Keytip.styles';

export const KeytipContent: React.StatelessComponent<IKeytipProps> = styled<IKeytipProps, IKeytipStyleProps, IKeytipStyles>(
  KeytipContentBase,
  getStyles,
  undefined,
  {
    scope: 'KeytipContent'
  }
);
