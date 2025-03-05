import * as React from 'react';
import {
  Button,
  FluentProvider,
  FluentProviderCustomStyleHooks,
  Image,
  makeStyles,
  mergeClasses,
  TeachingPopoverCarouselFooterState,
} from '@fluentui/react-components';

import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverSurface,
  TeachingPopoverTrigger,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton,
} from '@fluentui/react-components';
import { TeachingPopoverCarouselFooterButtonState } from '../../../library/src/TeachingPopoverCarouselFooterButton';

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

const getAnnouncement = (newValue: string) => {
  return `Carousel slide ${newValue}`;
};

const useFotterClassNames = makeStyles({
  button: {
    backgroundColor: 'red',
  },
});

const useFooterStyles = (state: unknown) => {
  const footerClassNames = useFotterClassNames();
  const componentState = state as TeachingPopoverCarouselFooterButtonState;

  componentState.root.className = mergeClasses(componentState.root.className, footerClassNames.button);
};

const CUSTOM_STYLE_HOOKS: FluentProviderCustomStyleHooks = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useTeachingPopoverCarouselFooterButtonStyles_unstable: useFooterStyles,
};

export const Carousel = () => (
  <FluentProvider customStyleHooks_unstable={CUSTOM_STYLE_HOOKS}>
    <TeachingPopover>
      <TeachingPopoverTrigger>
        <Button>TeachingPopover trigger</Button>
      </TeachingPopoverTrigger>
      <TeachingPopoverSurface>
        <TeachingPopoverHeader>Tips</TeachingPopoverHeader>
        <TeachingPopoverCarousel defaultValue={'1'} announcement={getAnnouncement}>
          <TeachingPopoverCarouselCard value="1">
            <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
              <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
              <div>This is page: 1</div>
            </TeachingPopoverBody>
          </TeachingPopoverCarouselCard>

          <TeachingPopoverCarouselCard value="2">
            <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
              <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
              <div>This is page: 2</div>
            </TeachingPopoverBody>
          </TeachingPopoverCarouselCard>

          <TeachingPopoverCarouselCard value="3">
            <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
              <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
              <div>This is page: 3</div>
            </TeachingPopoverBody>
          </TeachingPopoverCarouselCard>

          <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
            <TeachingPopoverCarouselNav>
              {index => <TeachingPopoverCarouselNavButton aria-label={`Tip ${index}`} />}
            </TeachingPopoverCarouselNav>
          </TeachingPopoverCarouselFooter>
        </TeachingPopoverCarousel>
      </TeachingPopoverSurface>
    </TeachingPopover>
  </FluentProvider>
);
