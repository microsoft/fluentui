/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';

import { Image } from './Image';
import { ImageFit, ImageLoadState, ImageCoverStyle } from './Image.Props';

/* tslint:disable:no-unused-variable */
const testImage1x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';
const testImage1x2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWP4////fyYGBgYGAB32A/+PRyXoAAAAAElFTkSuQmCC';
const testImage2x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEUlEQVQImWP8////fwYGBgYAGfgD/hEzDhoAAAAASUVORK5CYII=';
const brokenImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';
/* tslint:enable:no-unused-variable */

describe('Image', () => {

  it('renders an image', (done) => {
    let component = ReactTestUtils.renderIntoDocument(
      <Image
        src={ testImage1x1 }
        onLoad={ () => done() }
      />
    );

    let image = ReactTestUtils.findRenderedDOMComponentWithTag(component as any, 'img');
    ReactTestUtils.Simulate.load(image);

  });

  it.only('can cover a portrait (tall) frame with a square image', (done) => {
    // let root = document.createElement('div');
    // let onLoadingStateChange = (loadState: ImageLoadState) => {
    //   if (loadState === ImageLoadState.loaded) {
    //     let image = document.querySelector('.ms-Image.is-portraitFrame .ms-Image-image') as Element;
    //     try {
    //       expect(image.className).to.contain('ms-Image-image--landscape');
    //     } catch (e) { done(e); }
    //     done();
    //   }
    // };
    // document.body.appendChild(root);
    // ReactDOM.render<HTMLDivElement>(
    //   <Image
    //     src={ testImage1x1 }
    //     width={ 1 }
    //     height={ 3 }
    //     imageFit={ ImageFit.cover }
    //     className='is-portraitFrame'
    //     onLoadingStateChange={ onLoadingStateChange }
    //   />, root
    // );

    let component = mount(
      <div>
        <Image
          src={ testImage1x1 }
          width={ 1 }
          height={ 3 }
          imageFit={ ImageFit.cover }
          className='is-portraitFrame'
          onLoadingStateChange={ () => {
            // console.log('ONLOADCHANGE', component.find('img').getNode());
            expect(component.find('.ms-Image-image--landscape')).toHaveLength(1);
            done();
          } }
        />
      </div>
    );
   // console.log('AFTER MOUNT', component.find('img').getNode());

    component.find('img').simulate('load');
  });

  it('can cover a landscape (wide) frame with a square image', () => {
    let component = mount(
      <div>
        <Image
          src={ testImage1x1 }
          width={ 3 }
          height={ 1 }
          imageFit={ ImageFit.cover }
          className='is-landscapeFrame'

        />
      </div>
    );

    expect(component.find('.ms-Image-image--portrait')).toHaveLength(1);
  });

  it('can cover a landscape (wide) parent element with a square image', () => {
    // let root = document.createElement('div');
    // let onLoadingStateChange = (loadState: ImageLoadState) => {
    //   if (loadState === ImageLoadState.loaded) {
    //     let image = document.querySelector('.ms-Image.is-frameMaximizedPortrait .ms-Image-image') as Element;
    //     try {
    //       expect(image.className).to.contain('ms-Image-image--portrait');
    //     } catch (e) { done(e); }
    //     done();
    //   }
    // };
    // document.body.appendChild(root);
    // ReactDOM.render<HTMLDivElement>(
    //   <div style={ { width: '20px', height: '10px' } }>
    //     <Image
    //       className='is-frameMaximizedPortrait'
    //       imageFit={ ImageFit.cover }
    //       maximizeFrame
    //       src={ testImage1x1 }
    //       onLoadingStateChange={ onLoadingStateChange }
    //     />
    //   </div>, root
    // );

    let component = mount(
      <div style={ { width: '20px', height: '10px' } }>
        <Image
          className='is-frameMaximizedPortrait'
          imageFit={ ImageFit.cover }
          maximizeFrame
          src={ testImage1x1 }
        />
      </div>);

    expect(component.find('.ms-Image-image--landscape')).toHaveLength(1);
  });

  it('can cover a portrait (tall) parent element with a square image', (done) => {
    // let root = document.createElement('div');
    // let onLoadingStateChange = (loadState: ImageLoadState) => {
    //   if (loadState === ImageLoadState.loaded) {
    //     let image = document.querySelector('.ms-Image.is-frameMaximizedLandscape .ms-Image-image') as Element;
    //     try {
    //       expect(image.className).to.contain('ms-Image-image--landscape');
    //     } catch (e) { done(e); }
    //     done();
    //   }
    // };
    // document.body.appendChild(root);
    // ReactDOM.render<HTMLDivElement>(
    //   <div style={ { width: '10px', height: '20px' } }>
    //     <Image
    //       src={ testImage1x1 }
    //       imageFit={ ImageFit.cover }
    //       className='is-frameMaximizedLandscape'
    //       onLoadingStateChange={ onLoadingStateChange }
    //       maximizeFrame
    //     />
    //   </div>, root
    // );

    let component = mount(
      <div style={ { width: '10px', height: '20px' } }>
        <Image
          src={ testImage1x1 }
          imageFit={ ImageFit.cover }
          className='is-frameMaximizedLandscape'
          maximizeFrame
        />
      </div>
    );

    expect(component.find('.ms-Image-image--landscape')).toHaveLength(1);
  });

  it('allows onError events to be attached', (done) => {
    let component = ReactTestUtils.renderIntoDocument(
      <Image
        src={ brokenImage }
        onError={ () => done() }
      />
    );

    let img = ReactTestUtils.findRenderedDOMComponentWithTag(component as any, 'img');
    ReactTestUtils.Simulate.error(img);
  });
});
