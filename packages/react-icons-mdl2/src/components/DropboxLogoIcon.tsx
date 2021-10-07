import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DropboxLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M668 249l356 297-513 316-351-281 508-332zm-508 895l351-282 513 317-356 296-508-331zm864 35l513-317 351 282-508 331-356-296zm864-598l-351 281-513-316 356-297 508 332zm-863 662l357 295 152-99v112l-509 305-509-305v-112l152 99 357-295z" />
    </svg>
  ),
  displayName: 'DropboxLogoIcon',
});

export default DropboxLogoIcon;
