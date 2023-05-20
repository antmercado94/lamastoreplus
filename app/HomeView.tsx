'use client';

import Slider from '@/components/Slider';
import FeaturedProducts from '@/components/Featured';
import Categories from '@/components/Categories';
import Contact from '@/components/contact/Contact';
import { useCallback, useEffect } from 'react';
import useCartStore from './(store)/cartStore';
import { useSearchParams } from 'next/navigation';

const HomeView = () => {
	const searchParams = useSearchParams();
	const { resetCart } = useCartStore();

	const success = searchParams.get('success');

	const clearCart = useCallback(() => resetCart(), [resetCart]);

	// reset cart after stripe payment
	useEffect(() => {
		if (success === 'true') {
			clearCart();
		}
	}, [success, clearCart]);

	return (
		<>
			<Slider />
			<FeaturedProducts type='featured' />
			<Categories />
			<FeaturedProducts type='trending' />
			<Contact />
		</>
	);
};

export default HomeView;
