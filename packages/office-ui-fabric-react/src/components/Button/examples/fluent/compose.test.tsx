import { getClassName } from './compose';

describe('compose', () => {
  describe('getClassName', () => {
    it('returns nothing in the default case', () => {
      expect(getClassName({}, {}, '', [])).toEqual({});
    });

    it('returns classNames for a single slot', () => {
      expect(getClassName({}, {}, '', ['root'])).toEqual({ root: '' });
    });

    it('returns customized classNames for a single slot', () => {
      const cssRenderer = (args: any) => {
        if (args.background === '#fff') {
          return 'correct';
        }
        return 'incorrect';
      };
      expect(
        getClassName(
          {
            components: {
              foo: {
                variants: {
                  primary: {
                    true: {
                      root: {
                        background: '#fff'
                      }
                    }
                  }
                }
              }
            }
          },
          { primary: true },
          'foo',
          ['root'],
          cssRenderer
        )
      ).toEqual({ root: 'correct' });
    });

    it('returns customized classNames for a single slot when multiple variants are specified', () => {
      const cssRenderer = (args: any) => {
        if (args.background === '#fff' && args.color === '#000') {
          return 'correct';
        }
        return 'incorrect';
      };
      expect(
        getClassName(
          {
            components: {
              foo: {
                variants: {
                  primary: {
                    true: {
                      root: {
                        background: '#fff'
                      }
                    }
                  },
                  disabled: {
                    true: {
                      root: {
                        color: '#000'
                      }
                    }
                  }
                }
              }
            }
          },
          { primary: true, disabled: true },
          'foo',
          ['root'],
          cssRenderer
        )
      ).toEqual({ root: 'correct' });
    });

    it('returns customized classNames for ennumerated variants', () => {
      const cssRenderer = (args: any) => {
        if (args.background === '#fff') {
          return 'correct';
        }
        return 'incorrect';
      };
      expect(
        getClassName(
          {
            components: {
              foo: {
                variants: {
                  primary: {
                    very: {
                      root: {
                        background: '#fff'
                      }
                    }
                  }
                }
              }
            }
          },
          { primary: 'very' },
          'foo',
          ['root'],
          cssRenderer
        )
      ).toEqual({ root: 'correct' });
    });
  });
});
