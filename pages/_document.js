import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const meta = {
    title: "Next.js Blog Starter Kit",
    description: "Clone and deploy your own Next.js portfolio in minutes.",
    image: "https://assets.vercel.com/image/upload/q_auto/front/vercel/dps.png",
  };

  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourname" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }} id="giscus-container"></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const script = document.createElement('script');
                script.src = 'https://giscus.app/client.js';
                script.async = true;
                script.crossOrigin = 'anonymous';
                script.setAttribute('data-repo', 'hasanshahriar32/mealman');
                script.setAttribute('data-repo-id', 'R_kgDONIa5xg');
                script.setAttribute('data-category-id', 'DIC_kwDONIa5xs4ClHoR');
                script.setAttribute('data-mapping', 'pathname');
                script.setAttribute('data-strict', '0');
                script.setAttribute('data-reactions-enabled', '1');
                script.setAttribute('data-input-position', 'top');
                script.setAttribute('data-theme', 'light');
                script.setAttribute('data-lang', 'en');
                document.getElementById('giscus-container').appendChild(script);
              })();
            `,
          }}
        ></script>
      </body>
    </Html>
  );
}
