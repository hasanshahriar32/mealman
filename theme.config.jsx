const YEAR = new Date().getFullYear()

export default {
  footer: (
    <small style={{ display: "block", marginTop: "8rem" }}>
      <time>{YEAR}</time> © Paradox Tech BD.
      <a href="https://github.com/hasanshahriar32/mealman">GitHub</a>
      <style jsx>{`
        a {
          float: right;
        }
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </small>
  ),
  head: ({ title, meta }) => (
    <>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
    </>
  ),
  readMore: "Read More →",
  postFooter: null,
  darkMode: false,
  navs: [
    // {
    //   url: "https://github.com/hasanshahriar32/meal-management",
    //   name: "Github",
    // },
    {
      url: "/",
      name: "Home",
    },
  ],
};