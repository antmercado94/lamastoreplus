import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import authHeader from './strapi/authHeader';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_API_KEY}`);

// make requests with public token
export const publicApi = {
	// GET
	get: async (url: string) => {
		const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL + url, {
			headers: authHeader(),
		});

		if (!data) throw new Error('Failed to send request');

		return data;
	},
	// POST
	post: async (url: string, body: any) => {
		const { data } = await axios.post(
			process.env.NEXT_PUBLIC_API_URL + url,
			body,
			{
				headers: authHeader(),
			}
		);

		if (!data) throw new Error('Failed to send request');

		return data;
	},
};

// make requests with jwt
export const privateApi = {
	// checkout session
	getCheckoutSession: async (checkoutData: checkoutData) => {
		const { products, user } = checkoutData;

		const stripe = await stripePromise;

		const { data } = await axios.post(
			process.env.NEXT_PUBLIC_API_URL + '/orders',
			{ products, customerId: user.id++ },
			{
				headers: authHeader(true, user.jwt),
			}
		);

		if (!data) throw new Error('Failed to send request');

		return await stripe?.redirectToCheckout({
			sessionId: data.stripeSession.id,
		});
	},
	// billing portal
	getBillingSession: async (user: any) => {
		const { data } = await axios.get(
			process.env.NEXT_PUBLIC_API_URL + '/billing',
			{
				headers: authHeader(true, user.jwt),
			}
		);

		if (!data) throw new Error('Failed to send request');

		return data.billingPortalUrl;
	},
};
