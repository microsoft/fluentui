import * as React from 'react';
import { IGroupSpacerProps } from './GroupSpacer.types';

export const SPACER_WIDTH = 32;

export const GroupSpacer: React.SFC<IGroupSpacerProps> = (props: IGroupSpacerProps): ReturnType<React.SFC<IGroupSpacerProps>> => {
  const { count, indentWidth = SPACER_WIDTH } = props;
  const width = count * indentWidth;

  return count > 0 ? <span className={'ms-GroupSpacer'} style={{ display: 'inline-block', width }} /> : null;
};
