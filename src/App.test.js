import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bug quiz page', () => {
  render(<App />);
  const linkElement = screen.getByText(/mafia quiz/i);
  expect(linkElement).toBeInTheDocument();
});
