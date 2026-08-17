import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('react/*', 'routes/react.tsx'),
  route('headless/*', 'routes/headless.tsx'),
] satisfies RouteConfig;
