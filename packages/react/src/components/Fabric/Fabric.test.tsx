import * as React from 'react';
//import { Customizer } from '@fluentui/utilities';
import { Fabric } from './Fabric';
//import { Checkbox } from '@fluentui/react/lib/Checkbox';
//import { createTheme } from '../../Styling';
import { render } from '@testing-library/react';
import { getBySelector } from '../../common/testUtilities';

//const rtlTheme = createTheme({ rtl: true });
//const ltrTheme = createTheme({ rtl: false });

describe('Fabric', () => {
  it('renders a Fabric component correctly', () => {
    const { container } = render(<Fabric>test</Fabric>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a Fabric component with applyTheme correctly', () => {
    const { container } = render(<Fabric applyTheme>test</Fabric>);
    expect(container.firstChild).toMatchSnapshot();
  });

  /*it('renders a Fabric component in RTL and LTR theme', () => {
    const content = (
      <div>
        <Fabric dir="ltr">
          <Checkbox label="I am in ltr" />

          <Fabric dir="rtl">
            <Checkbox label="I am in rtl, inside of ltr" />

            <Fabric dir="ltr">
              <Checkbox label="I am in ltr, inside of rtl, inside of ltr" />
            </Fabric>
          </Fabric>
        </Fabric>
        <Fabric dir="rtl">
          <Checkbox label="I am in rtl" />

          <Fabric dir="ltr">
            <Checkbox label="I am in ltr, inside of rtl" />

            <Fabric dir="rtl">
              <Checkbox label="I am in rtl, inside of rtl, inside of rtl" />
            </Fabric>
          </Fabric>
        </Fabric>
      </div>
    );
    // Render with no theme context
    const { container, rerender } = render(content);
    // Render in RTL context
    const rtlComponent = rerender(<Customizer settings={{ theme: rtlTheme }}>{content}</Customizer>);
    // Render in LTR Context
    const ltrComponent = rerender(<Customizer settings={{ theme: ltrTheme }}>{content}</Customizer>);


    const rtlTree = rtlComponent.toJSON();
    const ltrTree = ltrComponent.toJSON();
    expect(container.firstChild).toMatchSnapshot();
    expect(rtlTree).toMatchSnapshot();
    expect(ltrTree).toMatchSnapshot();
  });*/

  it('renders as a span using the "as" prop', () => {
    const { container } = render(<Fabric as="span" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a Fabric component with applyThemeToBody correctly', () => {
    const { container } = render(<Fabric applyThemeToBody>test</Fabric>);
    const fabricRoot = getBySelector(container, '.ms-Fabric');
    expect(fabricRoot).toBeTruthy();
    expect(document.body.classList.toString()).toContain('bodyThemed');
  });
});
