import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PlaybackRate1xIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1024q0 140-37 272t-106 248-167 212-221 164h275v128h-512v-512h128v294q117-55 211-139t161-190 103-226 37-251q0-123-32-237t-90-214-141-182-181-140-214-91-238-32q-123 0-237 32t-214 90-182 141-140 181-91 214-32 238q0 150 48 289t135 253 208 197 266 124l-34 123q-110-31-208-84t-182-124-151-159-113-187-72-208-25-224q0-141 36-272t104-244 160-207 207-161T752 37t272-37q141 0 272 36t244 104 207 160 161 207 103 245 37 272zm-512 0l-768 443V581l768 443zm-640 222l384-222-384-222v444z" />
    </svg>
  ),
  displayName: 'PlaybackRate1xIcon',
});

export default PlaybackRate1xIcon;
