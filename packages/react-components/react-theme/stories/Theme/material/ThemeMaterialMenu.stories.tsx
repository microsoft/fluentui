import * as React from 'react';
import {
  Button,
  makeStyles,
  shorthands,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  mergeClasses,
} from '@fluentui/react-components';

import {
  bundleIcon,
  CutRegular,
  CutFilled,
  ClipboardPasteRegular,
  ClipboardPasteFilled,
  EditRegular,
  EditFilled,
} from '@fluentui/react-icons';

import { StoryContext } from '@storybook/react';

const CutIcon = bundleIcon(CutFilled, CutRegular);
const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
const EditIcon = bundleIcon(EditFilled, EditRegular);

const useStyles = makeStyles({
  container: {
    position: 'relative',
    backgroundPositionX: 'center',
    backgroundPositionY: 'center',
    backgroundSize: 'contain',
    height: '500px',
    ...shorthands.padding('20px'),
    ...shorthands.borderRadius('8px'),
  },
  light: {
    backgroundImage:
      'url(https://s3-alpha-sig.figma.com/img/fca4/d0dd/61e8b20758699c2f3f763e0339dbd0ab?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OQig0s5L1NfguudY9NjByhUzH0l99LnMt25WPXAauYj9r-KzjadtNUD9mLovkLniIqtoCev3FGgvHaq73CHRJ8gmLTyciy4Asu-88D9jJ324WsxUMXB4G~mJg-uP9417sYmHTIrM6HefxHF8gb7Sgk~yvbNQMQZ82SSV9HlA4z65rtfo8Ws7FQt~HF6VA8O6sfFiHoVPWBBwwJTpGEhGT8pjeS36OPXuawedxV4fiJQowi5lP3Mt3g15PjZS81p2nZsGdkUVBgxWnXKNC6J6eur8tNGjWxxkVGPl-Zfz7JpUo1AYsSppoYAKrgWVMMjv2hjwhfP4irnDFaqzO2PcMQ__)',
  },
  dark: {
    backgroundImage:
      'url(https://s3-alpha-sig.figma.com/img/0f8b/ee01/1383a069bd2d1fbd678fba86021b5036?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hlQPblRLbW9EO35qTaoOnZu2oMZjVhSRdVUIh4BFVUOELZxF1XIa8UjDJqQ~pSAVjMu45yP~Vkjr7micsY7yrR8a1l6a5cmppQm20b0aNLDCZUayb6bsgjajQ7-EGq0FMfJ4FWak-QPpeAfIiCxWXr6sIjxt7XuSNOaWGghBXUak20aXEejiwPMwkpCB32sF~nNpNZsq0-hP3nBV38mYG-TEQcEw-oLn67trZk~Kkqjg6byHhvqPytXhvEHEOoLKwOkDz4DddgLjic9eIFR01uSAnUORo5Ly8-trgY9mpCsiEtY0NhI6NgTefl0WT24epEkUDAv-R-NwH2dvFCY85w__)',
  },
  button: {
    position: 'absolute',
    top: '30%',
    right: '50%',
    transform: 'translate(50%, -50%)',
  },
});

export const MaterialMenu = () => {
  const styles = useStyles();
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button className={styles.button}>Menu</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem icon={<CutIcon />}>Cut</MenuItem>
          <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
          <MenuItem disabled icon={<EditIcon />}>
            Edit
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<CutIcon />}>Cut</MenuItem>
          <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
          <MenuItem icon={<EditIcon />}>Edit</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

MaterialMenu.decorators = [
  (StoryFn: () => JSX.Element, context: StoryContext) => {
    const isLightTheme = /light/.test(context.globals['storybook_fluentui-react-addon_theme']);
    const styles = useStyles();
    return <div className={mergeClasses(styles.container, isLightTheme ? styles.light : styles.dark)}>{StoryFn()}</div>;
  },
];
