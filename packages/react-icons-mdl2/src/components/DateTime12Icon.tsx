import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DateTime12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1707 911q78 37 141 93t108 127 68 152 24 168q0 123-47 232t-128 190-190 128-232 47q-87 0-168-24t-151-68-127-107-94-142H0V171h341V0h171v171h683V0h170v171h342v740zM171 512h1365V341H171v171zm688 1024q-6-42-6-85 0-124 47-233t128-190 190-128 233-47q43 0 85 6V683H171v853h688zm592 341q88 0 165-33t136-92 91-135 34-166q0-88-33-166t-91-136-136-91-166-34q-89 0-166 33t-136 92-91 136-34 166q0 89 33 166t92 135 136 91 166 34zm85-512h171v171h-342v-341h171v170z" />
    </svg>
  ),
  displayName: 'DateTime12Icon',
});

export default DateTime12Icon;
