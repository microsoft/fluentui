/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import './GroupSpacer.scss';

export interface IGroupSpacerProps {
  count: number;
}

const SPACER_WIDTH = 36;

export const GroupSpacer = (props: IGroupSpacerProps) =>
  props.count > 0 && <span className='ms-GroupSpacer' style={ { width: props.count * SPACER_WIDTH } } />;

export default GroupSpacer;

