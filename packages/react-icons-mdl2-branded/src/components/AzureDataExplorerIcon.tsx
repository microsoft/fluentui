import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const AzureDataExplorerIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1984 0q26 0 45 19t19 45v1785q0 26-19 45t-45 19q-26 0-45-19L154 109q-19-19-19-45t19-45 45-19h1785zm-64 695V128h-541L866 641l554 553 500-499zm-722-567H354l422 422 422-422zm313 1157l409 409V876l-409 409zm-661-178l90 90-768 768-90-90 768-768zm-241 783l512-512 91 91-512 512-91-91zm60-964l-512 512-91-91 512-512 91 91zm627-520l113-114 113 114-113 113-113-113zm460 231l-113 113-114-113 114-113 113 113zm-710 17l113-113 113 113-113 113-113-113zm234 232l113-113 113 113-113 113-113-113z" />
    </svg>
  ),
  displayName: 'AzureDataExplorerIcon',
});

export default AzureDataExplorerIcon;
