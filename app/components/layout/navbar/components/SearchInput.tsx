'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.black, 0.05),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.black, 0.1),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

const SearchInput = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const router = useRouter();

	const onSearch = (e: React.FormEvent) => {
		e.preventDefault();

		// encode search string into valid url string
		const encodedSearchQuery = encodeURI(searchQuery);

		router.push(`/search?q=${encodedSearchQuery}`);

		console.log('current query', encodedSearchQuery);
	};

	return (
		<form onSubmit={onSearch}>
			<Search>
				<SearchIconWrapper>
					<SearchIcon />
				</SearchIconWrapper>
				<StyledInputBase
					placeholder='Search…'
					inputProps={{ 'aria-label': 'search' }}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</Search>
		</form>
	);
};

export default SearchInput;
