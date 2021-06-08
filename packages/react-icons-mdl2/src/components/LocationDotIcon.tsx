import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LocationDotIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 640q79 0 149 30t122 83 82 122 31 149q0 79-30 149t-83 122-122 82-149 31q-79 0-149-30t-122-83-82-122-31-149q0-79 30-149t83-122 122-82 149-31z" />
    </svg>
  ),
  displayName: 'LocationDotIcon',
});

export default LocationDotIcon;
