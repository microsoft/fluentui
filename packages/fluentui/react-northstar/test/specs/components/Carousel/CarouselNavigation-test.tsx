import { isConformant } from 'test/specs/commonTests';
import { CarouselNavigation } from 'src/components/Carousel/CarouselNavigation';

describe('CarouselNavigation', () => {
  isConformant(CarouselNavigation, {
    defaultAs: 'ul',
    testPath: __filename,
    constructorName: 'CarouselNavigation',
    skipAsPropTests: 'as-component',
  });
});
