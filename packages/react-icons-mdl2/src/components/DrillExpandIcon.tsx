import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DrillExpandIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0q141 0 272 36t245 103 207 160 160 208 103 245 37 272q0 141-36 272t-103 245-160 207-208 160-245 103-272 37q-141 0-272-36t-245-103-207-160-160-208-103-244-37-273q0-141 36-272t103-245 160-207 208-160T751 37t273-37zm0 1920q123 0 237-32t214-90 182-141 140-181 91-214 32-238q0-123-32-237t-90-214-141-182-181-140-214-91-238-32q-123 0-237 32t-214 90-182 141-140 181-91 214-32 238q0 123 32 237t90 214 141 182 181 140 214 91 238 32zm531-749l90 90-301 301-301-301 90-90 147 146V896H768v421l147-146 90 90-301 301-301-301 90-90 147 146V768h320V384h128v384h320v549l147-146z" />
    </svg>
  ),
  displayName: 'DrillExpandIcon',
});

export default DrillExpandIcon;
