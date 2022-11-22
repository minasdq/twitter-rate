import { atom } from 'recoil';

import { ThemeMode } from 'Types/common';

interface ThemeAtom {
  mode: ThemeMode,
}

const themeAtom = atom<ThemeAtom>({
  key: 'theme',
  default: {
    mode:
    window.matchMedia('(prefers-color-scheme: dark)').matches || window.localStorage.getItem('theme') === ThemeMode.DARK
      ? ThemeMode.DARK : ThemeMode.LIGHT,
  },
  effects: [
    ({ onSet }) => {
      onSet((theme) => {
        window.localStorage.setItem('theme', theme.mode);
      });
    },
  ],
});

export default themeAtom;
