import { RecoilRoot } from 'recoil';

import ThemeProvider from './theme/ThemeProvider';

interface AppProviderProps {
  children: JSX.Element
}

const AppProvider = ({ children }: AppProviderProps) => (
  <RecoilRoot>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </RecoilRoot>
);

export default AppProvider;
