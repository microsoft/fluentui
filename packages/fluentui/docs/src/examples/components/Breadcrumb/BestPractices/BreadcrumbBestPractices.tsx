import * as React from 'react';
import { Text } from '@fluentui/react-northstar';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';
import { link } from '../../../../utils/helpers';

const doList = [
  'Place Breadcrumbs at the top of a page, above a list of items, or above the main content of a page.',
  <Text>
    Choose desired accessibility behavior depending on the use case. (Check the {link('Behaviors', '/behaviors/menu')}{' '}
    section).
  </Text>,
  'Provide label to the Breadcrumb component using `aria-label` or `aria-labelledby` prop.',
  '`aria-current="page"` should be used in the current BreadcrumbItem, to indicate which page is currently displayed. If the BreadcrumbItem representing the current page is not a link, `aria-current` is optional.',
];

const dontList = ["Don't use Breadcrumbs as a primary way to navigate an app or site."];

const BreadcrumbBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />;
};

export default BreadcrumbBestPractices;
