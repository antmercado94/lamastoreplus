export default async function productLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex min-h-full max-w-[100vw] overflow-x-clip px-8 py-7 xl:px-12'>
			{children}
		</div>
	);
}
