const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);

}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.stastusCode === 200 ? 500 : res.stastusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
    });
}

module.exports = { notFound, errorHandler }