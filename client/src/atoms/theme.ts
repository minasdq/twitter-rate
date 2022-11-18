import { atom } from 'recoil';

import { ThemeMode } from 'Types/theme';

interface ThemeAtom {
  mode: ThemeMode,
}

const themeAtom = atom<ThemeAtom>({
  key: 'theme',
  default: { mode: ThemeMode.LIGHT },
});

export default themeAtom;
