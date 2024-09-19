import { render, screen } from '@testing-library/react';
import UserList from '../../src/components/UserList';

describe('UserList', () => {
  it('should render no users when user list is empty', () => {
    render(<UserList users={[]} />);

    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it('should render users list when user list is not empty', () => {
    const users = [
      { id: 1, name: 'Rupak' },
      { id: 2, name: 'Ruhan' },
    ];

    render(<UserList users={users} />);

    users.forEach((user) => {
      const link = screen.getByRole('link', { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/users/${user.id}`);
    });
  });
});
