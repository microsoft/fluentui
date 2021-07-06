import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EditIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 335q0 66-25 128t-73 110L633 1890 0 2048l158-633L1475 98q48-48 110-73t128-25q69 0 130 26t106 72 72 107 27 130zM326 1428q106 35 182 111t112 183L1701 640l-293-293L326 1428zm-150 444l329-82q-10-46-32-87t-55-73-73-54-87-33l-82 329zM1792 549q25-25 48-47t41-46 28-53 11-67q0-43-16-80t-45-66-66-45-81-17q-38 0-66 10t-53 29-47 41-47 48l293 293z" />
    </svg>
  ),
  displayName: 'EditIcon',
});

export default EditIcon;
