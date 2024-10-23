import '@/styles/base.scss';

import { useEffect } from 'react';
import { CssBaseline, GeistProvider } from '@geist-ui/react';
import Mousetrap from 'mousetrap';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';

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

  // Next.js, will inline all the process.env.SOMETHING variables into the code at build time.
  // Which will force us to build the app for each environment we want to deploy to, with the
  // only different being few environment variables. Instead, what we want is to get the environment
  // dynamically from the runtime, so if we change them in the env and run the app again, it must
  // use the new environment variables. To do this, we will inject the environment variables into
  // the window object, so we can access them in the runtime.
  // IMPORTANT: this can't be access with `process.env.SOMETHING`, as it will be replaced at build time,
  // instead use the `getEnv` function from `env.tsx`.
  const InjectRuntimePublicEnv = () => {
    const env = Object.entries(process.env).reduce((all, [key, value]) => {
      if (!key.startsWith('NEXT_PUBLIC_')) {
        return all;
      }
      all[key] = value;
      return all;
    }, {});
    return (
      <Script
        id="inject-runtime-env"
        strategy="beforeInteractive"
      >{`window.process = ${JSON.stringify({ env }, null, 2)}`}</Script>
    );
  };

  return (
    <GeistProvider themeType={'dark'}>
      <CssBaseline />
      <Component {...pageProps} />
      <InjectRuntimePublicEnv />
      <Umami />

      <Head>
        <title>fastbin</title>
        <meta name="charset" content="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="title" content="fastbin" />
        <meta
          name="description"
          content="free, fast, and easy pastebin service"
        />

        <link rel="icon" type="image/x-icon" href="/logo.svg" />
      </Head>
    </GeistProvider>
  );
};

export default Fastbin;
