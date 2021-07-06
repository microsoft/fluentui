import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UpdateRestoreIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0q141 0 272 36t245 103 207 160 160 208 103 245 37 272q0 141-36 272t-103 245-160 207-208 160-245 103-272 37q-172 0-330-55t-289-154-226-238-141-304l123-34q40 145 123 265t198 208 253 135 289 49q123 0 237-32t214-90 182-141 140-181 91-214 32-238q0-123-32-237t-90-214-141-182-181-140-214-91-238-32q-129 0-251 36T546 267 355 428 215 640h297v128H0V256h128v274q67-123 163-221t212-166T752 37t272-37z" />
    </svg>
  ),
  displayName: 'UpdateRestoreIcon',
});

export default UpdateRestoreIcon;
