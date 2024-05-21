const router = require('express').Router();
const Pin = require("../models/Pin");

// create a pin
router.post("/", async (req, res) => {
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save().then((pin) => res.json(pin));
        res.status(200).json(savedPin)
    } catch (err) {
        res.status(500).json('Error: ' + err)
    }
    
})

// get all pin
router.get("/", async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch (err) {
        res.status(500).json("GET error", err);
    }
})

module.exports = router