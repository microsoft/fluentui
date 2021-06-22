import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretHollowMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1371 293l-731 731 731 731V293zm-128 310v842l-421-421 421-421z" />
    </svg>
  ),
  displayName: 'CaretHollowMirroredIcon',
});

export default CaretHollowMirroredIcon;
