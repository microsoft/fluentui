import { expect } from 'chai';
import { SwatchRGB } from '../swatch';
import { black } from '../utilities/color-constants';
import { foregroundOnAccent } from './foreground-on-accent';

describe('Cut text', (): void => {
  it('should return black when background does not meet contrast ratio', (): void => {
    const small = foregroundOnAccent(SwatchRGB.create(1, 1, 1), 4.5) as SwatchRGB;
    const large = foregroundOnAccent(SwatchRGB.create(1, 1, 1), 3) as SwatchRGB;

    expect(small.r).to.equal(black.r);
    expect(small.g).to.equal(black.g);
    expect(small.b).to.equal(black.b);

    expect(large.r).to.equal(black.r);
    expect(large.g).to.equal(black.g);
    expect(large.b).to.equal(black.b);
  });
});
