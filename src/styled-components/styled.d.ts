import 'styled-components';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      background: string;
      backgroundSecondary: string;
      onBackground: string;
      primary: string;
      text: string;
    };
    space: {
      default: number;
    };
    size: {
      h1: number;
      h2: number;
      h3: number;
      h4: number;
      h5: number;
      h6: number;
    };
  }
}
