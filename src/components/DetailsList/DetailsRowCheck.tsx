/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { Check } from '../../Check';

export interface IDetailsRowCheckProps {
  isSelected: boolean;
  anySelected: boolean;
  ariaLabel: string;
  canSelect: boolean;
}

export const DetailsRowCheck = (props: IDetailsRowCheckProps) => (
  <button
    className='ms-DetailsRow-check'
    role='button'
    aria-pressed={ props.isSelected }
    data-selection-toggle={ true }
    data-automationid='DetailsRowCheck'
    aria-label={ props.ariaLabel }
    >
    { props.canSelect ?
      <Check isChecked={ props.isSelected } /> :
      <div className='ms-DetailsRow-checkSpacer' />
    }
  </button>
);
