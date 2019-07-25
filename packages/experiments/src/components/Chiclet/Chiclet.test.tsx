import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as ReactDOM from 'react-dom';

import { ChicletXsmall } from './ChicletXsmall';
import { ChicletCard } from './ChicletCard';
import { IChicletCardProps } from './ChicletCard.types';
import { mergeStyles } from '../../Styling';
import { mount } from 'enzyme';
import { Chiclet } from './Chiclet';
import * as ReactTestUtils from 'react-dom/test-utils';
import { ChicletBase } from './Chiclet.base';
import { ChicletCardBase } from './ChicletCard.base';
import { HtmlAttributes } from 'csstype';

function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
  const component = ReactTestUtils.renderIntoDocument(element);
  const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
  return renderedDOM as HTMLElement;
}
describe('Chiclet', () => {
  it('renders Xsmall chiclet with a title, icon, onClick, and url', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contoso.sharepoint.com',
      title: 'My Daily Notes',
      itemType: 'docx',
      onClick: () => alert('test')
    };
    const component = renderer.create(<ChicletXsmall {...chicletCardProps} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Xsmall chiclet with title, preview, onClick, and url', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contoso.sharepoint.com',
      title: 'My Daily Notes',
      itemType: 'docx',
      image: 'https://imaging.nikon.com/lineup/dslr/df/img/sample/img_01.jpg',
      onClick: () => alert('test')
    };
    const component = renderer.create(<ChicletXsmall {...chicletCardProps} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Xsmall Chiclet with the correct icon from a file extension', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contoso.sharepoint.com',
      title: 'My Daily Notes.xlsx',
      onClick: () => alert('test')
    };
    const component = renderer.create(<ChicletXsmall {...chicletCardProps} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Medium chiclet with title, icon, onClick, and url', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contoso.sharepoint.com',
      title: 'My Daily Notes',
      itemType: 'docx',
      onClick: () => alert('test')
    };
    const component = renderer.create(<ChicletCard {...chicletCardProps} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('Class Change', () => {
  let renderedComponent: ChicletCardBase;

  const Prev: React.FunctionComponent<{ className: string }> = props => {
    return <img src="http://placehold.it/100x100" className={test} />;
  };

  const test = mergeStyles({
    maxWidth: '100%'
  });

  const chicletCardProps: IChicletCardProps = {
    url: 'contoso.sharepoint.com',
    title: 'My Daily Notes',
    itemType: 'docx',
    onClick: () => alert('test')
  };

  beforeAll(() => {
    renderedComponent = (ReactTestUtils.renderIntoDocument(
      <ChicletCard {...chicletCardProps} preview={Prev} />
    ) as unknown) as ChicletCardBase;
  });

  it('should change the classname', () => {
    const test = mergeStyles({
      maxWidth: '100%'
    });
    const Prev: React.FunctionComponent<{ className: string }> = props => {
      const { className } = props;

      return <img src="http://placehold.it/100x100" className={className} />;
    };

    const component = renderer.create(<Prev className={test} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should have the correct styling', () => {
    /*const chicletTest = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, test) as HTMLElement;
    if (chicletTest) {
      console.log(chicletTest.style)
    }*/
    const test = mergeStyles({
      maxWidth: '100%'
    });

    const chicletCardProps: IChicletCardProps = {
      url: 'contoso.sharepoint.com',
      title: 'My Daily Notes',
      itemType: 'docx',
      onClick: () => alert('test')
    };

    const Prev: React.FunctionComponent<{ className: string }> = props => {
      return <img src="http://placehold.it/100x100" className={test} />;
    };

    const renderedDOM: HTMLElement = renderIntoDocument(<ChicletCard {...chicletCardProps} preview={Prev} />);

    const pre = renderedDOM.getElementsByClassName('ms-ChicletCard-preview')[0] as HTMLElement;

    console.log(pre);
    //const component = mount(<ChicletCard {...chicletCardProps} preview={Prev} />);
    //const component = renderer.create(<ChicletCard {...chicletCardProps} preview={Prev} />);

    //const x = component.findByType(Prev);
    //console.log(component.root.getElementsByClassName('ms-ChicletCard-preview').item(0))

    //const ele: HTMLElement = component.findByType(Prev).toJson();
    //onsole.log(component.findByType(Prev));
    //const func = component.root.findByProps(Prev).props.preview;
    //const x = component.find(Prev).get(0).props.className;
    //console.log(component.root.getElementsByClassName(x).item(0));
    //console.log(component.find(Prev).get(0).props.className);
    //console.log(component.root.props.preview.props);

    //expect(tree).toMatchSnapshot();
  });
});
