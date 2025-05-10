
const ibRoute = require('./ib.routes.js'); 
const masterCopyRoutes = require('./master_copy.routes.js'); 
const copyRoutes = require('./copy.routes.js'); 
const commissionRoutes = require('./commission.routes.js');
const trRoutes = require('./tr.routes.js');
const userRoutes = require('./user.routes.js'); // Uncomment if you have user routes

module.exports = {
    ibRoute, 
    masterCopyRoutes,
    copyRoutes,
    commissionRoutes,
    trRoutes,
    userRoutes

    
}