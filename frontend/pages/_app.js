import "../style/index.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import UserProvider from "../contexts/UserProvider";

export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <Nav />
            <div style={{ minHeight: "calc(100% - 118px)" }}>
                <Component {...pageProps} />
            </div>
            <Footer />
        </UserProvider>
    );
}
