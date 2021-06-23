import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ClearNightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 1536q141 0 272-36t244-104 207-160 161-207 103-245 37-272q0-133-34-261T1019 8q128 16 245 61t217 115 181 161 138 199 89 229 31 251q0 141-36 272t-104 244-160 207-207 161-245 103-272 37q-138 0-269-36t-246-103-212-164T5 1528q31 4 61 6t62 2zm768 384q124 0 238-32t214-90 181-140 140-181 91-214 32-239q0-136-40-263t-112-236-176-194-229-136q45 155 45 317 0 146-35 282t-100 258-157 225-205 182-244 129-277 68q128 128 290 196t344 68z" />
    </svg>
  ),
  displayName: 'ClearNightIcon',
});

export default ClearNightIcon;
