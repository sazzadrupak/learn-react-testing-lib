import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TermsAndConditions from '../../src/components/TermsAndConditions';

describe('TermsAndConditions', () => {
  it('should render with correct text and initial state', () => {
    render(<TermsAndConditions />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Terms & Conditions');

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/submit/i);
    expect(button).toBeDisabled();
  });

  it('should enable the button when checkbox is checked', async () => {
    render(<TermsAndConditions />);

    const checkbox = screen.getByRole('checkbox');
    const user = userEvent.setup();
    await user.click(checkbox);

    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeEnabled();
  });
});
