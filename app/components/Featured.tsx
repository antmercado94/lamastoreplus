'use client';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import SliderView from './SliderView';

const Featured = ({ type }: { type: ProductType }) => {
	return (
		<div className='mx-8 my-24 sm:mx-12 muiMd:mx-16 xl:mx-48'>
			<div className='mb-12 flex flex-col items-center justify-between gap-4 muiSm:flex-row muiSm:gap-0'>
				<h1 className='flex-[2] text-3xl font-bold first-letter:uppercase'>
					{type} products
				</h1>
				<p className='flex-[3] text-gray-400'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
					suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
					lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
					suspendisse ultrices gravida. Risus commodo viverra maecenas.
				</p>
			</div>
			<ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={['products']}>
				<SliderView type={type} />
			</ErrorBoundary>
		</div>
	);
};

export default Featured;
