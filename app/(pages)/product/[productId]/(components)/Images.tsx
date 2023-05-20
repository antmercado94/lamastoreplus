'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = {
	imgData: {
		img1: {
			data: img;
		};
		img2: {
			data: img;
		};
	};
};

const Images = ({ imgData }: Props) => {
	const { img1, img2 } = imgData;

	const [selectedImg, setSelectedImg] = useState<string>('img1');

	return (
		<div className='flex flex-1 flex-col-reverse gap-5 sm:flex-row muiMd:flex-col-reverse lg:flex-row'>
			<div className='flex flex-1 gap-4 sm:flex-col sm:gap-0 muiMd:flex-row muiMd:gap-4 lg:flex-col lg:gap-0'>
				<Image
					src={process.env.NEXT_PUBLIC_UPLOAD_URL + img1?.data?.attributes?.url}
					width={1000}
					height={1000}
					priority={true}
					alt='Product Image #1'
					onClick={() => setSelectedImg('img1')}
					className='mb-[10px] max-h-[32vh] min-h-[180px] w-full cursor-pointer object-cover sm:max-h-0 sm:min-h-[150px] muiMd:min-h-[250px] lg:max-h-0 lg:min-h-[150px]'
				/>
				<Image
					src={process.env.NEXT_PUBLIC_UPLOAD_URL + img2?.data?.attributes?.url}
					width={1000}
					height={1000}
					priority={true}
					alt='Product Image #2'
					onClick={() => setSelectedImg('img2')}
					className='mb-[10px] max-h-[32vh] min-h-[180px] w-full cursor-pointer object-cover sm:max-h-0 sm:min-h-[150px] muiMd:min-h-[250px] lg:max-h-0 lg:min-h-[150px]'
				/>
			</div>
			{/* main image */}
			<div className='flex-[5]'>
				<Image
					width={600}
					height={600}
					src={`
						${
							process.env.NEXT_PUBLIC_UPLOAD_URL +
							`${
								selectedImg === 'img1'
									? img1?.data?.attributes?.url
									: img2?.data?.attributes?.url
							}
						`
						}
					`}
					alt=''
					className='max-h-[800px] w-full object-cover'
				/>
			</div>
		</div>
	);
};

export default Images;
