const isAdmin = (req, res, next) => {

    const { admin } = req.body;

    if(admin !== true){
        res.status(404).send({
            error: "Page not found",
            description: "This page is only for staff members",
        });
    } else {
        next();
    }
}

module.exports = { isAdmin };