const getmac = require("getmac");

const callMac = function () {
    return getmac.default();
};

// const mac = callMac();

// console.log(mac);
console.log(callMac);
