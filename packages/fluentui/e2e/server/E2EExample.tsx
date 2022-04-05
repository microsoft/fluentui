import * as React from 'react';
import browserTestRoutes from './routes';
import { RouteComponentProps } from 'react-router-dom';

type E2EProps = RouteComponentProps<{ exampleName: string }>;

const E2EExample: React.FC<E2EProps> = ({ match }) => React.createElement(browserTestRoutes[match.params.exampleName]);

export default E2EExample;
