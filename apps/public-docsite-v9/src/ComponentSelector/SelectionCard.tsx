import * as React from 'react';
import { Caption1, Card, CardHeader, CardPreview, Checkbox } from '@fluentui/react-components';

import { useStyles } from './SelectionCard.styles';
import { ComponentsImages } from './ComponentSelector';

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
  }, [name, props.displayName, componentsImages]);

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
