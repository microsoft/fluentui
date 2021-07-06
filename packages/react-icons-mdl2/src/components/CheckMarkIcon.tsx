import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CheckMarkIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1837 557L768 1627l-557-558 90-90 467 466 979-978 90 90z" />
    </svg>
  ),
  displayName: 'CheckMarkIcon',
});

export default CheckMarkIcon;
