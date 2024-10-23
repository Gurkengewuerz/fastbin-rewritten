import React from 'react';
import Script from 'next/script';

import env from '@/lib/env';

const Umami = () => {
  const scriptUrl = env('umami-script', true) ?? 'https://analytics.umami.is/script.js';
  const websiteID = env('umami-id', true);

  if (!websiteID) return <></>;

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={scriptUrl}
        data-website-id={websiteID}
      />
    </>
  );
};

export default Umami;
