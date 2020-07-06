import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import Chatbot from "../components/Chatbot";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <meta name="description" content="One App to rule them all, One App to find them" />
                    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                    <link rel="manifest" href="/manifest.json" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>                     <script src="https://account.snatchbot.me/script.js"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <Chatbot />
            </Html>
        );
    }
}
