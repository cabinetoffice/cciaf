const express = require('express');
const router = express.Router();


// Controllers

const homeManager = require( './controllers/v1/baseController' );

// Add your routes here - above the module.exports line

// home & base URLs
/* ----------------- */

router.get( '/links', homeManager );

router.get( '/v1/home', homeManager );

router.get( '/v1/sign-in', homeManager );

router.get( '/v1/create-an-account', homeManager );

module.exports = router;
