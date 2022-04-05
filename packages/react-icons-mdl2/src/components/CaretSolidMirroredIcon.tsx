import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretSolidMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 1536L549 549v987h987z" />
    </svg>
  ),
  displayName: 'CaretSolidMirroredIcon',
});

export default CaretSolidMirroredIcon;
