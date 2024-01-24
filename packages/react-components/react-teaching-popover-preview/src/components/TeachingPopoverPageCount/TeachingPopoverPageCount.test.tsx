import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverPageCount } from './TeachingPopoverPageCount';
import { TeachingPopoverBody } from '../TeachingPopoverBody/TeachingPopoverBody';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { mockTeachingPopoverContext } from '../../testing/mockTeachingPopoverContext';

jest.mock('../../TeachingPopoverContext');

describe('TeachingPopoverPageCount', () => {
  isConformant({
    Component: TeachingPopoverPageCount,
    displayName: 'TeachingPopoverPageCount',
    requiredProps: {
      countStyle: 'icon',
      children: [
        <TeachingPopoverBody key="test-1">{'test-1'}</TeachingPopoverBody>,
        <TeachingPopoverBody key="test-2">{'test-2'}</TeachingPopoverBody>,
      ],
    },
  });

  beforeEach(() => {
    resetIdsForTests();
    mockTeachingPopoverContext({ totalPages: 2, currentPage: 0 });
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverPageCount
        currentPage={0}
        totalPages={3}
        setCurrentPage={() => {
          return;
        }}
      >
        Default TeachingPopoverPageCount
      </TeachingPopoverPageCount>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
