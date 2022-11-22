import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Header from '../Header';

import { render } from 'Configs/jest';

it('it should render sun icon when theme is light', () => {
  render(<Header />);

  expect(screen.getByTestId('sun')).toBeInTheDocument();
});

it('it should sun icon be disappeared after clicking on it', async () => {
  render(<Header />);

  const iconContainer = screen.getByRole('button');
  await userEvent.click(iconContainer);

  expect(screen.queryByTestId('sun')).not.toBeInTheDocument();
});

it('it should render moon icon after clicking on sun icon', async () => {
  render(<Header />);

  const iconContainer = screen.getByRole('button');
  await userEvent.click(iconContainer);

  expect(screen.queryByTestId('sun')).not.toBeInTheDocument();
  expect(screen.getByTestId('moon')).toBeInTheDocument();
});
