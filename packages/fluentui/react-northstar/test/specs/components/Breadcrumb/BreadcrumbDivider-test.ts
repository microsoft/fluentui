import { isConformant } from 'test/specs/commonTests';
import { BreadcrumbDivider } from 'src/components/Breadcrumb/BreadcrumbDivider';

describe('BreadcrumbDivider', () => {
  isConformant(BreadcrumbDivider, {
    defaultAs: 'span',
    testPath: __filename,
    constructorName: 'BreadcrumbDivider',
  });
});
