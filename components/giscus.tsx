import Head from 'next/head';

const Giscus = () => {
  return (
    <Head>
      <script
        src="https://giscus.app/client.js"
        data-repo="hasanshahriar32/mealman"
        data-repo-id="R_kgDONIa5xg"
        data-category-id="DIC_kwDONIa5xs4ClHoR"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-input-position="top"
        data-theme="light"
        data-lang="en"
        crossOrigin="anonymous"
        async
      ></script>
    </Head>
  );
};

export default Giscus;