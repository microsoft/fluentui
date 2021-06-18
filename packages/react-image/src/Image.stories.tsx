import * as React from 'react';
import { Image } from './index';
import { makeStyles } from '@fluentui/react-make-styles';

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

export const ImageFluid = () => (
  <Stack horizontal>
    <Image fluid src="https://via.placeholder.com/900x50" />
    <Image fluid src="https://via.placeholder.com/100x100" />
  </Stack>
);

export default {
  title: 'Components/Image',
  component: Image,
};
