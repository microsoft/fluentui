export type Vec2 = [number, number];
export type Vec3 = [number, number, number];
export type Vec4 = [number, number, number, number];

export type Curve = {
  points: [Vec3, Vec3, Vec3];
  cacheArcLengths?: number[];
};

export interface CurvePath {
  curves: Curve[];
  cacheLengths?: number[];
}

export interface CurvedHelixPath extends CurvePath {
  torsion?: number;
  torsionT0?: number;
}

export type Palette = {
  keyColor: Vec3;
  darkCp: number;
  lightCp: number;
  hueTorsion: number;
};

export type NamedPalette = Palette & { name: string };

export type PaletteConfig = {
  range: [number, number];
  nShades: number;
  linearity?: number;
  shadeNames?: Record<number, string>;
};

export type Theme = {
  backgrounds: {
    [paletteId: string]: PaletteConfig;
  };
  foregrounds: {
    [paletteId: string]: PaletteConfig;
  };
};

export type NamedTheme = Theme & { name: string };

export type TokenPackageType = 'csscp' | 'json';

export interface ThemeCollectionInclude {
  [paletteId: string]: number[];
}

export type TokenPackageConfig = {
  type: TokenPackageType;
  selector: string;
  include: {
    [themeId: string]: {
      backgrounds: ThemeCollectionInclude;
      foregrounds: ThemeCollectionInclude;
    };
  };
};
