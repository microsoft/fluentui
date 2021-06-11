import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CrownSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1354 1167l438-527v1280H256V640l445 526 323-526 330 527zM384 384q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50zm640 128q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10zm768-256q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10z" />
    </svg>
  ),
  displayName: 'CrownSolidIcon',
});

export default CrownSolidIcon;
