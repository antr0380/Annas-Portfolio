// src/types/css-custom-properties.d.ts (Exempel på filnamn)

import { CSSProperties } from 'react';

// 1. Definiera dina specifika variabler
interface SheepCustomProperties extends CSSProperties {
  '--sheep-top'?: string;
  '--sheep-left'?: string;
}

// 2. Exporta typen så att den kan användas i dina komponenter
export type SheepStyle = SheepCustomProperties;

// 1. Definiera dina specifika variabler
interface CloudCustomProperties extends CSSProperties {
  '--cloud-top'?: string;
  '--cloud-left'?: string;
  '--z-value'?: number;
}

// 2. Exporta typen så att den kan användas i dina komponenter
export type CloudStyle = CloudCustomProperties;

export type SetSheepList = React.Dispatch<React.SetStateAction<Sheep[]>>;
