import BreadcrumbTemplate from './fixtures/breadcrumb.html';
import './index';

export default {
  title: 'Components/Breadcrumb',
};

export const Breadcrumb = (): string => BreadcrumbTemplate;

const example = `
<fluent-breadcrumb>
  <fluent-breadcrumb-item href="#"> Breadcrumb item 1 </fluent-breadcrumb-item>
  <fluent-breadcrumb-item href="#"> Breadcrumb item 2 </fluent-breadcrumb-item>
  <fluent-breadcrumb-item>Breadcrumb item 3</fluent-breadcrumb-item>
</fluent-breadcrumb>
`;

Breadcrumb.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
