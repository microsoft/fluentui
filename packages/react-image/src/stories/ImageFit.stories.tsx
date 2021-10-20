import * as React from 'react';
import { Image } from '../index';

export const Fit = () => (
  <>
    <h1>None</h1>
    <div style={{ border: '1px solid green', height: 150, width: 300 }}>
      <Image src="https://via.placeholder.com/600x200" fit="none" />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 150, width: 300 }}>
      <Image src="https://via.placeholder.com/200x100" fit="none" />
    </div>

    <h1>Center</h1>
    <div style={{ border: '1px solid green', height: 150, width: 300 }}>
      <Image src="https://via.placeholder.com/600x200" fit="center" />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 150, width: 300 }}>
      <Image src="https://via.placeholder.com/200x100" fit="center" />
    </div>

    <h1>Contain</h1>
    <div style={{ border: '1px solid green', height: 200, width: 400 }}>
      <Image src="https://via.placeholder.com/400x200" fit="contain" />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 250, width: 400 }}>
      <Image src="https://via.placeholder.com/400x200" fit="contain" />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 200, width: 450 }}>
      <Image src="https://via.placeholder.com/400x200" fit="contain" />
    </div>

    <h1>Cover</h1>
    <div style={{ border: '1px solid green', height: 200, width: 400 }}>
      <Image src="https://via.placeholder.com/400x250" fit="cover" />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 200, width: 400 }}>
      <Image src="https://via.placeholder.com/400x300" fit="cover" />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 200, width: 400 }}>
      <Image src="https://via.placeholder.com/600x200" fit="cover" />
    </div>
  </>
);
Fit.parameters = {
  docs: {
    description: {
      story: [
        'The `fit` prop is used to determine how the image should be resized in order to fit its container.',
        '',
        `The image can be resized in various ways: centering to its container(\`center\`),
         filling its container (\`cover\`) or preserving the aspect ratio (\`contain\`).`,
      ].join('\n'),
    },
  },
};
