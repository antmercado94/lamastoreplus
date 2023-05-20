'use client';

import Image from 'next/image';
import { ErrorBoundary } from 'react-error-boundary';
import { strapiQueries } from '@/app/helpers/strapi/queries';
import useStore from '../../../(store)/store';
import List from '../../../(components)/List';
import ToggleSidebarView from '../../../(components)/ToggleSidebarView';
import SidebarView from './SidebarView';
import ErrorFallback from '@/app/components/ErrorFallback';

const ListView = ({ catName }: { catName: string }) => {
	const { selected, maxPrice, sort } = useStore();

	const catProdsQueryKey = ['catProds', catName, selected, maxPrice, sort];
	const httpQuery = strapiQueries.categoryProducts(
		catName,
		maxPrice,
		selected,
		sort
	);

	return (
		<div className='flex-[3]'>
			<Image
				src={'/cat-cover.jpeg'}
				width={1000}
				height={1000}
				priority={true}
				alt='Category'
				className='mb-12 h-[200px] w-full object-cover lg:h-[300px]'
			/>
			<ToggleSidebarView>
				<SidebarView catName={catName} isMobile={true} />
			</ToggleSidebarView>
			<ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={['catProds']}>
				<List queryKey={catProdsQueryKey} httpQuery={httpQuery} />
			</ErrorBoundary>
		</div>
	);
};

export default ListView;
