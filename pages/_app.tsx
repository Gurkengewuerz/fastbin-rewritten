import { GeistProvider, CssBaseline } from '@geist-ui/react';
import '@/styles/base.scss';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Mousetrap from 'mousetrap';
import globalKeyBind from '@/lib/globalKeyBind';

import Head from 'next/head';
import Umami from '@/components/Umami';

const Fastbin = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    globalKeyBind(Mousetrap);
    (Mousetrap as any).bindGlobal('ctrl+i', () => router.push('/'));

    return () => {
      (Mousetrap as any).unbindGlobal('ctrl+i');
    };
  }, []);

  return (
    <GeistProvider theme={{ type: 'dark' }}>
      <CssBaseline />
      <Component {...pageProps} />
      <Umami />

      <Head>
        <title>fastbin</title>
        <meta name="charset" content="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="title" content="fastbin" />
        <meta name="description" content="free, fast, and easy pastebin service" />
      </Head>
    </GeistProvider>
  );
};

export default Fastbin;
