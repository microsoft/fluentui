import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Photo2FillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M576 975l560 561H256v-240l320-321z" />
    </svg>
  ),
  displayName: 'Photo2FillIcon',
});

export default Photo2FillIcon;
