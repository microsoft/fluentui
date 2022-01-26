import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReportDocumentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 549v1499H256V0h987l549 549zm-512-37h293l-293-293v293zm384 1408V640h-512V128H384v1792h1280zm-768-512h256v384H896v-384zm-384-256h256v640H512v-640zm768-256h256v896h-256V896z" />
    </svg>
  ),
  displayName: 'ReportDocumentIcon',
});

export default ReportDocumentIcon;
