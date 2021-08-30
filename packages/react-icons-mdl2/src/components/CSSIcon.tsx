import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CSSIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1064l128-128v856H0V128h1631q-40 26-73 60t-66 68H128v256h1108l-128 128H128v1024h1664v-600zm56-808q42 0 78 15t63 42 42 63 16 78q0 33-8 57t-21 46-32 40-40 41l-128 128-541 542q-6 48-28 89t-56 72-77 47-92 18H384v-126h256q27 0 50-10t40-29 28-41 10-50q0-48 17-91t48-78 71-56 90-28l387-387 326-325q28-28 64-42t77-15zm-824 1150q26 0 49-10t41-27 28-41 10-50q0-26-10-49t-27-41-41-28-50-10q-26 0-49 10t-41 27-28 41-10 50q0 69-35 128h163zm338-365q-21-29-46-55t-55-46l-115 115q66 35 101 101l115-115zm537-536q21-21 21-51 0-29-21-50t-51-21q-31 0-51 20l-445 445q58 43 102 101l445-444z" />
    </svg>
  ),
  displayName: 'CSSIcon',
});

export default CSSIcon;
