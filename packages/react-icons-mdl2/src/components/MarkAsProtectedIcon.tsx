import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MarkAsProtectedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1193 1611L489 907l283-283 704 704-283 283zm102-283L772 805 670 907l523 523 102-102zm369 592v-640h128v768H128V0h922L922 128H256v1792h1408zm305-1481l-215 87 245 245-268 268-72-73-89 86-582-582 89-86-70-69 268-268 241 242 91-212 74-74 362 362-74 74zm-275-242l-98 168 79 82 172-97-153-153zm124 574l-543-543-110 121 543 543 110-121z" />
    </svg>
  ),
  displayName: 'MarkAsProtectedIcon',
});

export default MarkAsProtectedIcon;
