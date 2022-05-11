import * as React from 'react';
import { Body, Caption, Display, Subtitle1, LargeTitle, Title1, Title2, Title3, Subheadline } from '../index';

export const Typography = () => (
  <>
    <Display block>Display text wrapper, semibold, base1000</Display>
    <LargeTitle block>LargeTitle text wrapper, semibold, base900</LargeTitle>
    <Title1 block>Title1 text wrapper, semibold, base800</Title1>
    <Title2 block>Title2 text wrapper, semibold, base700</Title2>
    <Title3 block>Title3 text wrapper, semibold, base600</Title3>
    <Subtitle1 block>Subtitle1 text wrapper, semibold, base500</Subtitle1>
    <Subheadline block>Subheadline text wrapper, semibold, base400</Subheadline>
    <Body block>Body text wrapper, regular, base300</Body>
    <Caption block>Caption text wrapper, regular, base200</Caption>
  </>
);

Typography.parameters = {
  docs: {
    description: {
      story: [
        'Different typography components can be used that are based on the `Text` components.',
        'They all share the same props and behaviours that are documented here.',
      ].join('\n'),
    },
  },
};
