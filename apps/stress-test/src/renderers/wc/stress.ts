import { StressComponent } from '../../components/wc/stressComponent.wc';
import { DOMSelectorTreeComponentRenderer } from '../../shared/vanilla/types';

typeof StressComponent;

const componentRenderer: DOMSelectorTreeComponentRenderer = (node, depth, index) => {
  const stressComp = document.createElement('stress-component');
  return stressComp;
};

export default componentRenderer;
