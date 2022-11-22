// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { createTheme, ThemeProvider } from '@mui/material/styles';

// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom/extend-expect';

const theme = createTheme();

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }
  )),
});

const customizedRender = (
  element: React.ReactElement,
) => {
  const { rerender, ...rest } = render(
    <RecoilRoot>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </RecoilRoot>,
  );

  return {
    ...rest,
    rerender(innerElement = element) {
      return rerender(
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            { innerElement }
          </ThemeProvider>
        </RecoilRoot>,
      );
    },
  };
};

// eslint-disable-next-line import/prefer-default-export
export { customizedRender as render };
