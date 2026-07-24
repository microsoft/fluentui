import * as React from 'react';
import { Button } from '@fluentui/react-button';
const meta = {
  title: 'Card',
  component: Button,
};
export default meta;

// --- Custom React components defined in the module ---
const Card = ({ children }) =>
  /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'card',
    },
    children,
  );
const CardHeader = ({ title }) =>
  /*#__PURE__*/ React.createElement(
    'h3',
    {
      className: 'card-header',
    },
    title,
  );
const CardMedia = ({ src }) =>
  /*#__PURE__*/ React.createElement('img', {
    className: 'card-media',
    src: src,
    alt: '',
  });
const CardFooter = () =>
  /*#__PURE__*/ React.createElement(
    'footer',
    {
      className: 'card-footer',
    },
    '\xA9 Contoso',
  );

// Uses Card + CardHeader + Button.
export const Basic = {
  render: () =>
    /*#__PURE__*/ React.createElement(
      Card,
      null,
      /*#__PURE__*/ React.createElement(CardHeader, {
        title: 'Basic',
      }),
      /*#__PURE__*/ React.createElement(Button, null, 'Action'),
    ),
};

// Uses Card + CardMedia only.
export const WithMedia = {
  render: () =>
    /*#__PURE__*/ React.createElement(
      Card,
      null,
      /*#__PURE__*/ React.createElement(CardMedia, {
        src: 'cat.png',
      }),
    ),
};

// Uses Card + CardHeader + CardMedia + CardFooter.
export const Full = {
  render: () =>
    /*#__PURE__*/ React.createElement(
      Card,
      null,
      /*#__PURE__*/ React.createElement(CardHeader, {
        title: 'Full',
      }),
      /*#__PURE__*/ React.createElement(CardMedia, {
        src: 'dog.png',
      }),
      /*#__PURE__*/ React.createElement(CardFooter, null),
    ),
};
Basic.parameters = {};
Basic.parameters.fullSource =
  'import { Button } from "@fluentui/react-components";\nimport * as React from "react";\n\n// --- Custom React components defined in the module ---\nconst Card = ({ children }) => <div className="card">{children}</div>;\n\nconst CardHeader = ({ title }) => <h3 className="card-header">{title}</h3>;\n\n// Uses Card + CardHeader + Button.\nexport const Basic = () => (\n  <Card>\n    <CardHeader title="Basic" />\n    <Button>Action</Button>\n  </Card>\n);\n';
WithMedia.parameters = {};
WithMedia.parameters.fullSource =
  'import * as React from "react";\n\n// --- Custom React components defined in the module ---\nconst Card = ({ children }) => <div className="card">{children}</div>;\n\nconst CardMedia = ({ src }) => <img className="card-media" src={src} alt="" />;\n\n// Uses Card + CardMedia only.\nexport const WithMedia = () => (\n  <Card>\n    <CardMedia src="cat.png" />\n  </Card>\n);\n';
Full.parameters = {};
Full.parameters.fullSource =
  'import * as React from "react";\n\n// --- Custom React components defined in the module ---\nconst Card = ({ children }) => <div className="card">{children}</div>;\n\nconst CardHeader = ({ title }) => <h3 className="card-header">{title}</h3>;\n\nconst CardMedia = ({ src }) => <img className="card-media" src={src} alt="" />;\n\nconst CardFooter = () => <footer className="card-footer">\xA9 Contoso</footer>;\n\n// Uses Card + CardHeader + CardMedia + CardFooter.\nexport const Full = () => (\n  <Card>\n    <CardHeader title="Full" />\n    <CardMedia src="dog.png" />\n    <CardFooter />\n  </Card>\n);\n';
