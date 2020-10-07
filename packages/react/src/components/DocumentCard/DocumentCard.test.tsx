import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { DocumentCard } from './DocumentCard';
import { DocumentCardTitle } from './DocumentCardTitle';
import { DocumentCardPreview } from './DocumentCardPreview';
import { DocumentCardActivity } from './DocumentCardActivity';

describe('DocumentCard', () => {
  it('renders DocumentCard correctly', () => {
    const component = renderer.create(
      <DocumentCard>
        <DocumentCardPreview previewImages={[]} />
        <DocumentCardTitle title="" />
        <DocumentCardActivity activity="" people={[{ name: '', profileImageSrc: '' }]} />
      </DocumentCard>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
