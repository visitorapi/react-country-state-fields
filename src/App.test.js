import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the demo form fields', () => {
  render(<App />);
  expect(screen.getByLabelText('Country/Territory')).toBeInTheDocument();
  expect(screen.getByLabelText('State/Province')).toBeInTheDocument();
  expect(screen.getByLabelText('City')).toBeInTheDocument();
});
