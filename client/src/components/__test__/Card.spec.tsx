import { HeartIcon } from '@heroicons/react/outline';

import Card from '../Card';

import { render } from 'Configs/jest';

it('it should match snapshot', () => {
  const { container } = render(
    <Card media={<HeartIcon />} content="4" />,
  );

  expect(container).toMatchSnapshot();
});
