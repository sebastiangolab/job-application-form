import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Lato } from 'next/font/google';

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
   return (
      <main className={`${lato.className}`}>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </main>
   );
}
