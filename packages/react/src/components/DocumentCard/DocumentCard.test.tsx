import * as React from 'react';
import { render } from '@testing-library/react';

import { DocumentCard } from './DocumentCard';
import { DocumentCardTitle } from './DocumentCardTitle';
import { DocumentCardPreview } from './DocumentCardPreview';
import { DocumentCardActivity } from './DocumentCardActivity';

describe('DocumentCard', () => {
  it('renders DocumentCard correctly', () => {
    const { container } = render(
      <DocumentCard>
        <DocumentCardPreview previewImages={[]} />
        <DocumentCardTitle title="" />
        <DocumentCardActivity activity="" people={[{ name: '', profileImageSrc: '' }]} />
      </DocumentCard>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
