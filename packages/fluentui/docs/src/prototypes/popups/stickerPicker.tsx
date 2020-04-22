import * as React from 'react';
import {
  Button,
  Popup,
  Menu,
  dialogBehavior,
  tabBehavior,
  tabListBehavior,
  MenuItemProps,
} from '@fluentui/react-northstar';
import { StickerIcon } from '@fluentui/react-icons-northstar';
import * as _ from 'lodash';
import { arrayOfStickerImagesNames, getItemsData } from './dataMocks';
import GridImagePicker from './GridImagePicker/GridImagePicker';

const tabListItemsContent = ['Popular', 'Office drama', 'Meme', 'Designers', 'Dev', 'Legal', 'Team squatch'];

class StickerPicker extends React.Component {
  state = { activeMenuIndex: 0 };
  gridPickerRef = React.createRef<GridImagePicker>();

  getStickersData = () => {
    return getItemsData(arrayOfStickerImagesNames[this.state.activeMenuIndex], 'sticker of');
  };

  onMenuItemClick = (e, props) => {
    this.setState({ activeMenuIndex: props.index }, () => {
      this.gridPickerRef.current && this.gridPickerRef.current.focusInput();
    });
  };

  getTabListItems = (): MenuItemProps[] => {
    return _.map(tabListItemsContent, item => ({
      key: item,
      content: item,
      onClick: this.onMenuItemClick,
      accessibility: tabBehavior,
    }));
  };

  render() {
    return (
      <Popup
        accessibility={dialogBehavior}
        position="below"
        trigger={<Button icon={<StickerIcon />} aria-label="Choose a sticker." />}
        content={{
          'aria-label': 'Choose a sticker. Press Enter key to insert sticker.',
          content: (
            <div style={{ display: 'flex' }}>
              <div className="left-rail" style={{ paddingRight: '10px' }}>
                <Menu
                  accessibility={tabListBehavior}
                  activeIndex={this.state.activeMenuIndex}
                  items={this.getTabListItems()}
                  vertical
                  pointing
                />
              </div>
              <div className="right-rail" style={{ display: 'flex', flexDirection: 'column' }}>
                <GridImagePicker ref={this.gridPickerRef} items={this.getStickersData()} />
              </div>
            </div>
          ),
        }}
      />
    );
  }
}

export default StickerPicker;
