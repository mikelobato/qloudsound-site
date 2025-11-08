import type { ReactNode } from 'react';
import '../styles/globals.css';

export const metadata = {
  title: 'QloudSound',
  description: 'AI music pipeline'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
