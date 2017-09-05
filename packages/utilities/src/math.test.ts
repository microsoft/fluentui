
import { fitContentToBounds } from './math';
import { expect } from 'chai';

describe('math', () => {
  describe('#fitContentToBounds', () => {
    describe('with contain', () => {
      it('shrinks to fit horizontal', () => {
        expect(fitContentToBounds({
          contentSize: {
            width: 400,
            height: 300
          },
          boundsSize: {
            width: 200,
            height: 200
          },
          mode: 'contain'
        })).to.deep.equal({
          width: 200,
          height: 150
        });
      });

      it('shrinks to fit vertical', () => {
        expect(fitContentToBounds({
          contentSize: {
            width: 300,
            height: 400
          },
          boundsSize: {
            width: 200,
            height: 200
          },
          mode: 'contain'
        })).to.deep.equal({
          width: 150,
          height: 200
        });
      });

      it('does not expand by default', () => {
        expect(fitContentToBounds({
          contentSize: {
            width: 100,
            height: 75
          },
          boundsSize: {
            width: 200,
            height: 200
          },
          mode: 'contain'
        })).to.deep.equal({
          width: 100,
          height: 75
        });
      });

      it('expands if permitted', () => {
        expect(fitContentToBounds({
          contentSize: {
            width: 100,
            height: 75
          },
          boundsSize: {
            width: 200,
            height: 200
          },
          mode: 'contain',
          maxScale: 2
        })).to.deep.equal({
          width: 200,
          height: 150
        });
      });
    });

    describe('with cover', () => {
      it('shrinks to fit horizontal', () => {
        expect(fitContentToBounds({
          contentSize: {
            width: 600,
            height: 400
          },
          boundsSize: {
            width: 200,
            height: 200
          },
          mode: 'cover'
        })).to.deep.equal({
          width: 300,
          height: 200
        });
      });

      it('shrinks to fit vertical', () => {
        expect(fitContentToBounds({
          contentSize: {
            width: 400,
            height: 600
          },
          boundsSize: {
            width: 200,
            height: 200
          },
          mode: 'cover'
        })).to.deep.equal({
          width: 200,
          height: 300
        });
      });

      it('does not expand by default', () => {
        expect(fitContentToBounds({
          contentSize: {
            width: 100,
            height: 50
          },
          boundsSize: {
            width: 200,
            height: 200
          },
          mode: 'cover'
        })).to.deep.equal({
          width: 100,
          height: 50
        });
      });

      it('expands if permitted', () => {
        expect(fitContentToBounds({
          contentSize: {
            width: 100,
            height: 50
          },
          boundsSize: {
            width: 200,
            height: 200
          },
          mode: 'cover',
          maxScale: 4
        })).to.deep.equal({
          width: 400,
          height: 200
        });
      });
    });
  });
});
