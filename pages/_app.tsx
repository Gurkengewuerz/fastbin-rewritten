import '@/styles/base.scss';

import { useEffect } from 'react';
import { CssBaseline,GeistProvider } from '@geist-ui/react';
import Mousetrap from 'mousetrap';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Umami from '@/components/Umami';
import globalKeyBind from '@/lib/globalKeyBind';

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
    <GeistProvider themeType={'dark'}>
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

        <link rel="icon" type="image/x-icon" href="/logo.svg" />
      </Head>
    </GeistProvider>
  );
};

export default Fastbin;
