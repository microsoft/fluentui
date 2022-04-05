import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const MTMLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M959 995L436 653l523-342 533 342-533 342zm714 12q40 29 87 69t89 89 70 102 28 108q0 63-36 103t-89 63-113 32-108 11q-51 2-102 3t-103 1h-13q-45 0-91-1t-91-11l-242 161-570-359v-202q-36-25-78-59t-86-76-84-86-72-94-50-98-19-97q0-45 18-78t47-55 68-37 79-21 81-10 74-3q12 0 18 7t10 19q-27 30-60 64t-61 73-48 79-20 87q0 44 17 84t43 75 58 65 65 56V786l570 359 571-353v513l-185 132q38 5 77 13t78 8q20 0 49-1t63-7 67-14 60-24 43-36 17-51q0-26-12-51t-32-47-41-41-41-33v-146z" />
    </svg>
  ),
  displayName: 'MTMLogoIcon',
});

export default MTMLogoIcon;
