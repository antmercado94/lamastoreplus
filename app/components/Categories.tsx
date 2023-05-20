import Link from 'next/link';
import Image from 'next/image';

export default function Categories() {
	return (
		<div className='flex flex-col gap-2 sm:h-[80vh] sm:flex-row'>
			{/* col 1 */}
			<div className='flex flex-1 flex-col gap-2'>
				<div className='relative flex flex-1 gap-2 overflow-hidden'>
					<Image
						src={'/cat/cat-img-1.jpg'}
						width={1000}
						height={1000}
						alt='Cat Image #1'
						className='h-full w-full object-cover'
					/>
					<Link
						href='/category/sale'
						className='bg-gray-white absolute inset-0 m-auto flex h-12 w-fit min-w-[100px] cursor-pointer items-center justify-center bg-white p-2 font-medium uppercase'
					>
						Sale
					</Link>
				</div>
				<div className='relative flex flex-1 gap-2 overflow-hidden'>
					<Image
						src={'/cat/cat-img-2.jpeg'}
						width={1000}
						height={1000}
						alt='Cat Image #2'
						className='h-full w-full object-cover'
					/>
					<Link
						href='/category/women'
						className='bg-gray-white absolute inset-0 m-auto flex h-12 w-fit min-w-[100px] cursor-pointer items-center justify-center bg-white p-2 font-medium uppercase'
					>
						Women
					</Link>
				</div>
			</div>
			{/* col 2 */}
			<div className='flex flex-1 flex-col gap-2'>
				<div className='relative flex flex-1 gap-2 overflow-hidden'>
					<Image
						src={'/cat/cat-img-3.jpeg'}
						width={1000}
						height={1000}
						alt='Cat Image #3'
						className='h-full w-full object-cover'
					/>
					<Link
						href='/category/new'
						className='bg-gray-white absolute inset-0 m-auto flex h-12 w-fit min-w-[100px] cursor-pointer items-center justify-center bg-white p-2 font-medium uppercase'
					>
						New Season
					</Link>
				</div>
			</div>
			{/* col 3 */}
			<div className='flex flex-[2] flex-col gap-2'>
				<div className='relative flex flex-1 gap-2 overflow-hidden'>
					{/* sub-col 1 */}
					<div className='flex flex-1 flex-col gap-2'>
						<div className='relative flex flex-1 gap-2 overflow-hidden'>
							<Image
								src={'/cat/cat-img-4.jpeg'}
								width={1000}
								height={1000}
								alt='Cat Image #4'
								className='h-full w-full object-cover'
							/>
							<Link
								href='/category/men'
								className='bg-gray-white absolute inset-0 m-auto flex h-12 w-fit min-w-[100px] cursor-pointer items-center justify-center bg-white p-2 font-medium uppercase'
							>
								Men
							</Link>
						</div>
					</div>
					{/* sub-col 2 */}
					<div className='flex flex-1 flex-col gap-2'>
						<div className='relative flex flex-1 gap-2 overflow-hidden'>
							<Image
								src={'/cat/cat-img-5.jpg'}
								width={1000}
								height={1000}
								alt='Cat Image #5'
								className='h-full w-full object-cover'
							/>
							<Link
								href='/category/accessories'
								className='bg-gray-white absolute inset-0 m-auto flex h-12 w-fit min-w-[100px] cursor-pointer items-center justify-center bg-white p-2 font-medium uppercase'
							>
								Accessories
							</Link>
						</div>
					</div>
				</div>
				{/* span full col */}
				<div className='relative flex flex-1 gap-2 overflow-hidden'>
					<Image
						src={'/cat/cat-img-6.jpg'}
						width={1000}
						height={1000}
						alt='Cat Image #6'
						className='h-full w-full object-cover'
					/>
					<Link
						href='/category/shoes'
						className='bg-gray-white absolute inset-0 m-auto flex h-12 w-fit min-w-[100px] cursor-pointer items-center justify-center bg-white p-2 font-medium uppercase'
					>
						Shoes
					</Link>
				</div>
			</div>
		</div>
	);
}
