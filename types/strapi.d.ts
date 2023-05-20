interface StrapiData<T> {
	data: T;
	meta: {
		pagination: {
			page: number;
			pageCount: number;
			pageSize: number;
			total: number;
		};
	};
}

interface Product {
	id: number;
	attributes: {
		createdAt: string;
		desc: string | undefined;
		isNew: boolean;
		price: number;
		publishedAt: string;
		title: string;
		type: ProductType;
		updatedAt: string;
	};
}

interface ProductAll extends Product {
	attributes: Product['attributes'] & {
		img: {
			data: img;
		};
		img2: {
			data: img;
		};
	};
}

interface CartProduct extends ProductAll {
	quantity: number;
}

type StrapiAuth = {
	jwt: string;
	user: {
		id: number;
		username: string;
		email: string;
		provider: string;
		confirmed: boolean;
		blocked: boolean;
		createdAt: string;
		updatedAt: string;
	};
};

type ProductType = 'featured' | 'trending' | 'normal';

type Category = {
	id: number;
	attributes: {
		title: string;
		desc: string;
		createdAt: string;
		publishedAt: string;
	};
};

type checkoutData = {
	products: CartProduct[];
	user: any;
};

type Format = {
	ext: string;
	hash: string;
	height: number;
	mime: string;
	name: string;
	path: null | string;
	size: number;
	url: string;
	width: number;
};

type img = {
	id: number;
	attributes: {
		alternativeText: null | string;
		caption: null | string;
		createdAt: string;
		ext: string;
		formats: {
			large: Format;
			medium: Format;
			small: Format;
			thumbnail: Format;
		};
		hash: string;
		height: number;
		mime: string;
		name: string;
		previewUrl: null | string;
		provider: string;
		provider_metadata: null | any;
		size: number;
		updatedAt: string;
		url: string;
		width: number;
	};
};
