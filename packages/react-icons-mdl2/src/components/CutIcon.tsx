import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CutIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1416 1536q51 2 96 22t79 56 53 81 20 97q0 53-20 99t-55 81-82 55-99 21q-53 0-99-20t-81-55-55-81-21-100q0-71 36-132t100-94l-266-531-265 529q32 17 57 41t44 54 28 63 10 70q0 53-20 99t-55 81-82 55-99 21q-53 0-99-20t-81-55-55-81-21-100q0-51 19-96t52-80 77-56 96-24l322-646-339-678 58-175 353 708 353-708 58 175-339 678 322 646zm-776 384q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10zm768 0q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10z" />
    </svg>
  ),
  displayName: 'CutIcon',
});

export default CutIcon;
