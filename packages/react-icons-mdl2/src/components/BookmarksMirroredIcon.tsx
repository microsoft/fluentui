import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BookmarksMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 512V384h-128v128h128zm-384-128H0v128h1664V384zm384 1280v-128h-128v128h128zm-384 0v-128H0v128h1664zm-512-768V768H0v128h1152zm-512 384v-128H0v128h640z" />
    </svg>
  ),
  displayName: 'BookmarksMirroredIcon',
});

export default BookmarksMirroredIcon;
