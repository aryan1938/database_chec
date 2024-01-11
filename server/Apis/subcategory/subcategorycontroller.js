
const Subcategory = require("./subcategoryModel")

const addsubCategory = (req, res) => {
    let validation = ""
    if (!req.body.categoryId)
        validation += "Category Id is required"
    if (!req.body.subcategoryname)
        validation += "Subcategory Name is required"
    if (!!validation) {
        res.json({
            success: false,
            status: 409,
            message: validation
        })
    }
    else {
        Subcategory.findOne({ subcategoryname: req.body.subcategoryname })
            .then(async data => {
                if (data) {
                    let total = await Subcategory.countDocuments().exec();
                    var newsubcategory = new Subcategory()
                    newsubcategory.subcategoryname = req.body.subcategoryname
                    newsubcategory.categoryId = req.body.categoryId
                    newsubcategory.subcategoryId = total + 1
                    newsubcategory.save()
                        .then(data => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Subcategory Added successfully",
                                data: data
                            })
                        })
                }
                else {
                    res.send({
                        success: false,
                        status: 409,
                        message: "Subcategory Already exist"
                    })
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}

const getallsubcategory = (req, res) => {
    Subcategory.find(req.body).populate('categoryId').sort({ created_at: -1 })
        .then((data) => {
            res.send({
                success: true,
                status: 200,
                message: "All subcategory loaded",
                total: data.length,
                data: data
            })
        })
        .catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: err.message
            })
        })
}

const getsiinglecategory = (req, res) => {
    let validation = ""
    if (!req.body._id)
        validation = "_id is required"
    if (!!validation)
        res.send({
            success: false, status: 409, message: validation
        })
    else {
        Subcategory.findOne({ _id: req.body._id })
            .then(data => {
                if (data == null) {
                    res.send({
                        success: false, status: 409, message: "Subcategory not found"
                    })
                }
                else {
                    res.send({
                        success: true, status: 200, message: "Subcategory Loaded", data: data
                    })
                }
            })
            .catch(err => {
                res.send({
                    success: false, status: 500, message: err.message
                })
            })
    }
}

const updatesubcategory = (req, res) => {
    let validation = ""
    if (!req.body._id)
        validation = "_id is required"
    if (!!validation)
        res.send({
            success: false, status: 409, message: validation
        })
    else {
        Subcategory.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false, status: 409, message: "Subcategory not found"
                    })
                }
                else {
                    if (!!req.body.subcategoryname)
                        data.subcategoryname = req.body.subcategoryname
                    data.save()
                        .then((saveddata) => {
                            res.send({
                                success: true, status: 200, message: "Subcategory Updated successfully", data: saveddata
                            })
                        })
                        .catch(err => {
                            res.send({
                                success: false, status: 500, message: err.message
                            })
                        })
                }
            })
            .catch(err => {
                res.send({ success: true, status: 500, message: err.message })
            })
    }
}
module.exports = { addsubCategory, getallsubcategory, getsiinglecategory, updatesubcategory }