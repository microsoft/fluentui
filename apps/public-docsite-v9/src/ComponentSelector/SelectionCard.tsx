import * as React from 'react';
import { Caption1, Card, CardHeader, CardPreview, Checkbox, makeStyles, tokens } from '@fluentui/react-components';

import { ComponentsImages } from './ComponentSelector';

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
    minHeight: '196px',
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

interface SelectionCardProps {
  componentsImages: ComponentsImages;
  name: string;
  displayName: string;
  selected: boolean;
  updateComponentSelection: (name: string, selected: boolean) => void;
}

export const SelectionCard: React.FC<SelectionCardProps> = props => {
  const styles = useStyles();
  const { componentsImages, name, displayName, selected, updateComponentSelection } = props;

  const onSelectionChange = React.useCallback(
    (_, data) => {
      updateComponentSelection(name, data.checked || data.selected);
    },
    [updateComponentSelection, name],
  );

  const componentImage = React.useMemo(() => {
    const importName = `${name}Img`;
    if (componentsImages[importName]) {
      const result = {
        src: componentsImages[importName],
        alt: `Preview for ${props.displayName}`,
      };
      return result;
    } else {
      return undefined;
    }
  }, [name, displayName]);

  return (
    <div className={styles.main}>
      <Card
        className={styles.card}
        floatingAction={<Checkbox aria-label={displayName} onChange={onSelectionChange} checked={selected} />}
        onSelectionChange={onSelectionChange}
        {...props}
      >
        <CardHeader description={<Caption1 className={styles.caption}>{displayName}</Caption1>} />
        <CardPreview className={styles.grayBackground}>
          {componentImage && (
            <img
              className={selected ? styles.cardImageSelected : styles.cardImage}
              src={componentImage.src}
              alt={componentImage.alt}
            />
          )}
        </CardPreview>
      </Card>
    </div>
  );
};
