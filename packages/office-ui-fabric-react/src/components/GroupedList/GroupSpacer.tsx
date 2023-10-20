import * as React from 'react';
import {
  css
} from '../../Utilities';
import * as stylesImport from './GroupSpacer.scss';
const styles: any = stylesImport;

export interface IGroupSpacerProps {
  /** Count of spacer(s) */
  count: number;

  /** Override the default role (presentation) */
  role?: string;
}

const SPACER_WIDTH = 36;

export const GroupSpacer = (props: IGroupSpacerProps) => {
  const { count, role = 'presentation' } = props;

  return count > 0 && (
    <span
      className={ css(
        'ms-GroupSpacer',
        styles.root
      ) }
      style={ { width: props.count * SPACER_WIDTH } }
      role={ role }
    />
  );
};
