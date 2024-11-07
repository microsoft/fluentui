import * as React from 'react';

import { ChicletBasicExample } from './Chiclet.Basic.Example';
import { ChicletBreadcrumbExample } from './Chiclet.Breadcrumb.Example';
import { ChicletFooterExample } from './Chiclet.Footer.Example';
import { ChicletPreviewExample } from './Chiclet.Preview.Example';
import { ChicletXsmallExample } from './Chiclet.Xsmall.Example';
import { ChicletXsmallFooterExample } from './Chiclet.Xsmall.Footer.Example';

export const Basic = () => <ChicletBasicExample />;

export const Breadcrumb = () => <ChicletBreadcrumbExample />;

export const Footer = () => <ChicletFooterExample />;

export const Preview = () => <ChicletPreviewExample />;

export const Xsmall = () => <ChicletXsmallExample />;

export const XsmallFooter = () => <ChicletXsmallFooterExample />;

export default {
  title: 'Components/Chiclet',
};
