import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { Image } from './index';
import type { ArgTypes, Meta, Parameters } from '@storybook/react';
import type { ImageProps } from './index';
import descriptionMd from './ImageDescription.md';
import bestPracticesMd from './ImageBestPractices.md';
/**
 * Temporary Stack until there's one in its own package.
 */
const useStackStyles = makeStyles({
  hStack: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 'calc(-1 * var(--gap, 8px) / 2)',
    '> *': {
      margin: 'calc(var(--gap, 8px) / 2)',
    },
  },
  vStack: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '> *:not(:first-child)': {
      marginTop: 'var(--gap, 20px)',
    },
  },
});
const Stack = (props: React.PropsWithChildren<{ horizontal?: boolean }>) => {
  const { horizontal, ...rest } = props;
  const { hStack, vStack } = useStackStyles();

  return <div {...rest} className={horizontal ? hStack : vStack} />;
};

export const Default = (props: ImageProps) => {
  return <Image {...props} />;
};
Default.argTypes = {
  alt: {
    control: 'text',
    defaultValue: 'Image placeholder',
    description: `description of the image, which isn't mandatory but is incredibly useful for accessibility`,
  },
  src: {
    control: 'text',
    defaultValue: 'https://via.placeholder.com/300x300',
    description: 'path to the image you want to display',
  },
  as: { table: { disable: true } },
} as ArgTypes;
Default.parameters = {
  controls: {
    disable: false,
  },
} as Parameters;

export const ImageAppearanceShape = () => (
  <Stack horizontal>
    <Image
      alt="Allan's avatar"
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
      height={200}
      width={200}
    />
    <Image
      alt="Amanda's avatar"
      rounded
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg"
      height={200}
      width={200}
    />
    <Image
      alt="Erik's avatar"
      circular
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg"
      height={200}
      width={200}
    />
  </Stack>
);
ImageAppearanceShape.parameters = {
  docs: {
    description: {
      story: 'Images can be styled as square, rounded corners or circular.',
    },
  },
};

export const ImageVariationsBorder = () => (
  <Stack horizontal>
    <Stack horizontal>
      <Image
        alt="Allan's avatar"
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
        height={200}
        width={200}
      />
      <Image
        alt="Amanda's avatar"
        rounded
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg"
        height={200}
        width={200}
      />
      <Image
        alt="Erik's avatar"
        circular
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg"
        height={200}
        width={200}
      />
    </Stack>
    <Stack horizontal>
      <Image
        alt="Allan's avatar"
        bordered
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
        height={200}
        width={200}
      />
      <Image
        alt="Amanda's avatar"
        bordered
        rounded
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg"
        height={200}
        width={200}
      />
      <Image
        alt="Erik's avatar"
        bordered
        circular
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg"
        height={200}
        width={200}
      />
    </Stack>
  </Stack>
);
ImageVariationsBorder.parameters = {
  docs: {
    description: {
      story: 'The `bordered` prop will apply a border style to images regardless of its shape.',
    },
  },
};

export const ImageVariationsFallback = () => (
  <Stack horizontal>
    <Image
      alt="Allan's avatar"
      bordered
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
      height={200}
      width={200}
    />
    <Image
      alt="Non-existing avatar"
      bordered
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/non-existing-png.jpg"
      height={200}
      width={200}
    />
  </Stack>
);
ImageVariationsFallback.parameters = {
  docs: {
    description: {
      story:
        'In cases when images fail to load, the Image component will result into the native `<img/>` browser fallback.',
    },
  },
};

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
ImageLayoutFit.parameters = {
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

export const ImageFluid = () => (
  <Stack horizontal>
    <Image fluid src="https://via.placeholder.com/900x50" />
    <Image fluid src="https://via.placeholder.com/100x100" />
  </Stack>
);
ImageFluid.parameters = {
  docs: {
    description: {
      story: 'An Image can be maximized in order to fill its parent container.',
    },
  },
};

export default {
  title: 'Components/Image',
  component: Image,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
} as Meta;
