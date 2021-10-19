import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WipePhoneIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M534 1664q-20 52-20 107v10q0 5 1 11H384v-128h150zm965 256h293v128H837l-147-148q-24-25-37-57t-13-67q0-35 13-67t38-58l813-814 538 539-543 544zm5-902l-389 390 357 358 389-390-357-358zm-187 902l65-64-358-357-242 242q-14 14-14 35t14 35l108 109h427zm-767 0q21 41 47 68t60 60H128q-27 0-50-10t-40-27-28-41-10-50V128q0-27 10-50t27-40 41-28 50-10h1024q27 0 50 10t40 27 28 41 10 50v752l-128 128V128H128v1792h422z" />
    </svg>
  ),
  displayName: 'WipePhoneIcon',
});

export default WipePhoneIcon;
