import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChromeCloseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1169 1024l879 879-145 145-879-879-879 879L0 1903l879-879L0 145 145 0l879 879L1903 0l145 145-879 879z" />
    </svg>
  ),
  displayName: 'ChromeCloseIcon',
});

export default ChromeCloseIcon;
