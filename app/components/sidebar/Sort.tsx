'use client';

import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

type Props = {
	store: {
		sort: string;
		setSort: (sort: string) => void;
	};
};

const Sort = ({ store }: Props) => {
	return (
		<div className='mb-7'>
			<h2 className='mb-5 text-2xl'>Sort by</h2>
			<RadioGroup
				aria-labelledby='demo-radio-buttons-group-label'
				defaultValue={null}
				name='radio-buttons-group'
			>
				<FormControlLabel
					value='asc'
					control={<Radio onChange={(e) => store.setSort('asc')} />}
					label='Price (Lowest First)'
					checked={store.sort === 'asc'}
				/>
				<FormControlLabel
					value='desc'
					control={<Radio onChange={(e) => store.setSort('desc')} />}
					label='Price (Highest First)'
					checked={store.sort === 'desc'}
				/>
			</RadioGroup>
		</div>
	);
};

export default Sort;
