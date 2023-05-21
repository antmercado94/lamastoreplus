'use client';

import { useEffect, useMemo } from 'react';
import Slider from '@mui/material/Slider';

// slider marks
const marks = [
	{
		value: 0,
		label: '0',
	},
	{
		value: 20,
		label: '20',
	},
	{
		value: 60,
		label: '60',
	},
	{
		value: 120,
		label: '120',
	},
];

type Props = {
	min: number;
	max: number;
	store: {
		maxPrice: number;
		setMaxPrice: (price: number) => void;
	};
};

const PriceSlider = ({ min, max, store }: Props) => {
	let maxPriceTimeout: NodeJS.Timeout | null = null;
	let timeoutTime = 500;

	const maxPrice = useMemo(() => store.maxPrice, []);

	useEffect(() => {
		// cleanup
		return () => {
			maxPriceTimeout && clearTimeout(maxPriceTimeout);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [store.maxPrice]);

	const handleChange = (value: number) => {
		maxPriceTimeout = setTimeout(() => {
			store.setMaxPrice(value);
		}, timeoutTime);
	};

	function valuetext(value: number) {
		return `$${value}`;
	}

	return (
		<div className='mb-7 w-3/4 max-w-[15rem] pr-8'>
			<h2 className='mb-5 text-2xl'>Filter by price</h2>
			<Slider
				aria-label='Custom marks'
				defaultValue={maxPrice}
				getAriaValueText={valuetext}
				step={10}
				valueLabelDisplay='auto'
				min={min}
				max={max}
				marks={marks}
				onChangeCommitted={(e, value) => {
					handleChange(value as number);
				}}
			/>
		</div>
	);
};

export default PriceSlider;
