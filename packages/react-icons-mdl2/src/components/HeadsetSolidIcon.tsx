import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HeadsetSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0q106 0 204 27t183 78 156 120 120 155 77 184 28 204v544q0 40-28 68t-68 28h-288V768h256q0-88-23-170t-64-153-100-129-130-100-153-65-170-23q-88 0-170 23t-153 64-129 100-100 130-65 153-23 170h256v640H512v128q0 53 20 99t55 82 81 55 100 20v-48q0-33 23-56t57-24h352q33 0 56 23t24 57v224q0 33-23 56t-57 24H848q-33 0-56-23t-24-57v-48q-80 0-150-30t-122-82-82-122-30-150v-128h-32q-40 0-68-28t-28-68V768q0-106 27-204t78-183 120-156 155-120 184-77 204-28z" />
    </svg>
  ),
  displayName: 'HeadsetSolidIcon',
});

export default HeadsetSolidIcon;
