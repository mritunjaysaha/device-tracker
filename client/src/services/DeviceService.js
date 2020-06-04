export default {
    getDevices: () => {
        return fetch("/user/devices").then((res) => {
            if (res.status !== 401) {
                return res.json().then((data) => data);
            } else {
                return { message: { msgBody: "unAuthorized" }, msgError: true };
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
                return { message: { msgBody: "unAuthorized" }, msgError: true };
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

    postUpdate: (coordinates, mac) => {
        return fetch(`/user/update/${mac}`, {
            method: "post",
            body: JSON.stringify(coordinates),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.status !== 401) {
                res.json().then((data) => {
                    console.log("data: " + coordinates.latitude);
                    return {
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                    };
                });
            } else {
                return { message: { msgBody: "unAuthorized" }, msgError: true };
            }
        });
    },
};
