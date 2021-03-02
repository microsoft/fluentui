import { isConformant } from 'test/specs/commonTests';
import { CarouselNavigationItem } from 'src/components/Carousel/CarouselNavigationItem';

describe('CarouselNavigationItem', () => {
  isConformant(CarouselNavigationItem, { testPath: __filename, constructorName: 'CarouselNavigationItem' });
});
