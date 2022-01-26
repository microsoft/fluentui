import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretHollowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 293l731 731-731 731V293zm128 310v842l421-421-421-421z" />
    </svg>
  ),
  displayName: 'CaretHollowIcon',
});

export default CaretHollowIcon;
