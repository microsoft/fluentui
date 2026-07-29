import * as React from 'react';
import { Button } from '@fluentui/react-button';

const meta = {
  title: 'Card',
  component: Button,
};

export default meta;

// --- Custom React components defined in the module ---
const Card = ({ children }) => <div className="card">{children}</div>;

const CardHeader = ({ title }) => <h3 className="card-header">{title}</h3>;

const CardMedia = ({ src }) => <img className="card-media" src={src} alt="" />;

const CardFooter = () => <footer className="card-footer">© Contoso</footer>;

// Uses Card + CardHeader + Button.
export const Basic = {
  render: () => (
    <Card>
      <CardHeader title="Basic" />
      <Button>Action</Button>
    </Card>
  ),
};

// Uses Card + CardMedia only.
export const WithMedia = {
  render: () => (
    <Card>
      <CardMedia src="cat.png" />
    </Card>
  ),
};

// Uses Card + CardHeader + CardMedia + CardFooter.
export const Full = {
  render: () => (
    <Card>
      <CardHeader title="Full" />
      <CardMedia src="dog.png" />
      <CardFooter />
    </Card>
  ),
};
