import * as React from 'react';
import {
  Button,
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  CardProps,
  Checkbox,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { stat } from 'fs';

import * as componentsImagesImported from './components-images/index';

const useStyles = makeStyles({
  main: {
    gap: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '5px 10px 10px 5px',
  },

  card: {
    width: '250px',
    maxWidth: '100%',
    height: 'fit-content',
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  cardImage: {
    borderRadius: tokens.borderRadiusXLarge,
    border: '1px solid var(--colorNeutralStroke1, #e1dfdd)',
    filter: 'grayscale(100%) brightness(95%)',
    opacity: 0.5,

    '&:hover': {
      filter: 'grayscale(0%) brightness(100%)',
      opacity: 1,
    },
  },
  cardImageSelected: {
    borderRadius: tokens.borderRadiusXLarge,
    border: '1px solid var(--colorNeutralStroke1, #e1dfdd)',
    filter: 'grayscale(0%) brightness(100%)',
    opacity: 1,
  },

  grayBackground: {
    padding: '0 15px 15px',
  },
});

export const SelectionCard = props => {
  const styles = useStyles();
  const { name, displayName, image, addComponent } = props;
  const [selected, setSelected] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const linkRef = React.useRef<HTMLAnchorElement>(null);

  const setCheckboxState = React.useCallback(({ selected, checked }, setFn) => setFn(!!(selected || checked)), []);

  const onSelectedCardChange = React.useCallback(
    (_, state) => {
      setCheckboxState(state, setSelected);
      console.log('------- onchange called');
      state && state.checked && console.log('card state', state.checked);

      if (state?.checked === true || state?.selected === true) {
        addComponent(name);
      }
    },
    [setCheckboxState, addComponent, name],
  );

  const componentImage = React.useMemo(() => {
    let src;
    const importName = `${name}Img`;
    if (componentsImagesImported[importName]) {
      const result = {
        src: componentsImagesImported[importName],
        alt: `Preview for ${props.displayName}`,
      };
      return result;
    } else {
      return undefined;
    }
  }, [name, displayName, image]);

  return (
    <div className={styles.main}>
      <Card
        className={styles.card}
        {...props}
        floatingAction={<Checkbox aria-label={displayName} onChange={onSelectedCardChange} checked={selected} />}
        selected={selected}
        onSelectionChange={onSelectedCardChange}
        // onMouseOver={() => setHovered(true)}
        // onMouseOut={() => setHovered(false)}
      >
        <CardHeader description={<Caption1 className={styles.caption}>{displayName}</Caption1>} />
        <CardPreview className={styles.grayBackground}>
          {componentImage && (
            <img
              className={selected || hovered ? styles.cardImageSelected : styles.cardImage}
              src={componentImage.src}
              alt={componentImage.alt}
            />
          )}
        </CardPreview>
      </Card>
    </div>
  );
};
