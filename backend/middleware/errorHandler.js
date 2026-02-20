// Error Handling Middleware
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
        }
    });
};

// 404 Handler
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: {
            message: 'Route not found',
            path: req.path
        }
    });
};
