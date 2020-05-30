export default {
    getDevices: () => {
        return fetch("/user/device").then((res) => {
            if (res.status !== 401) {
                return res.json().then((data) => data);
            } else {
                return { message: { msgBody: "UnAuthorized" }, msgError: true };
            }
        });
    },
    postDevices: (device) => {
        return fetch("/user/todo", {
            method: "post",
            body: JSON.stringify(device),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.status !== 401) {
                return res.json().then((data) => data);
            } else {
                return { message: { msgBody: "UnAuthorized" }, msgError: true };
            }
        });
    },
};
