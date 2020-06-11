import { useRouter } from "next/router";
import AppEdit from "../../../components/Apps/AppEdit";
import { Container } from "react-bootstrap";

const AppDisplay = () => {
    const router = useRouter();
    const { _id } = router.query;
    console.log(_id)
    return (
        <Container>
            <AppEdit _id={_id}/>
        </Container>
    );
};

export default AppDisplay;
