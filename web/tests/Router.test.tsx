import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes';

describe('Router', () => {
  it('should render the home page for /', () => {
    // we can not createBrowserRouter() here because, it is used in browser. Our test env is in node env
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
  });

  it('should render the products page for /products', () => {
    // we can not createBrowserRouter() here because, it is used in browser. Our test env is in node env
    const router = createMemoryRouter(routes, {
      initialEntries: ['/products'],
    });
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole('heading', { name: /products/i })
    ).toBeInTheDocument();
  });
});
