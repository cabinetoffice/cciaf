const express = require('express');
const router = express.Router();


// Controllers

const homeManager = require( './controllers/v1/baseController' );

const dataManager = require( './controllers/v1/dataController' );

// Add your routes here - above the module.exports line

// home & base URLs
/* ----------------- */

router.get( '/links', homeManager );

router.get( '/v1/home', homeManager );

router.get( '/v1/sign-in', homeManager );

router.get( '/v1/request-access', homeManager );

router.get( '/v1/request-complete', homeManager );

router.get( '/v1/chart-test', dataManager );

router.get( '/v1/todo-test', dataManager );

router.get( '/v1/todo-table-test', dataManager );

router.get( '/v1/todo-table-links-test', dataManager );

// tests for initial task(s)
router.get( '/v1/submitting-assessment-radios-test', dataManager );

router.get( '/v1/help', homeManager );

router.get( '/v1/assessments', dataManager );

router.get( '/v1/my-assessments', dataManager );

router.get( '/v1/organisations', dataManager );


module.exports = router;
