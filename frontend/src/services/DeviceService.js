export default {
    getDevices: () => {
        return fetch("/user/devices").then((res) => {
            if (res.status !== 401) {
                return res.json().then((data) => data);
            } else {
                return { message: { msgBody: "UnAuthorized" }, msgError: true };
            }
        });
    },

    postDevice: (device) => {
        return fetch("/user/device", {
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

    getMac: () => {
        return fetch("/user/mac").then((res) => {
            if (res.status !== 401) {
                return res.json().then((data) => data);
            } else {
                return { message: { msgBody: "unAuthorized" }, msgError: true };
            }
        });
    },
};
