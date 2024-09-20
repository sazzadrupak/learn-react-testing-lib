import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Theme } from '@radix-ui/themes';

import BrowseProducts from '../../src/pages/BrowseProductsPage';
import userEvent from '@testing-library/user-event';
import { Category, Product } from '../../src/entities';
import { db } from '../mocks/db';
import { CartProvider } from '../../src/providers/CartProvider';
import { simulateDelay, simulateError } from '../utils';

describe('BrowseProductsPage', () => {
  const categories: Category[] = [];
  const products: Product[] = [];

  beforeAll(() => {
    [1, 2].forEach((item) => {
      categories.push(db.category.create({ name: 'Categiry' + item }));
      products.push(db.product.create());
    });
  });

  afterAll(() => {
    const categoryIds = categories.map((cat) => cat.id);
    db.category.deleteMany({ where: { id: { in: categoryIds } } });

    const productIds = products.map((product) => product.id);
    db.product.deleteMany({ where: { id: { in: productIds } } });
  });

  const renderComponent = () => {
    render(
      <CartProvider>
        <Theme>
          <BrowseProducts />
        </Theme>
      </CartProvider>
    );

    return {
      getProductSkeleton: () =>
        screen.queryByRole('progressbar', { name: /products/i }),
      getCategorySkeleton: () =>
        screen.queryByRole('progressbar', { name: /categories/i }),
      getCategoriesCombobox: () => screen.queryByRole('combobox'),
    };
  };

  it('should render a loading skeleton when fetching categories', () => {
    simulateDelay('/categories');

    const { getCategorySkeleton } = renderComponent();

    expect(getCategorySkeleton()).toBeInTheDocument();
  });

  it('should hide loading skeleton after fetching categories', async () => {
    const { getCategorySkeleton } = renderComponent();

    await waitForElementToBeRemoved(getCategorySkeleton);
  });

  it('should render a loading skeleton when fetching products', () => {
    simulateDelay('/products');

    const { getProductSkeleton } = renderComponent();

    expect(getProductSkeleton()).toBeInTheDocument();
  });

  it('should hide loading skeleton after fetching products', async () => {
    const { getProductSkeleton } = renderComponent();

    await waitForElementToBeRemoved(getProductSkeleton);
  });

  it('should not render an error if categories cannot be fetched', async () => {
    simulateError('/categories');

    const { getCategorySkeleton, getCategoriesCombobox } = renderComponent();

    await waitForElementToBeRemoved(getCategorySkeleton);

    expect(getCategoriesCombobox()).not.toBeInTheDocument();
  });

  it('should render an error if products cannot be fetched', async () => {
    simulateError('/products');

    renderComponent();

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('should render categories', async () => {
    const { getCategorySkeleton, getCategoriesCombobox } = renderComponent();

    await waitForElementToBeRemoved(getCategorySkeleton);

    const combobox = getCategoriesCombobox();
    expect(combobox).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(combobox!);

    expect(screen.getByRole('option', { name: /all/i })).toBeInTheDocument();
    categories.forEach((category) => {
      expect(
        screen.getByRole('option', { name: category.name })
      ).toBeInTheDocument();
    });
  });

  it('should render products', async () => {
    const { getProductSkeleton } = renderComponent();

    await waitForElementToBeRemoved(getProductSkeleton);

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});
