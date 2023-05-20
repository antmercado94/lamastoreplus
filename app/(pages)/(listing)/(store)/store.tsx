import { create } from 'zustand';

interface CategoryState {
	selected: string[];
	maxPrice: number;
	sort: string;
	setSelected: (selected: string[]) => void;
	setMaxPrice: (price: number) => void;
	setSort: (option: string) => void;
}

const useStore = create<CategoryState>((set, get) => ({
	selected: [],
	maxPrice: 120,
	sort: '',
	setSelected: (selected) => {
		set((state) => {
			return {
				...state,
				selected: selected,
			};
		});
	},
	setMaxPrice: (price) => {
		set((state) => {
			return {
				...state,
				maxPrice: price,
			};
		});
	},
	setSort: (option) => {
		set((state) => {
			return {
				...state,
				sort: option,
			};
		});
	},
}));

export default useStore;
