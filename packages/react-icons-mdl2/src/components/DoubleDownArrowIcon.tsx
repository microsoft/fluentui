import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleDownArrowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M512 1798l261-261 90 90-415 415-415-415 90-90 261 261V0h128v1798zm1285-261l90 90-415 415-415-415 90-90 261 261V0h128v1798l261-261z" />
    </svg>
  ),
  displayName: 'DoubleDownArrowIcon',
});

export default DoubleDownArrowIcon;
