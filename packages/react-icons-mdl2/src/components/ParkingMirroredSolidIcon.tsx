import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ParkingMirroredSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M29 1075q-29 64-29 133v72q0 38 10 73t30 65 48 54 62 40q15 35 39 63t55 47 66 31 74 11q69 0 128-34t94-94h708q35 60 94 94t128 34q69 0 128-34t94-94h162q27 0 50-10t40-27 28-41 10-50v-256q0-79-30-149t-82-122-122-83-150-30h-37l-328-328q-27-27-62-41t-74-15H256v128h29L29 1075zm1507 461q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10zM896 512h267q26 0 45 19l237 237H896V512zM768 768H309l99-219q8-17 24-27t35-10h301v256zm-384 768q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10z" />
    </svg>
  ),
  displayName: 'ParkingMirroredSolidIcon',
});

export default ParkingMirroredSolidIcon;
