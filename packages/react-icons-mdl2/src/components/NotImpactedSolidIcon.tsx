import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NotImpactedSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1600 992q-102 0-192 32t-167 88l-189-124-660 1001q-20 29-54 29-18 0-35-11-28-19-28-53 0-19 10-35L946 917 619 702l-20 31q-19 28-47 42t-61 15q-38 0-69-21-28-19-43-47t-15-61q0-37 21-69L738 57q19-28 47-42t60-15q37 0 70 21 28 19 43 47t15 61q0 38-21 69l-21 31 748 493 20-30q19-28 47-43t61-15q37 0 70 21 28 19 42 47t15 61q0 37-21 70l-126 191q-45-14-91-23t-96-9zm317 291q63 64 97 145t34 172q0 91-34 172t-97 144q-64 64-145 98t-172 34q-91 0-172-34t-144-97q-64-64-98-145t-34-172q0-91 34-172t97-144q64-64 145-98t172-34q91 0 172 34t145 97zm-637 317q0 66 25 124t68 102 102 69 125 25q49 0 93-14t83-39l-443-443q-25 38-39 82t-14 94zm587 176q25-38 39-82t14-94q0-66-25-124t-69-101-102-69-124-26q-49 0-93 14t-83 39l443 443z" />
    </svg>
  ),
  displayName: 'NotImpactedSolidIcon',
});

export default NotImpactedSolidIcon;
