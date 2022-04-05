import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FacebookLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0q141 0 272 36t244 104 207 160 161 207 103 245 37 272q0 126-29 244t-84 225-132 196-174 161-208 118-237 68v-716h239l45-296h-284V832q0-55 18-87t48-48 68-21 79-5h42q21 0 41 1V420q-56-10-114-15t-115-5q-93 0-165 28t-121 80-75 125-26 165v226H604v296h260v716q-125-19-237-67t-208-118-173-161-132-197-84-224-30-245q0-141 36-272t104-244 160-207 207-161T752 37t272-37z" />
    </svg>
  ),
  displayName: 'FacebookLogoIcon',
});

export default FacebookLogoIcon;
