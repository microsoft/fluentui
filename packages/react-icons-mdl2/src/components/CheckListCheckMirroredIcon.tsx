import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CheckListCheckMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1728 1621l211-210 90 90-301 301-173-173 90-90 83 82zm301-1272l-301 301-173-173 90-90 83 82 211-210 90 90zm-301 504l211-210 90 90-301 301-173-173 90-90 83 82zm0 384l211-210 90 90-301 301-173-173 90-90 83 82z" />
    </svg>
  ),
  displayName: 'CheckListCheckMirroredIcon',
});

export default CheckListCheckMirroredIcon;
