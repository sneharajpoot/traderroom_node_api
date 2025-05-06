'use strict';
const compose = require('composable-middleware');

const hasTag = (...allowedTag) => {
    return compose().use((req, res, next) => {
      var allowed = false;
      if (req.user) {
        allowedTag.forEach((element, index) => {
          if (req.user.access_metrix_tags.indexOf(element) > -1) {
            allowed = true;
          }
        });
        if (allowed) {
          next();
        } else {
          return res.status(403).send({ message: 'Not Authorised to perform this operation' });
        }
      } else {
        return res.status(403).json({ message: 'Forbidden' });
      }
    });
  };

module.exports = { 
    ensureHasTag: hasTag,
  };
  