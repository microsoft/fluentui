import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FullHistoryIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 512h128v512H896V512zM512 768H0V256h128v274q67-123 163-221t212-166T752 37t272-37q141 0 272 36t245 103 207 160 160 208 103 245 37 272h-128q0-123-32-237t-90-214-141-182-181-140-214-91-238-32q-129 0-251 36T546 267 355 428 215 640h297v128zm512 384h1024v128H1024v-128zm0 384h1024v128H1024v-128zm0 384h1024v128H1024v-128zm-863-657q36 129 105 239t166 194 214 140 250 74v130q-154-21-292-83t-250-158-193-224-123-278l123-34z" />
    </svg>
  ),
  displayName: 'FullHistoryIcon',
});

export default FullHistoryIcon;
