/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { Image } from './Image';
import { ImageFit } from './Image.Props';

const testImage1x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';
const testImage1x2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWP4////fyYGBgYGAB32A/+PRyXoAAAAAElFTkSuQmCC';
const testImage2x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEUlEQVQImWP8////fwYGBgYAGfgD/hEzDhoAAAAASUVORK5CYII=';

describe('Image', () => {

  it('renders an image', (done) => {
    ReactTestUtils.renderIntoDocument(
      <Image
        src={ testImage1x1 }
        onLoad={ () => {
          done();
        } }
        />
    );
  });

  it('can cover a portrait (tall) frame with a square image', (done) => {
    let root = document.createElement('div');
    document.body.appendChild(root);
    ReactDOM.render<HTMLDivElement>(
      <Image
        src={ testImage1x1 }
        width={ 1 }
        height={ 3 }
        imageFit={ ImageFit.cover }
        className='is-portraitFrame'
        />, root
    );

    let image = document.querySelector('.ms-Image.is-portraitFrame .ms-Image-image');
    try {
      expect(image.className).to.contain('ms-Image-image--landscape');
    } catch (e) { done(e); }

    done();
  });

  it('can cover a landscape (wide) frame with a square image', (done) => {
    let root = document.createElement('div');
    document.body.appendChild(root);
    ReactDOM.render<HTMLDivElement>(
      <Image
        src={ testImage1x1 }
        width={ 3 }
        height={ 1 }
        imageFit={ ImageFit.cover }
        className='is-landscapeFrame'
        />, root
    );

    let image = document.querySelector('.ms-Image.is-landscapeFrame .ms-Image-image');
    try {
      expect(image.className).to.contain('ms-Image-image--portrait');
    } catch (e) { done(e); }

    done();
  });

});
