import { Image, Button, ButtonProps } from '@fluentui/react-northstar';

import * as React from 'react';

export interface GridPickerItemProps {
  title?: string;
  imageSrc: string;
  onClick?: (e: React.SyntheticEvent, props: ButtonProps) => void;
}

const imageButtonStyles = {
  minWidth: '56px',
  height: '56px',
  padding: '0',
  background: '#fff',
};

class GridImagePickerItem extends React.Component<GridPickerItemProps> {
  render() {
    const { title, imageSrc, onClick } = this.props;

    return (
      <li role="presentation">
        <Button styles={imageButtonStyles} onClick={onClick} title={title} aria-label={title} role="listitem">
          {imageSrc && <Image alt={title} src={imageSrc} fluid />}
        </Button>
      </li>
    );
  }
}

export default GridImagePickerItem;
