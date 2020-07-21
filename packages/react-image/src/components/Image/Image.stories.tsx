import * as React from 'react';

import { Image } from './Image';
import * as classes from './Image.stories.scss';

/**
 * Temporary Stack until there's one in its own package.
 */
const Stack = (props: React.PropsWithChildren<{ horizontal?: boolean }>) => {
  const { horizontal, ...rest } = props;

  return <div {...rest} className={horizontal ? classes.hStack : classes.vStack} />;
};

export const ImageVariations = () => (
  <Stack horizontal>
    <Image src="/images/avatar/ade.jpg" height={200} width={200} />
    <Image circular src="/images/avatar/chris.jpg" height={200} width={200} />
    <Image rounded src="/images/avatar/laura.jpg" height={200} width={200} />
  </Stack>
);

export const ImageAppearance = () => (
  <Stack horizontal>
    <Image src="/images/avatar/ade.jpg" height={200} width={200} />
    <Image bordered src="/images/avatar/ade.jpg" height={200} width={200} />
  </Stack>
);

export const ImageLayoutFit = () => (
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
    <div style={{ border: '1px solid green', height: 250, width: 400 }}>
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
