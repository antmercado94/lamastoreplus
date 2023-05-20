import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/layout/navbar/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
	title: 'Lamastore+',
	description: 'Small e-commerce website using Next.js 13',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<div id='root'>
					<Providers>
						<Navbar />
						{children}
						<Footer />
					</Providers>
				</div>
			</body>
		</html>
	);
}
