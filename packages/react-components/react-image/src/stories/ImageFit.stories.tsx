import * as React from 'react';
import { Image } from '../Image';

export const Fit = () => (
  <>
    <h1>None</h1>
    <div style={{ border: '1px solid green', height: 150, width: 300 }}>
      <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/600x200.png" fit="none" />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 150, width: 300 }}>
      <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/200x100.png" fit="none" />
    </div>

    <h1>Center</h1>
    <div style={{ border: '1px solid green', height: 150, width: 300 }}>
      <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/600x200.png" fit="center" />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 150, width: 300 }}>
      <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/200x100.png" fit="center" />
    </div>

    <h1>Contain</h1>
    <div style={{ border: '1px solid green', height: 200, width: 400 }}>
      <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x200.png" fit="contain" />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 250, width: 400 }}>
      <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x200.png" fit="contain" />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 200, width: 450 }}>
      <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x200.png" fit="contain" />
    </div>

    <h1>Cover</h1>
    <div style={{ border: '1px solid green', height: 200, width: 400 }}>
      <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x250.png" fit="cover" />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 200, width: 400 }}>
      <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x300.png" fit="cover" />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 200, width: 400 }}>
      <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/600x200.png" fit="cover" />
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
