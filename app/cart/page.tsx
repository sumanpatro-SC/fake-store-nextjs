import { getCartFromCookies } from '../../lib/actions';
import CartPageClient from './CartPageClient';

export default async function CartPage() {
  const cart = await getCartFromCookies();

  return <CartPageClient initialCart={cart} />;
}