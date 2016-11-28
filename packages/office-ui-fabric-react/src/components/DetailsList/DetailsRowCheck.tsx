/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { Check } from '../../Check';

export interface IDetailsRowCheckProps {
  selected?: boolean;
  /**
   * @deprecated
   * Deprecated at v.65.1 and will be removed by v 1.0. Use 'selected' instead.
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
      className='ms-DetailsRow-check'
      role='button'
      aria-pressed={ selected }
      data-selection-toggle={ true }
      data-automationid='DetailsRowCheck'
      aria-label={ props.ariaLabel }
      >
      { props.canSelect ?
        <Check checked={ selected } /> :
        <div className='ms-DetailsRow-checkSpacer' />
      }
    </button>
  );
};
