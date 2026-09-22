import * as React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../../Button/Button';
import { TeachingPopover } from './TeachingPopover';
import { TeachingPopoverBody } from '../TeachingPopoverBody/TeachingPopoverBody';
import { teachingPopoverBodyClassNames } from '../TeachingPopoverBody/useTeachingPopoverBodyStyles.styles';
import { TeachingPopoverFooter } from '../TeachingPopoverFooter/TeachingPopoverFooter';
import { teachingPopoverFooterClassNames } from '../TeachingPopoverFooter/useTeachingPopoverFooterStyles.styles';
import { TeachingPopoverHeader } from '../TeachingPopoverHeader/TeachingPopoverHeader';
import { teachingPopoverHeaderClassNames } from '../TeachingPopoverHeader/useTeachingPopoverHeaderStyles.styles';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { teachingPopoverSurfaceClassNames } from '../TeachingPopoverSurface/useTeachingPopoverSurfaceStyles.styles';
import { TeachingPopoverTitle } from '../TeachingPopoverTitle/TeachingPopoverTitle';
import { teachingPopoverTitleClassNames } from '../TeachingPopoverTitle/useTeachingPopoverTitleStyles.styles';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger/TeachingPopoverTrigger';

describe('TeachingPopover', () => {
  it('renders modern compound parts and propagates brand appearance', () => {
    const { getByTestId, getByText } = render(
      <TeachingPopover open appearance="brand">
        <TeachingPopoverTrigger>
          <Button>Open</Button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface data-testid="surface">
          <TeachingPopoverHeader data-testid="header">Step 1</TeachingPopoverHeader>
          <TeachingPopoverBody data-testid="body">
            <TeachingPopoverTitle data-testid="title">Learn more</TeachingPopoverTitle>
            Content
          </TeachingPopoverBody>
          <TeachingPopoverFooter data-testid="footer" primary="Done" />
        </TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByTestId('surface')).toHaveClass(teachingPopoverSurfaceClassNames.root);
    expect(getByTestId('header')).toHaveClass(teachingPopoverHeaderClassNames.root);
    expect(getByTestId('header')).toHaveAttribute('data-appearance', 'brand');
    expect(getByTestId('body')).toHaveClass(teachingPopoverBodyClassNames.root);
    expect(getByTestId('title')).toHaveClass(teachingPopoverTitleClassNames.root);
    expect(getByTestId('footer')).toHaveClass(teachingPopoverFooterClassNames.root);
    expect(getByText('Done')).toHaveClass(teachingPopoverFooterClassNames.primary);
  });
});
