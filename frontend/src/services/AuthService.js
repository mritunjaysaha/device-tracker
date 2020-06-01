export default {
    login: (user) => {
        return fetch("/user/login", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => data);
    },
    register: (user) => {
        return fetch("/user/register", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => data);
    },
    logout: () => {
        return fetch("/user/logout")
            .then((res) => res.json())
            .then((data) => data);
    },

    // isAuthenticated will sync our frontend and backend together so that
    // it persits even though the rreact application is closed
    isAuthenticated: () => {
        return fetch("/user/authenticated").then((res) => {
            if (res.status !== 401) {
                // PASSPORT sends a 401 error is user is not authenticated
                return res.json().then((data) => data);
            } else {
                return {
                    isAuthenticated: false,
                    user: { username: "" },
                };
            }
        });
    },
};