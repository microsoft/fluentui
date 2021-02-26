import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ShieldAlertIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1024 1536H896v-128h128v128zm0-1152v896H896V384h128zm-64 1661l-31-18q-117-67-231-146t-217-170-191-196-152-221-101-249T0 768V256q83 0 161-6t152-22 146-45 144-75q85-55 170-81T960 0q51 0 97 6t89 20 86 34 85 48q72 46 144 75t146 45 152 22 161 6v512q0 146-36 277t-101 248-153 222-191 195-217 171-231 146l-31 18zM128 382v386q0 127 33 244t92 223 138 200 172 178 193 154 204 130q102-59 203-130t194-154 172-177 138-201 91-223 34-244V382q-149-8-285-48t-263-121q-68-44-135-64t-149-21q-81 0-148 20t-136 65q-126 81-262 121t-286 48z" />
    </svg>
  ),
  displayName: 'ShieldAlertIcon',
});

export default ShieldAlertIcon;
