import Link from 'next/link';
import Image from 'next/image';

export default function Card({ item }: { item: ProductAll }) {
	const { id, attributes } = item;
	const img1 = attributes.img.data.attributes;
	const img2 = attributes.img2.data.attributes;

	return (
		<Link href={`/product/${id}`}>
			<div className='mb-12 flex flex-col gap-2 xxs:w-[36vw] xxs:min-w-[6rem] sm:w-[20vw] sm:max-w-none md:w-[20vw] lg:w-[15vw] 2xl:max-w-[18rem]'>
				<div className='group relative h-[95vw] min-h-[12rem] w-full overflow-hidden xxs:h-[65vw] xxs:max-h-[400px] sm:max-h-[240px] md:max-h-[280px] lg:max-h-[300px] 2xl:max-h-[350px] xxxl:max-h-[45vh] xxxl:min-h-[450px]'>
					{attributes.isNew && (
						<span className='absolute left-1 top-[5px] z-30 bg-white px-[3px] py-[5px] text-xs font-medium text-teal-600'>
							New Season
						</span>
					)}
					<Image
						width={600}
						height={600}
						src={process.env.NEXT_PUBLIC_UPLOAD_URL + img1?.url}
						alt={img1?.name}
						className='absolute z-10 h-full w-full object-cover'
					/>
					{/* alt image */}
					{attributes.img2 && (
						<Image
							width={600}
							height={600}
							src={process.env.NEXT_PUBLIC_UPLOAD_URL + img2?.url}
							alt={img2?.name}
							className='absolute h-full w-full object-cover group-hover:z-20'
						/>
					)}
				</div>
				<h2>{attributes.title}</h2>
				<div className='flex gap-5'>
					<h3 className='text-lg font-medium text-gray-400 line-through'>
						${attributes.price + 20}
					</h3>
					<h3 className='text-lg font-medium'>${attributes.price}</h3>
				</div>
			</div>
		</Link>
	);
}
