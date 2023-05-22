'use client';

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { publicApi } from '@/app/helpers/HTTP';
import { LoadingSpinner } from '@/app/components/loading';
import { strapiQueries } from '@/app/helpers/strapi/queries';

type FormData = {
	email: string;
	password: string;
	confirmPassword: string;
};

const RegisterForm = () => {
	const schema: ZodType<FormData> = z
		.object({
			email: z.string().email(),
			password: z.string().min(6),
			confirmPassword: z.string().min(6),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: 'Passwords do not match',
			path: ['confirmPassword'],
		});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	}); // connect zod with react-hook-form

	const [error, setError] = useState('');
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		// iterate react hook form errors
		for (const [key, value] of Object.entries(errors)) {
			if (value.message) {
				setError(value.message);
				break; // break after first error
			}
		}
	}, [errors]);

	const submitData = async (data: FormData) => {
		try {
			setLoading(true);
			const { email, password } = data;

			// get username from email, add rand string for duplicates
			// https://gist.github.com/6174/6062387
			const username =
				email.substring(0, email.indexOf('@')) +
				Math.random().toString(36).substring(2, 15) +
				Math.random().toString(36).substring(2, 15);

			const emailQuery = `/users?filters[$and][0][email][$eq]=${email}`;

			// check for existing user by query
			// temp fix -- not able to receive correct error response from strapi api
			const existingUser = await publicApi.get(emailQuery);

			if (existingUser.length) {
				setError('That email already exists');
				setLoading(false);
				return;
			}

			// create user
			const { user } = await publicApi.post(strapiQueries.register, {
				username,
				email,
				password,
			});

			if (!user) {
				setError('Could not create user, please try again');
				setLoading(false);
				return;
			}

			signIn('credentials', {
				email,
				password,
			});
		} catch (error: any) {
			setError(error?.response?.data?.error?.message);
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(submitData)}
			className='w-full space-y-4 sm:w-[325px] 2xl:w-[350px] xxxl:w-[400px]'
		>
			<div className='grid w-full items-center gap-1.5'>
				<TextField
					required
					id='outlined-basic'
					label='Email'
					{...register('email')}
				/>
			</div>
			<div className='grid w-full items-center gap-1.5'>
				<TextField
					required
					id='outlined-basic'
					label='Password'
					variant='outlined'
					type='password'
					{...register('password')}
				/>
			</div>
			<div className='grid w-full items-center gap-1.5'>
				<TextField
					required
					id='outlined-basic'
					label='Confirm Password'
					variant='outlined'
					type='password'
					{...register('confirmPassword')}
				/>
			</div>
			{error && <Alert severity='error'>{error}</Alert>}
			<div className='w-full'>
				<Button
					variant='contained'
					sx={{
						width: '100%',
						padding: '0.5rem',
						borderRadius: '0',
						fontSize: '1rem',
						textTransform: 'capitalize',
					}}
					disableElevation
					type='submit'
				>
					{loading ? <LoadingSpinner size={28} /> : 'Register'}
				</Button>
			</div>
		</form>
	);
};

export default RegisterForm;
