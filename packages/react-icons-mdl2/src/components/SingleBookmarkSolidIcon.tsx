import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SingleBookmarkSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 0h1280v2048l-640-323-640 323V0z" />
    </svg>
  ),
  displayName: 'SingleBookmarkSolidIcon',
});

export default SingleBookmarkSolidIcon;
