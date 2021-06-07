import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MessageFriendRequestIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384v768q-12-23-26-49t-31-51-35-50-36-42V640l-896 448-896-448v896h960l64 128H0V384h2048zm-143 128H143l881 441 881-441zm-97 1075q55 29 99 71t76 94 48 110 17 122v64h-128v-64q0-66-25-124t-69-101-102-69-124-26q-66 0-124 25t-102 69-69 102-25 124v64h-128v-64q0-63 16-121t48-110 76-94 100-72q-54-46-83-109t-29-134q0-66 25-124t68-101 102-69 125-26q66 0 124 25t101 69 69 102 26 124q0 70-29 133t-83 110zm-400-243q0 40 15 75t41 61 61 41 75 15q40 0 75-15t61-41 41-61 15-75q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75z" />
    </svg>
  ),
  displayName: 'MessageFriendRequestIcon',
});

export default MessageFriendRequestIcon;
