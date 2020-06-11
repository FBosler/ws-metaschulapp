import React from "react";
import ProfileView from "../../components/ProfileView";
import { useRouter } from "next/router";

export default () => {
    const router = useRouter();

    const {
        query: { _id: urlId },
    } = router

    return <ProfileView id={urlId} />;
};
