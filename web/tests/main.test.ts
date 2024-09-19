import { it, expect, describe } from 'vitest';
import { db } from './mocks/db';


describe('group', () => {
  it('should work', () => {
    const product = db.product.create({ name: 'Apple' });
    console.log(product);
  })
})