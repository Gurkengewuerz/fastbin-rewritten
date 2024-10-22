import React from 'react';
import Script from 'next/script';

const Umami = () => {
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT ?? "https://analytics.umami.is/script.js";
  const websiteID = process.env.NEXT_PUBLIC_UMAMI_ID;

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
