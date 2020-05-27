const router = require("express").Router();
const Device = require("../models/device.model");
const address = require("address");

function getMacAddress() {
    return address.mac(function (err, addr) {
        console.log(addr);
        console.log(typeof addr);
        return addr;
    });
}

router.route("/").get((req, res) => {
    Device.find()
        .then((device) => res.json(device))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const username = req.body.username;
    const devicename = req.body.devicename;
    const devicemac = req.body.devicemac;
    const newDevice = new Device({ username, devicename, devicemac });

    newDevice
        .save()
        .then(() => res.json("Device Added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

// get the mac address of the user
router.route("/mac").get((req, res) => {
    Device.find()
        .then(() => res.json(getMacAddress()))
        .catch((err) => res.status(400).json("Erroe: " + err));
});

// get user details
router.route("/:id").get((req, res) => {
    Device.findById(req.params.id)
        .then((device) => res.json(device))
        .catch((err) => res.status(400).json("Error: " + err));
});

// delete user
router.route("/:id").get((req, res) => {
    Device.findByIdAndDelete(req.params.id)
        .then(() => res.json("Device Deleted!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Device.findById(req.params.id)
        .then((device) => {
            device.username = req.body.username;
            device.devicename = req.body.devicename;
            device
                .save()
                .then(() => res.json("updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));

    Device.findByIdAndUpdate(req.params.id, {
        $push: { devicemac: ["mac added"] },
    })
        .then(() => res.json("mac added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
