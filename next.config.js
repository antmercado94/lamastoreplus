/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: [process.env.PRODUCT_IMAGES_DOMAIN ?? '127.0.0.1'],
	},
};

module.exports = nextConfig;
