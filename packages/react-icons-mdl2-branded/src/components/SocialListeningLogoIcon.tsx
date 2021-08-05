import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const SocialListeningLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1771 128q29 0 54 11t45 30 30 44 11 55v265h-249q-17-41-52-65t-80-24q-29 0-55 11t-45 30-31 46-11 55q0 19 5 36t15 34l-265 306q-33-21-74-21-38 0-70 19t-52 51L603 834q5-18 5-35 0-29-11-55t-30-45-46-31-55-11q-45 0-81 25t-52 68l-196-1V268q0-29 11-54t30-45 44-30 55-11h1494zm-241 600q27 0 51-9t42-26 31-39 16-50h241v664q0 29-11 54t-30 45-44 30-55 11h-663l-533 512 36-512H277q-29 0-54-11t-45-30-30-44-11-55V820l189 1q4 26 16 48t32 38 42 25 50 9q29 0 56-12t47-33l359 184v1l-1 2q-1 29 10 54t32 45 46 31 54 11q29 0 55-11t45-30 31-45 11-55q0-38-19-69l265-307q17 10 35 15t38 6z" />
    </svg>
  ),
  displayName: 'SocialListeningLogoIcon',
});

export default SocialListeningLogoIcon;
