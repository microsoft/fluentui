import * as React from 'react';
import { DismissRegular, InfoRegular } from '@fluentui/react-icons';
import { makeStyles, shorthands, tokens, Button, mergeClasses, Tooltip } from '@fluentui/react-components';
import { V0IconComponent, V9IconComponent } from './types';

const useIconTileStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.padding('5px', '0px'),
    ...shorthands.gap('10px'),
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
    maxHeight: '105px',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
    },
  },

  badge: {
    position: 'absolute',
    top: '5px',
    right: '10px',
  },

  warning: {
    color: tokens.colorPaletteDarkOrangeBackground3,
  },

  success: {
    color: tokens.colorPaletteGreenBackground3,
  },

  v0: {
    width: '16px',
    height: '16px',
  },

  v9: {
    width: '20px',
    height: '20px',
  },

  tile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...shorthands.gap('2px'),
  },

  buttonReset: {
    resize: 'horizontal',
    boxSizing: 'content-box',
    backgroundColor: 'inherit',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'normal',
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0),
    ...shorthands.borderStyle('none'),
    WebkitAppearance: 'button',
    textAlign: 'unset',
  },
});

interface IComparisonTileProps {
  V0Icon: V0IconComponent;
  V9Icon?: V9IconComponent;
}

export const ComparisonTile: React.FC<IComparisonTileProps> = ({ V0Icon, V9Icon }) => {
  const noV9Icon = !V9Icon;

  const tooltipWarningContent = <ul>{noV9Icon && <li>No equivalent icon available</li>}</ul>;

  const styles = useIconTileStyles();
  return (
    <div className={styles.root} role="listitem">
      <Tooltip relationship="description" content={noV9Icon ? tooltipWarningContent : 'Good to go!'}>
        <Button
          appearance="subtle"
          className={mergeClasses(styles.badge, noV9Icon ? styles.warning : styles.success)}
          icon={<InfoRegular />}
          shape="circular"
        />
      </Tooltip>
      <div className={styles.tile}>
        <div className={styles.v0}>{<V0Icon outline />}</div>
        <div>{V0Icon.displayName}</div>
      </div>
      <div className={styles.tile}>
        <div className={styles.v9}>
          {V9Icon ? <V9Icon fontSize={20} /> : <DismissRegular color="red" fontSize={21} />}
        </div>
        <div>{V9Icon ? V9Icon.displayName : 'Not Available'}</div>
      </div>
    </div>
  );
};
