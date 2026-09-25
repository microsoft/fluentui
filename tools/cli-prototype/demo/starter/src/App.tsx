import * as React from 'react';

export const App = React.forwardRef<HTMLElement>((_props, ref) => (
  <main ref={ref}>
    <h1>Your app starts here</h1>
    <p>The React starter is ready. There is no Todo implementation yet.</p>
  </main>
));
