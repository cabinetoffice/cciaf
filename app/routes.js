const express = require('express');
const router = express.Router();


// Controllers

const homeManager = require( './controllers/v1/baseController' );

const dataManager = require( './controllers/v1/dataController' );

const orgManager = require( './controllers/v1/orgController' );

// Add your routes here - above the module.exports line

// home & base URLs
/* ----------------- */

router.get( '/links', homeManager );

router.get( '/v1/home', homeManager );

router.get( '/v1/sign-in', homeManager );

router.get( '/v1/request-access', homeManager );

router.get( '/v1/request-complete', homeManager );

router.get( '/v1/password-reset', homeManager );

router.get( '/v1/chart-test', dataManager );

router.get( '/v1/todo-test', dataManager );

router.get( '/v1/todo-table-test', dataManager );

router.get( '/v1/todo-table-links-test', dataManager );

// tests for initial task(s)
router.get( '/v1/submitting-assessment-radios-test', dataManager );

router.get( '/v1/help', homeManager );

router.get( '/v1/assessments', dataManager );

router.get( '/v1/my-assessments', dataManager );

router.get( '/v1/new-assessment', dataManager );

// Assessment detail
router.get( '/v1/assessment-detail-radio', dataManager );

router.get( '/v1/assessment-detail-radio', dataManager );

router.get( '/v1/assessment-detail-select', dataManager );

router.get( '/v1/assessment-detail-linked-info', dataManager );

router.get( '/v1/assessment-detail-linked-themes', dataManager );

// Practice area detail
router.get( '/v1/practice-area-detail-radio', dataManager );

router.get( '/v1/practice-area-detail-radio-ambition', dataManager );

router.get( '/v1/practice-area-detail-radio-themes', dataManager );



// Organisations
router.get( '/v1/organisations', orgManager );

router.get( '/v1/my-organisation', orgManager );


module.exports = router;
