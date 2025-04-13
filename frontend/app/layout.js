import './globals.css';

export const metadata = {
  title: 'Phone Accessories Shop',
  description: 'Buy phone accessories online',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
