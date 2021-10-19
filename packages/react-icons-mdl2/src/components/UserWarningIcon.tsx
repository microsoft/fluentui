import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UserWarningIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1219 1044l-59 118q-85-66-184-102t-208-36q-88 0-170 23t-153 64-129 100-100 130-65 153-23 170H0q0-120 35-231t101-205 156-167 204-115q-113-74-176-186t-64-248q0-106 40-199t109-163T568 40 768 0q106 0 199 40t163 109 110 163 40 200q0 66-16 129t-48 119-75 103-101 83q96 37 179 98zM384 512q0 80 30 149t82 122 122 83 150 30q79 0 149-30t122-82 83-122 30-150q0-79-30-149t-82-122-123-83-149-30q-80 0-149 30t-122 82-83 123-30 149zm1024 896h128v320h-128v-320zm0 512v-128h128v128h-128zm64-1024l576 1152H896l576-1152zm0 250l-395 790h790l-395-790z" />
    </svg>
  ),
  displayName: 'UserWarningIcon',
});

export default UserWarningIcon;
