import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ThemeProvider from './theme/ThemeProvider';

interface AppProviderProps {
  children: JSX.Element
}

const queryClient = new QueryClient();

const AppProvider = ({ children }: AppProviderProps) => (
  <BrowserRouter>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </BrowserRouter>
);

export default AppProvider;
