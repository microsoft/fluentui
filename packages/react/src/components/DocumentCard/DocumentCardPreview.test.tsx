import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { DocumentCardPreview } from './DocumentCardPreview';
import { TestImages } from '@fluentui/example-data';

describe('DocumentCardPreview', () => {
  it('renders DocumentCardPreview with an Image (no icon) and "alt" prop', () => {
    const component = renderer.create(
      <DocumentCardPreview
        previewImages={[
          {
            name: 'Contoso Marketing Presentation',
            linkProps: {
              href: 'http://bing.com',
            },
            previewImageSrc: TestImages.documentPreview,
            width: 144,
            alt: 'Some fancy Contoso Image',
          },
        ]}
      />,
    );
    const root = component.root;

    const imgWrapper = root.findAll(n => {
      if (!n.props.className) {
        return false;
      }
      return n.type === 'div' && n.props.className.indexOf('ms-DocumentCardPreview-icon') > -1;
    });
    expect(imgWrapper).toHaveLength(0);

    const img = root.find(n => n.type === 'img');
    expect(img.props.alt).toEqual('Some fancy Contoso Image');

    expect(component.toJSON()).toMatchSnapshot();
  });
  it('renders DocumentCardPreview with an Image (w/ icon) and "alt" prop', () => {
    const component = renderer.create(
      <DocumentCardPreview
        previewImages={[
          {
            name: 'Contoso Marketing Presentation',
            linkProps: {
              href: 'http://bing.com',
            },
            iconSrc: TestImages.iconPpt,
            width: 144,
            alt: 'Some fancy Contoso Image',
          },
        ]}
      />,
    );
    const root = component.root;

    const imgWrapper = root.findAll(n => {
      if (!n.props.className) {
        return false;
      }
      return n.type === 'div' && n.props.className.indexOf('ms-DocumentCardPreview-icon') > -1;
    });
    expect(imgWrapper).toHaveLength(1);

    const img = root.findAll(n => {
      return n.type === 'img';
    });
    expect(img[0].props.alt).toEqual('Some fancy Contoso Image');
    expect(img[1].props.alt).toEqual('Some fancy Contoso Image');

    expect(component.toJSON()).toMatchSnapshot();
  });
});
