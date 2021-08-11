import { interpolateColors } from 'react-native-reanimated';
import 'styled-components';
import theme from './theme';

declare module 'styled-components'{
    type ThemeType = typeof theme

    export interface DefaultTheme extends ThemeType {}
}