import { useRouter } from "next/router";
import App from "../../components/Apps/App";
import { Container } from "react-bootstrap";

const AppDisplay = () => {
    const router = useRouter();
    const { _id } = router.query;
    console.log(_id)
    return (
        <Container>
            <App _id={_id}/>
        </Container>
    );
};

export default AppDisplay;
