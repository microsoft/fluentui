/*
 * @jest-environment node
 */

import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Calendar } from './Calendar';

describe('Calendar without a target document', () => {
  it('renders the behavioral picker markers during server-side rendering', () => {
    const today = new Date(2020, 8, 18);
    const markup = renderToStaticMarkup(<Calendar defaultValue={today} today={today} layout="auto" />);

    expect(markup).toContain('data-fui-calendar-picker="day"');
    expect(markup).toContain('data-fui-calendar-picker="month"');
  });
});
