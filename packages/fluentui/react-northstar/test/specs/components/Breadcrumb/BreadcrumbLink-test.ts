import { isConformant } from 'test/specs/commonTests';
import { BreadcrumbLink } from 'src/components/Breadcrumb/BreadcrumbLink';

describe('BreadcrumbLink', () => {
  isConformant(BreadcrumbLink, {
    testPath: __filename,
    constructorName: 'BreadcrumbLink',
  });
});
