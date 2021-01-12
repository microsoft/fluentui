import * as React from 'react';
import * as _ from 'lodash';
import {
  Flex,
  Provider,
  RadioGroup,
  ThemeAnimation,
  RadioGroupItemProps,
  Header,
  Button,
} from '@fluentui/react-northstar';

import AnimatedBannerAlert from './AnimatedBannerAlert';
import ComposeMessage from '../chatPane/composeMessage';
import { CloseIcon } from '@fluentui/react-icons-northstar';

type BannerName = 'info' | 'oof' | 'danger' | 'urgent';

const isAlertClosable = (bannerName: BannerName) => bannerName !== 'info';

const getBannerContent = (bannerName: BannerName) =>
  bannerName === 'danger' ? `Danger banner - used for errors` : `${_.startCase(bannerName)} banner`;

const bannerNames: BannerName[] = ['info', 'oof', 'danger', 'urgent'];

const bannerRadioItems: RadioGroupItemProps[] = bannerNames.map(bannerName => ({
  key: bannerName,
  value: bannerName,
  label: `${_.startCase(bannerName)}`,
}));

const slideDown: ThemeAnimation = {
  keyframe: {
    from: { transform: 'translateY(0)' },
    to: { transform: 'translateY(100%)', display: 'none' },
  },
  duration: '.2s',
  iterationCount: '1',
  timingFunction: 'linear',
  fillMode: 'forwards',
};

interface BannerAlertsState {
  selectedBannerName: BannerName;
  open: boolean;
}

class BannerAlerts extends React.Component<{}, BannerAlertsState> {
  state = {
    selectedBannerName: bannerRadioItems[0].value as BannerName,
    open: true,
  };

  openSelectedBanner = () => this.setState({ open: true });

  closeSelectedBanner = () => this.setState({ open: false });

  render() {
    const { selectedBannerName, open } = this.state;

    return (
      <Provider theme={{ animations: { slideDown } }}>
        <Flex
          column
          style={{
            width: '50%',
            backgroundColor: '#f3f2f1',
            padding: '10px 50px',
            position: 'relative',
          }}
        >
          <Flex space="between" vAlign="center">
            <Header as="h3">Select a banner:</Header>
            <Button content="Reset Banner" onClick={this.openSelectedBanner} />
          </Flex>
          <RadioGroup
            checkedValue={selectedBannerName}
            items={bannerRadioItems}
            onCheckedValueChange={(e, { value }) =>
              this.setState({ selectedBannerName: value as BannerName, open: true })
            }
          />
          <br />
          <AnimatedBannerAlert
            {...{
              key: selectedBannerName,
              attached: true,
              [selectedBannerName]: true,
              variables: { [selectedBannerName]: true },
              content: getBannerContent(selectedBannerName),
              ...(isAlertClosable(selectedBannerName) && {
                open,
                action: { icon: <CloseIcon />, onClick: this.closeSelectedBanner },
              }),
            }}
          />
          <ComposeMessage attached />
        </Flex>
      </Provider>
    );
  }
}

export default BannerAlerts;
