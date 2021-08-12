import BreadcrumbItemTemplate from './fixtures/breadcrumb-item.html';
import './index';

export default {
  title: 'Components/Breadcrumb Item',
};

export const BreadcrumbItem = (): string => BreadcrumbItemTemplate;

const example = `
<fluent-breadcrumb-item href="#"> Breadcrumb item </fluent-breadcrumb-item>
`;

BreadcrumbItem.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
