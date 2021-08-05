import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AddFavoriteFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1860 832l-519 399 90 286-23 19h-128v78l-39 28-217-167-519 399 202-643-519-399h643l193-618 193 618h643z" />
    </svg>
  ),
  displayName: 'AddFavoriteFillIcon',
});

export default AddFavoriteFillIcon;
