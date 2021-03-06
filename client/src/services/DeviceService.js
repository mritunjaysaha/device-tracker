export default {
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
    getDeviceList: () => {
        return fetch("/user/devicelist").then((res) => {
            if (res.status !== 401) {
                return res.json().then((data) => data);
            } else {
                return { message: { msgBody: "unAuthorized" }, msgError: true };
            }
        });
    },
    getCoordinates: (mac) => {
        return fetch(`/user/coordinates/${mac}`).then((res) => {
            if (res.status !== 401) {
                return res.json().then((data) => data);
            } else {
                return { message: { msgBody: "unAuthorized" }, msgError: true };
            }
        });
    },

    postUpdateCoordinates: (mac, updates) => {
        // console.log("updates: ", updates);
        return fetch(`/user/update-coordinates/${mac}`, {
            method: "post",
            body: JSON.stringify(updates),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.status !== 401) {
                res.json().then((data) => data);
            } else {
                return { message: { msgBody: "unAuthorized" }, msgError: true };
            }
        });
    },
    deleteDevice: (id) => {
        return fetch(`/user/${id}`, {
            method: "delete",
        })
            .then((res) => {
                return res.json().then((data) => data);
            })
            .catch((err) => console.log(err));
    },
};
