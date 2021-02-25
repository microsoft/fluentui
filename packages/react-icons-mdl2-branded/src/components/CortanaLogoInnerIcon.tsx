import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const CortanaLogoInnerIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1024 128q124 0 238 32t214 90 181 140 140 181 91 214 32 239q0 124-32 238t-90 214-140 181-181 140-214 91-239 32q-124 0-238-32t-214-90-181-140-140-181-91-214-32-239q0-124 32-238t90-214 140-181 181-140 214-91 239-32zm0 1617q99 0 191-26t173-72 146-113 112-146 73-172 26-192q0-99-26-191t-72-173-113-146-146-112-172-73-192-26q-99 0-191 26t-173 72-146 113-112 146-73 172-26 192q0 99 26 191t72 173 113 146 146 112 172 73 192 26z" />
    </svg>
  ),
  displayName: 'CortanaLogoInnerIcon',
});

export default CortanaLogoInnerIcon;
