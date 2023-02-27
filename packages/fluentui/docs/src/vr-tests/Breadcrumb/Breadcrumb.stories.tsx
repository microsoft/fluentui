import { ComponentMeta } from '@storybook/react';
import { Breadcrumb } from '@fluentui/react-northstar';
import BreadcrumbExampleIconDivider from '../../examples/components/Breadcrumb/Content/BreadcrumbExampleIconDivider';
import BreadcrumbExample from '../../examples/components/Breadcrumb/Types/BreadcrumbExampleBasic';
import BreadcrumbExampleSizes from '../../examples/components/Breadcrumb/Variations/BreadcrumbExampleSizes';

export default { component: Breadcrumb, title: 'Breadcrumb' } as ComponentMeta<typeof Breadcrumb>;

export { BreadcrumbExampleIconDivider, BreadcrumbExample, BreadcrumbExampleSizes };
