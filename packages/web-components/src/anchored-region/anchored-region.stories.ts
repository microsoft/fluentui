import { DOCS_RENDERED } from '@storybook/core-events';
import addons from '@storybook/addons';
import { Direction, RtlScrollConverter } from '@microsoft/fast-web-utilities';
import { AnchoredRegion } from '@microsoft/fast-foundation';
import AnchoreRegionTemplate from './fixtures/base.html';
import './index';

let scalingViewportPreviousXValue: number = 250;
let scalingViewportPreviousYValue: number = 250;

addons.getChannel().addListener(DOCS_RENDERED, (name: string) => {
  if (name.toLowerCase().includes('anchored region')) {
    scrollViewports();
    setButtonActions();

    const scalingViewportUpdate: HTMLElement | null = document.getElementById('viewport-scaling-update');
    if (scalingViewportUpdate !== null) {
      scalingViewportUpdate.addEventListener('scroll', handleScrollViaUpdate);
    }

    const scalingViewportOffset: HTMLElement | null = document.getElementById('viewport-scaling-offset');
    if (scalingViewportOffset !== null) {
      scalingViewportOffset.addEventListener('scroll', handleScrollViaOffset);
    }
  }
});

function scrollViewports(): void {
  document.querySelectorAll("div[id^='viewport']").forEach(el => {
    if (el instanceof HTMLDivElement) {
      el.scrollTop = 280;
      RtlScrollConverter.setScrollLeft(
        el,
        el.dir === Direction.rtl ? -250 : 250,
        el.dir === Direction.rtl ? Direction.rtl : Direction.ltr,
      );
    }
  });
}

function handleScrollViaUpdate(ev: Event): void {
  if (ev.target instanceof HTMLElement) {
    const scalingRegionUpdate: HTMLElement | null = document.getElementById('region-scaling-update');
    if (scalingRegionUpdate instanceof AnchoredRegion) {
      (scalingRegionUpdate as any).update();
    }
  }
}

function handleScrollViaOffset(ev: Event): void {
  if (ev.target instanceof HTMLElement) {
    const scroller: HTMLElement = ev.target as HTMLElement;

    const scalingRegionOffset: HTMLElement | null = document.getElementById('region-scaling-offset');
    if (scalingRegionOffset instanceof AnchoredRegion) {
      (scalingRegionOffset as any).updateAnchorOffset(
        scalingViewportPreviousXValue - scroller.scrollLeft,
        scalingViewportPreviousYValue - scroller.scrollTop,
      );
    }

    scalingViewportPreviousXValue = scroller.scrollLeft;
    scalingViewportPreviousYValue = scroller.scrollTop;
  }
}

function setButtonActions(): void {
  document.querySelectorAll('button').forEach(el => {
    if (el instanceof HTMLButtonElement) {
      switch (el.id) {
        case 'toggle-anchor-anchor1':
          el.onclick = event => {
            const region: HTMLElement | null = document.getElementById('toggle-anchor-region');
            if (region === null) {
              return;
            }
            region.setAttribute('anchor', 'toggle-anchor-anchor1');
          };
          break;

        case 'toggle-anchor-anchor2':
          el.onclick = event => {
            const region: HTMLElement | null = document.getElementById('toggle-anchor-region');
            if (region === null) {
              return;
            }
            region.setAttribute('anchor', 'toggle-anchor-anchor2');
          };
          break;

        case 'toggle-positions-horizontal':
          el.onclick = event => {
            const region: HTMLElement | null = document.getElementById('toggle-positions-region');
            if (region === null) {
              return;
            }
            const currentPosition: string | null = region.getAttribute('horizontal-default-position');
            if (currentPosition === 'left') {
              region.setAttribute('horizontal-default-position', 'right');
            } else {
              region.setAttribute('horizontal-default-position', 'left');
            }
          };
          break;

        case 'toggle-positions-vertical':
          el.onclick = event => {
            const region: HTMLElement | null = document.getElementById('toggle-positions-region');
            if (region === null) {
              return;
            }
            const currentPosition: string | null = region.getAttribute('vertical-default-position');
            if (currentPosition === 'top') {
              region.setAttribute('vertical-default-position', 'bottom');
            } else {
              region.setAttribute('vertical-default-position', 'top');
            }
          };
          break;

        case 'toggle-positions-small':
          el.onclick = event => {
            const smallContent: HTMLElement | null = document.getElementById('toggle-positions-small');
            const largeContent: HTMLElement | null = document.getElementById('toggle-positions-large');
            if (smallContent === null || largeContent === null) {
              return;
            }

            smallContent.hidden = false;
            largeContent.hidden = true;
          };
          break;

        case 'toggle-positions-large':
          el.onclick = event => {
            const smallContent: HTMLElement | null = document.getElementById('toggle-positions-small');
            const largeContent: HTMLElement | null = document.getElementById('toggle-positions-large');
            if (smallContent === null || largeContent === null) {
              return;
            }

            smallContent.hidden = true;
            largeContent.hidden = false;
          };
          break;

        default:
          el.onclick;
      }
    }
  });
}

export default {
  title: 'Components/Anchored region',
};

export const base = () => AnchoreRegionTemplate;
