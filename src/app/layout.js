import './globals.css';
import { Nunito } from 'next/font/google';

//components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppProvider from '@/components/AppContext';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '500', '700',] })

export const metadata = {
  title: 'Pizzon',
  description: 'A dynamic Pizza Ordering App Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        <AppProvider>
          <Header />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  )
}
