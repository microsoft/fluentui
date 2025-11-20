import { isConformant } from 'test/specs/commonTests';
import { CarouselPaddle } from 'src/components/Carousel/CarouselPaddle';

describe('CarouselPaddle', () => {
  isConformant(CarouselPaddle, { defaultAs: 'button', testPath: __filename, constructorName: 'CarouselPaddle' });
});
