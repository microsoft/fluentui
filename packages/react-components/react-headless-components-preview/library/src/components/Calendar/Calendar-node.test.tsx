/*
 * @jest-environment node
 */

import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Calendar } from '../../calendar';

describe('headless Calendar without a target document', () => {
  const today = new Date(2020, 8, 18);

  it('renders both pickers through the public calendar entry point', () => {
    const markup = renderToStaticMarkup(<Calendar defaultValue={today} today={today} layout="auto" />);

    expect(markup).toContain('data-fui-calendar-picker="day"');
    expect(markup).toContain('data-fui-calendar-picker="month"');
    expect(markup.match(/role="grid"/g)).toHaveLength(2);
  });

  it.each([
    { name: 'day', dayPicker: null },
    { name: 'month', monthPicker: null },
  ])('omits a null $name picker during server-side rendering', ({ name, ...props }) => {
    const markup = renderToStaticMarkup(<Calendar {...props} defaultValue={today} today={today} layout="auto" />);

    expect(markup).not.toContain(`data-fui-calendar-picker="${name}"`);
    expect(markup.match(/role="grid"/g)).toHaveLength(1);
  });
});
