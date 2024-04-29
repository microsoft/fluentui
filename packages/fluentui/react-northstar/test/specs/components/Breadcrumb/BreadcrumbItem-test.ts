import { isConformant } from 'test/specs/commonTests';
import { BreadcrumbItem } from 'src/components/Breadcrumb/BreadcrumbItem';

describe('BreadcrumbItem', () => {
  isConformant(BreadcrumbItem, {
    testPath: __filename,
    constructorName: 'BreadcrumbItem',
  });
});
