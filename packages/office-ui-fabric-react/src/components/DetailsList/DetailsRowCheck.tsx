/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { css } from '../../Utilities';
import { Check } from '../../Check';
import * as stylesImport from './DetailsRow.scss';
const styles: any = stylesImport;

export interface IDetailsRowCheckProps {
  selected?: boolean;
  /**
   * Deprecated at v.65.1 and will be removed by v 1.0. Use 'selected' instead.
   * @deprecated
   */
  isSelected?: boolean;
  anySelected: boolean;
  ariaLabel: string;
  canSelect: boolean;
}

export const DetailsRowCheck = (props: IDetailsRowCheckProps) => {
  let selected = props.isSelected || props.selected;
  return (
    <button
      type='button'
      className={ css('ms-DetailsRow-check', styles.check, {
        [styles.checkDisabled]: !props.canSelect,
        'ms-DetailsRow-check--isDisabled': !props.canSelect
      }) }
      role='button'
      aria-pressed={ selected }
      data-selection-toggle={ true }
      data-automationid='DetailsRowCheck'
      aria-label={ props.ariaLabel }
    >
      <Check checked={ selected } />
    </button>
  );
};
