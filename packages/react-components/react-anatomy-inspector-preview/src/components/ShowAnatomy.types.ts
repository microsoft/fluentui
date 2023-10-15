import { ReactNode } from 'react';

export type AnatomyAnnotationProps = {
  position: Position;
  componentName?: string;
  slotName?: string;
  label: string | number;
  labelTop: number;
  labelLeft: number;
  isSelected?: boolean;
  isMuted?: boolean;
};

export type AnatomyTitleProps = {
  componentName?: string;
  slotName?: string;
  isComponentInDOM?: boolean;
  isSelected: boolean;
  label: string | number;
  labelSize: number;
  setSelectedComponentName: (name: string) => void;
};

export type AnatomyInspectorProps = { children: ReactNode; displayName: string };

export type TrackedComponent = {
  componentName: string;
  cssSelector: string;
  labelLeft: number;
  labelTop: number;
  order: number;
  position: Position;
  slotName: string;
  slotComponentName: string;
};

export type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};
