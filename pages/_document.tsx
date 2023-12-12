import { Html,  Main, NextScript, Head } from "next/document";
// import Head from "next/head";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="eleven Barbershop - ваш лучший выбор для стильных стрижек и ухода за внешностью в Самарканде."
        />
        <meta
          property="og:title"
          content="eleven Barbershop - Стрижка и уход в Самарканде"
        />
        <meta
          property="og:description"
          content="eleven Barbershop - ваш лучший выбор для стильных стрижек и ухода за внешностью в Самарканде."
        />
        <meta
          property="og:image"
          content="https://eleven-barbershop.uz/_next/static/media/logoReal.98443783.png"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Барбершоп eleven в Самарканде - ваш идеальный выбор для стильных стрижек и услуг по уходу за внешностью."
        />
        <meta
          name="keywords"
          content="eleven Barbershop, Самарканд, стрижки, уход, услуги парикмахера"
        />
        <meta name="author" content="Бобур Вафаев" />

        <meta
          property="og:description"
          content="Идеальное место для стильных стрижек и услуг по уходу за волосами в Самарканде."
        />
        <meta property="og:url" content="https://eleven-barbershop.uz/" />
        <meta property="og:type" content="website" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>eleven 11</title>
      </Head>
      <body className="bg-[#101010]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
