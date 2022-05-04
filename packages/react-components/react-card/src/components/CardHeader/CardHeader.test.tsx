import * as React from 'react';
import { render } from '@testing-library/react';
import { CardHeader } from './CardHeader';
import { isConformant } from '../../common/isConformant';

describe('CardHeader', () => {
  isConformant({
    Component: CardHeader,
    displayName: 'CardHeader',
    testOptions: {
      'has-static-classnames': [
        {
          props: { header: 'Header Test', action: 'Action Test' },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(
      <CardHeader image={'Image slot'} header="Title slot" description="Description slot" action={'Action slot'} />,
    );
    expect(result.container).toMatchSnapshot();
  });
});
