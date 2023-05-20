'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useCartStore from '@/globalStore/cartStore';
import { useGetFromStore } from '@/helpers/hooks/zustandHooks';
import { privateApi } from '@/helpers/HTTP';
import { LoadingSpinner } from '@/app/components/loading';
import Icons from '@/app/components/icons';
import DeleteCartItem from './DeleteCartItem';
import Image from 'next/image';

const CartItems = ({
	isUser,
	toggleDrawer,
}: {
	isUser: boolean;
	toggleDrawer: any;
}) => {
	const products = useGetFromStore(useCartStore, (state) => state.products);
	const { resetCart } = useCartStore();

	const { data: session } = useSession();

	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const handlePayment = async () => {
		try {
			setLoading(true);

			if (!isUser) {
				window.location.href = '/api/auth/signin';
				return;
			}
			if (!session) throw new Error('Unauthenticated request');

			const { user } = session;

			if (!products?.length) {
				return (
					setError('No products in cart'), setLoading(false), setOpen(true)
				);
			}

			await privateApi.getCheckoutSession({ products, user });
		} catch (error) {
			setError('Something went wrong, please try again.');
			setLoading(false);
			setOpen(true);
		}
	};

	const total = () => {
		let total = 0;
		products?.forEach(
			(item) => (total += item.quantity * item.attributes.price)
		);
		return total.toFixed(2);
	};

	return (
		<div className='flex h-full flex-col bg-white'>
			<div className=' relative flex-grow overflow-hidden'>
				<div className='absolute bottom-0 left-0 right-[-20px] top-0 overflow-y-scroll p-4 sm:p-8'>
					<div className='mb-7 flex items-center justify-between'>
						<h1 className='text-2xl text-gray-500'>Shopping Cart</h1>
						<span className='cursor-pointer' onClick={toggleDrawer(false)}>
							<Icons.CloseIcon className='pointer-events-none' />
						</span>
					</div>
					<div className='w-full sm:pl-4 '>
						{products?.map((item) => {
							const img =
								process.env.NEXT_PUBLIC_UPLOAD_URL +
								item.attributes.img.data.attributes.url;
							return (
								// cart item
								<div
									key={item.id}
									className='mb-[30px] flex items-center justify-between gap-2 sm:gap-5'
								>
									<div className='flex gap-5'>
										<Image
											width={600}
											height={600}
											src={img}
											alt=''
											className='my-auto h-auto w-10 object-cover sm:w-20'
										/>
										{/* details */}
										<div className='w-48'>
											<h1 className='mb-1 text-lg font-medium text-gray-500 sm:mb-3'>
												{item.attributes.title}
											</h1>
											<p className='mb-1 text-sm text-gray-500 sm:mb-2'>
												{item.attributes.desc?.substring(0, 100)}
											</p>
											<div className='text-blue-500'>
												{item.quantity} x {item.attributes.price}
											</div>
										</div>
									</div>
									<DeleteCartItem productId={item.id} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
			{/* shopping summary */}
			<div className='bg-gray-100 p-8'>
				<h1 className='mb-7 text-2xl text-gray-500'>Summary</h1>
				<div className='sm:pl-4'>
					{/* total */}
					<div className='mb-5 flex justify-between text-lg font-semibold'>
						<span>SUBTOTAL</span>
						<span>${total()}</span>
					</div>
					<div className='flex flex-col items-center gap-2 sm:items-end'>
						<Button
							variant='contained'
							sx={{
								width: '16rem',
								padding: '0.75rem',
								borderRadius: '0',
								fontSize: '1rem',
							}}
							disableElevation
							onClick={handlePayment}
						>
							{loading ? <LoadingSpinner size={28} /> : 'PROCEED TO CHECKOUT'}
						</Button>
						<Snackbar
							anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
							open={open}
							autoHideDuration={6000}
							onClose={handleClose}
						>
							<Alert
								onClose={handleClose}
								severity='error'
								sx={{ width: '100%' }}
							>
								{error}
							</Alert>
						</Snackbar>
						<span
							className='cursor-pointer text-xs text-red-700'
							onClick={resetCart}
						>
							Reset Cart
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItems;
