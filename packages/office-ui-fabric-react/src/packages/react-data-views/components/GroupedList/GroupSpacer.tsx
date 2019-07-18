import * as React from 'react';
import { IGroupSpacerProps } from './GroupSpacer.types';

export const SPACER_WIDTH = 36;

export const GroupSpacer: React.FunctionComponent<IGroupSpacerProps> = props => {
  const { count, indentWidth = SPACER_WIDTH } = props;
  const width = count * indentWidth;

  return count > 0 ? <span className={'ms-GroupSpacer'} style={{ display: 'inline-block', width }} /> : null;
};
