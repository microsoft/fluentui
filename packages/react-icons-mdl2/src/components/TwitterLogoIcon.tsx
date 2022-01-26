import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TwitterLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 389q-42 63-95 117t-115 100q1 14 1 27t1 28q0 126-27 249t-78 238q-74 167-185 298t-251 223-307 139-348 48q-172 0-335-47T0 1667q49 6 100 6 143 0 276-46t246-134q-67-1-129-22t-113-60-90-92-60-117q20 3 39 5t40 2q56 0 110-15-74-15-135-53t-107-92-70-123-25-144v-5q88 50 191 53-44-30-78-68t-59-84-37-95-13-103q0-56 14-109t43-102q80 99 178 177t208 135 232 88 248 39q-6-23-8-47t-3-49q0-87 33-163t90-134 133-90 164-33q88 0 167 34t140 99q71-14 137-39t129-63q-23 73-70 133t-114 99q126-15 241-66z" />
    </svg>
  ),
  displayName: 'TwitterLogoIcon',
});

export default TwitterLogoIcon;
