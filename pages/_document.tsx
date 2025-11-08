import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const locale = this.props.locale ?? 'en';
    return (
      <Html lang={locale}>
        <Head>
          <meta name="theme-color" content="#050506" />
          {process.env.NODE_ENV === 'production' && (
            <Script id="gtm-loader" strategy="afterInteractive">
              {`(function(){
  function hasConsent(){
    return document.cookie.split(';').some(c => c.trim() === 'ql-cookie=accepted');
  }
  function loadGTM(){
    if(window.__gtmLoaded) return;
    window.__gtmLoaded = true;
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KX7C2B7C');
  }
  window.__loadGTM = loadGTM;
  if(hasConsent()){ loadGTM(); }
})();`}
            </Script>
          )}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/images/qloudsound_icon.svg" />
        </Head>
        <body>
          {process.env.NODE_ENV === 'production' && (
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-KX7C2B7C"
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
