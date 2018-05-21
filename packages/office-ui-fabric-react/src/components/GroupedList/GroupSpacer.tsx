import * as React from 'react';
import {
  css
} from '../../Utilities';
import * as stylesImport from './GroupSpacer.scss';
const styles: any = stylesImport;

export interface IGroupSpacerProps {
  count: number;
  widthUnit?: number;
}

const SPACER_WIDTH = 36;

export const GroupSpacer = (props: IGroupSpacerProps) =>
  props.count > 0 && (
    <span
      className={ css(
        'ms-GroupSpacer',
        styles.root
      ) }
      style={ { width: props.count * getWidthUnit(props.widthUnit) } }
    />
  );

function getWidthUnit(widthUnit: number | undefined): number {
  return typeof widthUnit === 'number' ? widthUnit : SPACER_WIDTH;
}