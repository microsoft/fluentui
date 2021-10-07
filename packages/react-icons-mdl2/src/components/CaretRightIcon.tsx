import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M506-26l1050 1050L506 2074V-26zm128 308v1484l741-742-741-742z" />
    </svg>
  ),
  displayName: 'CaretRightIcon',
});

export default CaretRightIcon;
