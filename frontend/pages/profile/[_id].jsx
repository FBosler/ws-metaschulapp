
import React, {useContext} from "react";
import Profile from "../../components/Profile"
import UserProvider from "../../contexts/UserProvider"
import { useRouter } from "next/router";

export default () => {
    const router = useRouter()
    const { user : {_id : UserId} } = useContext(UserProvider.context);
    console.log(router.query)
    return <Profile/>;
};
