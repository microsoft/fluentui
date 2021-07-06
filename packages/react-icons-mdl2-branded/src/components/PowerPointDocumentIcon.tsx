import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const PowerPointDocumentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 475v1445q0 27-10 50t-27 40-41 28-50 10H640q-27 0-50-10t-40-27-28-41-10-50v-256H115q-24 0-44-9t-37-25-25-36-9-45V627q0-24 9-44t25-37 36-25 45-9h397V128q0-27 10-50t27-40 41-28 50-10h933q26 0 49 9t42 28l347 347q18 18 27 41t10 50zm-384-256v165h165l-165-165zM368 752v672h150v-226h100q52 0 97-15t78-46 53-72 20-97q0-56-17-97t-50-67-76-39-97-13H368zm1552 1168V512h-256q-27 0-50-10t-40-27-28-41-10-50V128H640v384h397q24 0 44 9t37 25 25 36 9 45v922q0 24-9 44t-25 37-36 25-45 9H640v256h1280zM1536 640q79 0 149 30t122 82 83 123 30 149h-384V640zm-128 128v384h384q0 80-30 149t-82 122-123 83-149 30q-33 0-65-6t-63-18V792q31-11 63-17t65-7zm-804 300h-86V883h90q47 0 74 20t27 70q0 52-28 73t-77 22z" />
    </svg>
  ),
  displayName: 'PowerPointDocumentIcon',
});

export default PowerPointDocumentIcon;
