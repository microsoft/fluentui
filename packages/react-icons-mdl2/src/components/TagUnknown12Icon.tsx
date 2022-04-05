import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TagUnknown12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1365 427q0-36 25-61t61-25q18 0 33 7t27 18 18 27 7 34q0 35-25 60t-60 25q-18 0-33-6t-27-18-19-27-7-34zM853 1630l248-248q28 74 70 135l-318 318-810-811L1067 0h810v683h-170V171h-606l-853 853 605 606zm683 418v-171h171v171h-171zm85-1195q71 0 133 27t108 73 74 109 27 133q0 61-19 108t-50 87-69 76-79 76q-17 17-25 36t-12 41-3 44 1 44h-171v-64q0-62 19-109t47-84 62-67 61-59 48-59 19-70q0-35-13-66t-37-54-55-37-66-14q-35 0-66 13t-54 37-36 55-14 66h-171q0-70 26-132t73-109 109-74 133-27z" />
    </svg>
  ),
  displayName: 'TagUnknown12Icon',
});

export default TagUnknown12Icon;
