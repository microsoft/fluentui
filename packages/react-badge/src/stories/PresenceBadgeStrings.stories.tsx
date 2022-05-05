import * as React from 'react';
import { PresenceBadge, PresenceBadgeProps } from '../index';
export const Strings = () => {
  const spanishStrings: PresenceBadgeProps['strings'] = {
    busy: 'ocupado',
    outOfOffice: 'fuera de la oficina',
    away: 'fuera',
    available: 'disponible',
    offline: 'desconectado',
    doNotDisturb: 'no molestar',
    unknown: 'desconocido',
  };
  return (
    <>
      <PresenceBadge strings={spanishStrings} lang="es" status="available" />
      <PresenceBadge strings={spanishStrings} lang="es" status="away" />
      <PresenceBadge strings={spanishStrings} lang="es" status="busy" />
      <PresenceBadge strings={spanishStrings} lang="es" status="doNotDisturb" />
      <PresenceBadge strings={spanishStrings} lang="es" status="offline" />
      <PresenceBadge strings={spanishStrings} lang="es" status="outOfOffice" />
      <PresenceBadge strings={spanishStrings} lang="es" status="unknown" />
    </>
  );
};

Strings.parameters = {
  docs: {
    description: {
      story: `A presence badge supports custom status strings whether
      to support a different language, or to customize individual strings.
      The example below is using a Spanish translation.`,
    },
  },
};
