'use client';

import { useState } from 'react';
import useCartStore from '@/globalStore/cartStore';
import Icons from '@/icons';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

const AddToCart = ({
	product,
	quantity,
}: {
	product: ProductAll;
	quantity: number;
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const { addToCart } = useCartStore();

	const handleClick = () => {
		addToCart({ ...product, quantity });
		setOpen(true);
	};

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return (
		<>
			<Button
				startIcon={<Icons.AddShoppingCartIcon />}
				variant='contained'
				sx={{
					width: '16rem',
					padding: '0.75rem',
					borderRadius: '0',
					fontSize: '1rem',
				}}
				disableElevation
				onClick={handleClick}
			>
				ADD TO CART
			</Button>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
					Item added to cart
				</Alert>
			</Snackbar>
		</>
	);
};

export default AddToCart;
