import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

const context = createContext(null);

const UserProvider = ({ children }) => {
    const router = useRouter()
    const [user, setUser] = useState({
        data: {},
        errors: "No user data yet"
    });

    const [loggedInUserId, setLoggedInUserId] = useState(null)

    const updateUserState = () => {
        axios
            .get("/api/user/me", { withCredentials: true })
            .then(res => {
                const userData = {
                    data: {},
                    errors: {}
                };
                if (!("errors" in res.data)) {
                    userData.data = res.data;
                    setLoggedInUserId(userData.data._id)
                } else {
                    userData.errors = res.data.errors;
                }
                setUser(userData);
            })
            .catch((err) => {
                setUser({ data: {}, errors: `Error when logging in: ${err}` });
            });
    };

    const updateUserBackend = () => {
        axios
            .post("/api/user/update", user.data, { withCredentials: true })
            .then(res => {
                const userData = {
                    data: {},
                    errors: {}
                };
                if (!("errors" in res.data)) {
                    userData.data = res.data;
                } else {
                    userData.errors = res.data.errors;
                }
                setUser(userData);
            })
            .catch(err => {
                setUser({ data: {}, errors: `could not update with error: ${err}` });
            });
    };

    const logout = () => {
        axios
            .get("/api/user/logout")
            .then(() => {
                updateUserState();
                router.push("/");
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(updateUserState, []);

    return (
        <context.Provider
            value={{
                user,
                loggedInUserId,
                updateUserState,
                updateUserBackend,
                logout,
                setUser
            }}
        >
            {children}
        </context.Provider>
    );
};

UserProvider.context = context;

export default UserProvider;
