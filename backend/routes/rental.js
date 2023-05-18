const express = require("express");
const router = express.Router();
const Rental = require('../models/rental.model');

module.exports = function () {
    router.route("/add").post(function (req, res) {
        if (req.body.flag == "Save") {
            Rental.create({
                name: req.body.name,
                address: req.body.addr,
                image: req.body.image
            }, function (err, data) {
                if (!err) {
                    res.send({ state: "success" });
                }
            });
        } else {
            Rental.findOneAndUpdate({_id:req.body.id},{
                name: req.body.name,
                address: req.body.addr,
                image: req.body.image
            },{new:true,upsert:true},function(err,data){
                if(!err){
                    res.send({ state: "success" });
                }
            });
        }
    });
    router.route("/get").post(function (req, res) {
        Rental.find({}, function (err, data) {
            if (!err) {
                res.send(data);
            }
        });
    });
    router.route("/remove").post(function (req, res) {
        var ids = req.body.ids.split(",");
        var index = 0;
        for (var i=0;i<ids.length;i++) {
            Rental.findOneAndRemove({ _id: ids[i] }, function (err, result) {
                index++;
            });
        }
        res.send({ state: "success" });
    });
    return router;
}