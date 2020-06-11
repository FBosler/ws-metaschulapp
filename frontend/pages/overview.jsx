import Overview from "../components/Apps/Overview";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";

const Apps = () => {
    const router = useRouter();
    const { query } = router;
    return (
        <Container>
            <Overview query={query}/>
        </Container>
    );
};

export default Apps;
