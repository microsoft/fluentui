import * as React from 'react';
import { makeStyles, mergeClasses, webDarkTheme, FluentProvider, Text, Input, useId } from '@fluentui/react-components';
import { CircleRegular, ChevronRightRegular, EditRegular } from '@fluentui/react-icons';
import { ExportButton } from '../ExportButton/ExportButton';
import { useContextSelector } from '@fluentui/react-context-selector';
import { AppContext } from '../../ThemeDesigner';

export interface NavProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 3fr 3fr',
    height: '40px',
  },
  logo: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  element: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  export: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
  },
});

export const Nav: React.FC<NavProps> = props => {
  const styles = useStyles();

  const underlineId = useId('input-underline');
  const name = useContextSelector(AppContext, ctx => ctx.name);
  const setName = useContextSelector(AppContext, ctx => ctx.setName);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;

    if (newName.length === 0) {
      setName('Untitled');
    } else {
      const camelizeName = e.target.value
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => (idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()))
        .replace(/\s+/g, '');

      setName(camelizeName);
    }
  };

  return (
    <FluentProvider theme={webDarkTheme} className={mergeClasses(styles.root, props.className)}>
      <div className={styles.logo}>
        <CircleRegular />
        <Text>Color Tool</Text>
      </div>
      <div className={styles.element}>
        UI Colors <ChevronRightRegular /> New palette
      </div>
      <div className={styles.element}>
        <Input
          appearance="underline"
          id={underlineId}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleNameChange}
          contentAfter={<EditRegular />}
          placeholder={name}
        />
      </div>
      <ExportButton />
    </FluentProvider>
  );
};
