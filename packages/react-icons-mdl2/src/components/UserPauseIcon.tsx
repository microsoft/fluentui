import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UserPauseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1168 946q86 33 161 85t138 121h-189q-83-62-180-95t-202-33q-88 0-170 23t-153 64-129 100-100 130-65 153-23 170H128q0-120 35-231t101-205 156-167 204-115q-113-74-176-186t-64-248q0-106 40-199t109-163T696 40 896 0q106 0 199 40t163 109 110 163 40 200q0 66-16 129t-48 119-75 103-101 83zM512 512q0 80 30 149t82 122 122 83 150 30q79 0 149-30t122-82 83-122 30-150q0-79-30-149t-82-122-123-83-149-30q-80 0-149 30t-122 82-83 123-30 149zm1408 768v768h-128v-768h128zm-512 0h128v768h-128v-768z" />
    </svg>
  ),
  displayName: 'UserPauseIcon',
});

export default UserPauseIcon;
