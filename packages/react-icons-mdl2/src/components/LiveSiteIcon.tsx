import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LiveSiteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 768q93 0 174 35t142 96 96 142 36 175q0 93-35 174t-96 142-142 96-175 36q-93 0-174-35t-142-96-96-142-36-175q0-93 35-174t96-142 142-96 175-36zm346 384q-15-80-63-145t-120-103q29 58 42 121t17 127h124zm-221 128H834q1 16 4 44t10 60 17 64 24 59 31 44 40 17q21 0 38-17t30-44 24-60 17-65 11-59 5-43zm-251-128h252q-1-15-5-42t-11-59-17-65-24-60-31-45-38-17q-22 0-39 17t-31 44-24 60-17 65-10 59-5 43zm-41-246q-35 19-64 45t-53 57-39 68-23 76h124q4-63 16-125t39-121zm-179 374q14 78 61 142t116 103q-26-57-37-119t-16-126H614zm510 248q71-38 119-103t63-145h-124q-5 63-18 126t-40 122zM1115 0l549 549v1371H256V0h859zm37 219v293h293l-293-293zM384 1792h1152V640h-512V128H384v1664z" />
    </svg>
  ),
  displayName: 'LiveSiteIcon',
});

export default LiveSiteIcon;
