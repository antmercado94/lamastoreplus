'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/app/helpers/HTTP';
import { strapiQueries } from '@/app/helpers/strapi/queries';
import AddToCart from './(components)/AddToCart';
import Images from './(components)/Images';
import Links from './(components)/Links';
import Quantity from './(components)/Quantity';
import { notFound } from 'next/navigation';

const ProductView = ({ productId }: { productId: string }) => {
	const { data: product } = useQuery<StrapiData<ProductAll>>({
		queryKey: ['product', productId],
		queryFn: () => publicApi.get(strapiQueries.singleProduct(productId)),
	});

	const [quantity, setQuantity] = useState<number>(1);

	if (!product?.data) notFound();

	return (
		<>
			{/* left */}
			<Images
				imgData={{
					img1: product.data.attributes.img,
					img2: product.data.attributes.img2,
				}}
			/>
			{/* right */}
			<div className='flex flex-1 flex-col gap-7'>
				<h1 className='text-3xl font-bold'>{product.data.attributes?.title}</h1>
				<span className='text-3xl font-medium text-blue-500'>
					${product.data.attributes?.price}
				</span>
				<p className='text-justify text-lg font-light'>
					{product.data.attributes?.desc}
				</p>
				<Quantity quantity={quantity} setQuantity={setQuantity} />
				<AddToCart product={product.data} quantity={quantity} />
				<Links />
				<div className='mt-[30px] flex flex-col gap-2 text-sm text-gray-500'>
					<span>Vendor: Polo</span>
					<span>Product Type: T-Shirt</span>
					<span>Tag: T-shirt, Women, Top</span>
				</div>
				<hr className='border border-gray-200' />
				<div className='mt-[30px] flex flex-col gap-2 text-sm text-gray-500'>
					<span>DESCRIPTION</span>
					<hr className='w-[200px] border border-gray-200' />
					<span>ADDITIONAL INFORMATION</span>
					<hr className='w-[200px] border border-gray-200' />
					<span>FAQ</span>
				</div>
			</div>
		</>
	);
};

export default ProductView;
