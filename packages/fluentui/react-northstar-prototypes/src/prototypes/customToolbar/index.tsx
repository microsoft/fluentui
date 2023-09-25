import * as _ from 'lodash';
import * as React from 'react';
import { KnobsSnippet } from '@fluentui/code-sandbox';
import { Telemetry } from '@fluentui/react-bindings';
import { KnobProvider, useBooleanKnob, useSelectKnob, KnobInspector } from '@fluentui/docs-components';
import { Provider, Flex, mergeThemes, teamsDarkTheme, teamsHighContrastTheme } from '@fluentui/react-northstar';

import { darkThemeOverrides } from './darkThemeOverrides';
import { highContrastThemeOverrides } from './highContrastThemeOverrides';

import CustomToolbar, { CustomToolbarProps } from './CustomToolbar';

const CustomToolbarPrototype: React.FunctionComponent = () => {
  const [rtl] = useBooleanKnob({
    name: 'RTL',
    initialValue: false,
  });
  const [themeName] = useSelectKnob({
    name: 'themeName',
    values: ['teamsDark', 'teamsHighContrast'],
    initialValue: 'teamsDark',
  });

  const availableLayouts: CustomToolbarProps['layout'][] = ['standard', 'desktop-share', 'powerpoint-presenter'];
  const [layout] = useSelectKnob({
    name: 'layout',
    values: availableLayouts,
    initialValue: undefined,
  });

  const [isRecording] = useBooleanKnob({
    name: 'isRecording',
    initialValue: false,
  });
  const [cameraActive, onCameraChange] = useBooleanKnob({
    name: 'cameraActive',
    initialValue: true,
  });
  const [micActive, onMicChange] = useBooleanKnob({ name: 'micActive', initialValue: true });
  const [screenShareActive, onScreenShareChange] = useBooleanKnob({
    name: 'screenShareActive',
    initialValue: false,
  });
  const [sidebarSelected, onSidebarChange] = useSelectKnob<'false' | 'chat' | 'participant-add'>({
    name: 'sidebarSelected',
    values: ['false', 'chat', 'participant-add'],
    initialValue: 'false',
  });
  const [chatHasNotification] = useBooleanKnob({ name: 'chatHasNotification', initialValue: false });
  const [currentSlide, setCurrentSlide] = React.useState(23);
  const totalSlides = 34;

  const [telemetryEnabled] = useBooleanKnob({ name: 'telemetryEnabled', initialValue: true });
  const telemetryRef = React.useRef<Telemetry>();

  let theme = {};
  if (themeName === 'teamsDark') {
    theme = mergeThemes(teamsDarkTheme, darkThemeOverrides);
  } else if (themeName === 'teamsHighContrast') {
    theme = mergeThemes(mergeThemes(teamsHighContrastTheme, darkThemeOverrides), highContrastThemeOverrides);
  }

  React.useEffect(() => {
    performance.measure('render-custom-toolbar', 'render-custom-toolbar');
    const telemetry = telemetryRef.current;
    if (!telemetryEnabled || !telemetry) {
      return;
    }

    telemetry.enabled = false;

    const totals = _.reduce(
      telemetry.performance,
      (acc, next) => {
        acc.instances += next.instances;
        acc.msTotal += next.msTotal;
        return acc;
      },
      { instances: 0, msTotal: 0 },
    );

    /* eslint-disable no-console */
    console.log(`Rendered ${totals.instances} Fluent UI components in ${totals.msTotal} ms`);
    console.log(telemetry.performance);
    /* eslint-enable no-console */
  });

  if (telemetryRef.current) {
    telemetryRef.current.enabled = telemetryEnabled;
    telemetryRef.current.reset();
  }
  performance.mark('render-custom-toolbar');

  return (
    <div style={{ height: '100vh' }}>
      <Flex column fill>
        <KnobsSnippet>
          <KnobInspector />
        </KnobsSnippet>

        <Provider theme={theme} rtl={rtl} {...(telemetryEnabled ? { telemetryRef } : undefined)}>
          <Flex
            hAlign="center"
            styles={{
              padding: '200px 0 50px 0',
              backgroundColor: '#8EC5FC',
              backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
            }}
          >
            <CustomToolbar
              layout={layout}
              isRecording={isRecording}
              cameraActive={cameraActive}
              micActive={micActive}
              screenShareActive={screenShareActive}
              sidebarSelected={sidebarSelected === 'false' ? false : sidebarSelected}
              chatHasNotification={chatHasNotification}
              pptSlide={`${currentSlide} of ${totalSlides}`}
              onCameraChange={onCameraChange}
              onMicChange={onMicChange}
              onScreenShareChange={onScreenShareChange}
              onSidebarChange={state => onSidebarChange(state || 'false')}
              onPptPrevClick={() => setCurrentSlide(_.max([1, currentSlide - 1]))}
              onPptNextClick={() => setCurrentSlide(_.min([totalSlides, currentSlide + 1]))}
            />
          </Flex>
        </Provider>
      </Flex>
    </div>
  );
};

export default () => (
  <KnobProvider>
    <CustomToolbarPrototype />
  </KnobProvider>
);
