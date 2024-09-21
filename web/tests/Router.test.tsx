import { screen } from '@testing-library/react';
import { navigateTo } from './utils';

describe('Router', () => {
  it('should render the home page for /', () => {
    // we can not createBrowserRouter() here because, it is used in browser. Our test env is in node env
    navigateTo('/');

    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
  });

  it('should render the products page for /products', () => {
    // we can not createBrowserRouter() here because, it is used in browser. Our test env is in node env
    navigateTo('/products');

    expect(
      screen.getByRole('heading', { name: /products/i })
    ).toBeInTheDocument();
  });
});
