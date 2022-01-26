import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Uneditable2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M633 1890L0 2048l158-633 584-583L19 109l90-90 1920 1920-90 90-723-722-583 583zm-457-18l329-82q-10-46-32-87t-55-73-73-54-87-33l-82 329zm950-656L832 923l-506 505q52 17 98 45t85 66 66 84 45 99l506-506zm294-113l-91-90 373-373-294-293-372 372-91-90 530-531h1q47-48 108-73t129-25q69 0 130 26t106 72 72 107 27 131q0 66-25 127t-73 110l-530 530zm439-621q29-29 45-67t16-79q0-43-16-81t-45-66-66-44-81-17q-38 0-66 10t-53 29-47 41-47 48l293 293 67-67h1-1z" />
    </svg>
  ),
  displayName: 'Uneditable2Icon',
});

export default Uneditable2Icon;
