import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ThemeProvider from './theme/ThemeProvider';

interface AppProviderProps {
  children: JSX.Element
}

const AppProvider = ({ children }: AppProviderProps) => (
  <BrowserRouter>
    <RecoilRoot>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </RecoilRoot>
  </BrowserRouter>
);

export default AppProvider;
