import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UserFollowedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1397 1550q-21-114-78-210t-141-166-189-110-221-40q-88 0-170 23t-153 64-129 100-100 130-65 153-23 170H0q0-117 35-229t101-207 157-169 203-113q-56-36-100-83t-76-103-47-119-17-129q0-106 40-199t109-163T568 40 768 0q106 0 199 40t163 109 110 163 40 200q0 66-16 129t-48 119-75 103-101 83q99 38 183 100t147 143 105 177 54 202l-57 58-75-76zM384 512q0 80 30 149t82 122 122 83 150 30q79 0 149-30t122-82 83-122 30-150q0-79-30-149t-82-122-123-83-149-30q-80 0-149 30t-122 82-83 123-30 149zm1645 941l-557 558-269-270 90-90 179 178 467-466 90 90z" />
    </svg>
  ),
  displayName: 'UserFollowedIcon',
});

export default UserFollowedIcon;
