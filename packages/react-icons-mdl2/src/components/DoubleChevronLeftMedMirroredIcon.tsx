import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleChevronLeftMedMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M903 146l879 878-879 878 121 121 999-999-999-999-121 121zm-853 0l878 878-878 878 121 121 999-999L171 25 50 146z" />
    </svg>
  ),
  displayName: 'DoubleChevronLeftMedMirroredIcon',
});

export default DoubleChevronLeftMedMirroredIcon;
