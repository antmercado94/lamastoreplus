'use client';

import { useState } from 'react';
import Image from 'next/image';
import Icons from '@/icons';

const Slider = () => {
	const [currentSlide, setCurrentSlide] = useState<number>(0);

	const prevSlide = () => {
		setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
	};
	const nextSlide = () => {
		setCurrentSlide(currentSlide === 2 ? 0 : (next) => next + 1);
	};

	return (
		// 100 vh - navbar hight
		<div className='relative h-[calc(100vh-56px)] overflow-hidden muiMd:h-[calc(100vh-64px)] muiLg:h-[calc(100vh-66px)] xxxl:h-[calc(100vh-72px)]'>
			<div
				className='flex h-full w-[300vw] transition-all duration-1000'
				style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
			>
				<Image
					src={'/slider/slider-img-1.jpeg'}
					width={2000}
					height={2000}
					quality={100}
					priority={true}
					alt='Slider Image #1'
					className='h-full w-screen object-cover'
				/>
				<Image
					src={'/slider/slider-img-2.jpg'}
					width={2000}
					height={2000}
					quality={100}
					priority={true}
					alt='Slider Image #2'
					className='h-full w-screen object-cover'
				/>
				<Image
					src={'/slider/slider-img-3.jpg'}
					width={2000}
					height={2000}
					quality={100}
					priority={true}
					alt='Slider Image #3'
					className='h-full w-screen object-cover'
				/>
			</div>
			<div className='absolute bottom-12 left-0 right-0 m-auto flex w-fit gap-1'>
				<div
					onClick={prevSlide}
					className='flex h-12 w-12 cursor-pointer items-center justify-center'
				>
					<Icons.ArrowCircleLeftOutlinedIcon
						sx={{ fontSize: '3rem', color: '#fff' }}
					/>
				</div>
				<div
					onClick={nextSlide}
					className='flex h-12 w-12 cursor-pointer items-center justify-center'
				>
					<Icons.ArrowCircleRightOutlinedIcon
						sx={{ fontSize: '3rem', color: '#fff' }}
					/>
				</div>
			</div>
		</div>
	);
};

export default Slider;
