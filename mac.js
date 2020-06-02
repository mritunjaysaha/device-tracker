// const getmac = require("getmac");

// const callMac = function () {
//     return getmac.default();
// };

// // const mac = callMac();

// // console.log(mac);
// console.log(callMac);

// var http = require("http");

// http.get({ host: "api.ipify.org", port: 80, path: "/" }, function (resp) {
//     resp.on("data", function (ip) {
//         console.log("My public IP address is: " + ip);
//     });
// });
// const macaddress = require("macaddress");
// macaddress.one(function (err, mac) {
//     console.log("Mac address for this host: ", mac);
// });
const machineid = require("node-machine-id");

// machineid.machineId().then((id) => {
//     console.log(id);
// });

console.log(machineid.machineIdSync({ original: true }));
