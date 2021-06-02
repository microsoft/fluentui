import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PreviousIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1792V256h128v1536H256zm448-768l1088-768v1536L704 1024zm960 521V503l-738 521 738 521z" />
    </svg>
  ),
  displayName: 'PreviousIcon',
});

export default PreviousIcon;
