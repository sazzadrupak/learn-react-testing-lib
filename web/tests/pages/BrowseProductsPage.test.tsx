import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Theme } from '@radix-ui/themes';
import { delay, http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import BrowseProducts from '../../src/pages/BrowseProductsPage';

describe('BrowseProductsPage', () => {
  const renderComponent = () => {
    render(
      <Theme>
        <BrowseProducts />
      </Theme>
    );
  };

  it('should render a loading skeleton when fetching categories', () => {
    server.use(
      http.get('/categories', async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    renderComponent();
    const skeleton = screen.getByRole('progressbar', { name: /categories/i });

    expect(skeleton).toBeInTheDocument();
  });

  it('should hide loading skeleton after fetching categories', async () => {
    renderComponent();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /categories/i })
    );
  });

  it('should render a loading skeleton when fetching products', () => {
    server.use(
      http.get('/products', async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    renderComponent();
    const skeleton = screen.getByRole('progressbar', { name: /products/i });

    expect(skeleton).toBeInTheDocument();
  });

  it('should hide loading skeleton after fetching products', async () => {
    renderComponent();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /products/i })
    );
  });
});
