import { render, screen } from '@testing-library/react';
import App from './App';

test('renders What link', () => {
  render(<App />);
  const linkElement = screen.getByText(/What/i);
  expect(linkElement).toBeInTheDocument();
});

