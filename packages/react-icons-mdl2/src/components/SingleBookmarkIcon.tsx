import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SingleBookmarkIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 0v2048l-640-323-640 323V0h1280zm-128 128H512v1712q129-65 256-130t256-129q129 64 256 129t256 130V128z" />
    </svg>
  ),
  displayName: 'SingleBookmarkIcon',
});

export default SingleBookmarkIcon;
