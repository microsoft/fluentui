import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { RecommendationBasicExample } from './examples/Recommendation.Basic.Example';
import { RecommendationDlpExample } from './examples/Recommendation.Dlp.Example';
import { RecommendationPasswordSettingsExample } from './examples/Recommendation.PasswordSettings.Example';

describe('RecommendationCard', () => {
  it('renders basic example correctly', () => {
    const component = renderer.create(<RecommendationBasicExample />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders dlp example correctly', () => {
    const component = renderer.create(<RecommendationDlpExample />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders imageillustration example correctly', () => {
    const component = renderer.create(<RecommendationPasswordSettingsExample />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
