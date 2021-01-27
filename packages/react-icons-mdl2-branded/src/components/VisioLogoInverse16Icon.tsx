import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const VisioLogoInverse16Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 640v768q0 27-10 50t-27 40-41 28-50 10h-256q0 106-40 199t-109 163-163 110-200 40q-87 0-167-28t-145-80-113-121-69-155H128q-26 0-49-10t-41-27-28-41-10-50V512q0-26 10-49t27-41 41-28 50-10h587l347-347q37-37 90-37t90 37l385 385q37 37 37 90h256q27 0 50 10t40 27 28 41 10 50zm-896-512L896 384h256q26 0 49 10t41 27 28 41 10 50v256l256-256-384-384zM745 1440l315-832H833l-192 559-189-559H220l311 832h214zm407 480q79 0 149-30t122-82 83-122 30-150q0-61-18-117t-52-104-81-83-105-56v360q0 26-10 49t-27 41-41 28-50 10H792q20 57 56 104t83 81 103 52 118 19zm768-512V640h-331l-309 309v93q67 18 126 52t106 81 82 107 52 126h274z" />
    </svg>
  ),
  displayName: 'VisioLogoInverse16Icon',
});

export default VisioLogoInverse16Icon;
