import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders h1 tag with Fauna', () => {
  const { getByText } = render(<App />);
  const element = getByText(/Fauna/i);
  expect(element).toBeInTheDocument();
});
