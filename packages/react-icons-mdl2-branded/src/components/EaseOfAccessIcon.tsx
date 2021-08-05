import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const EaseOfAccessIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M3 1024q11-132 61-254t137-223l90 91q-69 82-109 181t-51 205H3zm288-567q101-86 223-136t254-62v128q-106 11-205 51T382 547l-91-90zm-90 1172q-86-101-136-223T3 1152h128q11 106 51 205t109 181l-90 91zm567 288q-132-11-254-61t-223-137l91-90q82 69 181 109t205 51v128zm893-765q-11 132-61 254t-137 223l-90-91q69-82 109-181t51-205h128zm-288 567q-101 86-223 136t-254 62v-128q106-11 205-51t181-109l91 90zM1024 128v768h192l-256 256-256-256h192V128h128zm768 1088v-192h-523l128-128h395V704l256 256-256 256z" />
    </svg>
  ),
  displayName: 'EaseOfAccessIcon',
});

export default EaseOfAccessIcon;
