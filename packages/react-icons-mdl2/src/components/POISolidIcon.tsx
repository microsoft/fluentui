import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const POISolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0q88 0 170 23t153 64 129 100 100 130 65 153 23 170q0 69-16 131t-48 125l-576 1152L448 896q-31-62-47-124t-17-132q0-88 23-170t64-153 100-129T701 88t153-65 170-23zm0 896q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100q0 53 20 99t55 82 81 55 100 20z" />
    </svg>
  ),
  displayName: 'POISolidIcon',
});

export default POISolidIcon;
