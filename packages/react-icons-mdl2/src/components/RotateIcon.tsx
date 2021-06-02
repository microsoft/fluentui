import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RotateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 768q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55 100-20zm0 384q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10zm1024-128q0 140-37 272t-105 248-167 213-221 163h274v128h-512v-512h128v297q117-55 211-140t162-190 103-228 36-251q0-123-32-237t-90-214-141-182-181-140-214-91-238-32q-123 0-237 32t-214 90-182 141-140 181-91 214-32 238H0q0-141 36-272t103-245 160-207 208-160T751 37t273-37q141 0 272 36t245 103 207 160 160 208 103 245 37 272z" />
    </svg>
  ),
  displayName: 'RotateIcon',
});

export default RotateIcon;
