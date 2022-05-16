

const express = require('express');
var session = require('express-session');


module.exports =  function grid( req, res ) {


    let baseUrl = req.url;

    let urlObj = {};

    let searchFilter = req.params.filter;

    // let leftFilter = req.params.leftFilter;

    let applicantFilter = req.params.applicantFilter;

    let cats = req.params.cats;

    let query = req.query;

    let dataBody = req.body;

    let mySearch = req.session.data;

    if ( baseUrl === '/links' ) {

        return res.send("links");


    } else if ( baseUrl === '/v1/chart-test' ) {

        urlObj = {
            url: 'chart-test',
            title: 'Chart test',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );


    } else if ( baseUrl === '/v1/todo-test' ) {

        urlObj = {
            url: 'todo-test',
            title: 'TODO test',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );


    } else if ( baseUrl === '/v1/todo-table-test' ) {

        urlObj = {
            url: 'todo-table-test',
            title: 'TODO test',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );


    } else if ( baseUrl === '/v1/todo-table-links-test' ) {

        urlObj = {
            url: 'todo-table-links-test',
            title: 'TODO test',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );


    } else if ( baseUrl === '/v1/submitting-assessment-radios-test' ) {

        urlObj = {
            url: 'submitting-assessment-radios-test',
            nav: 'assess',
            title: 'submitting assessment radios test',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );


    } else if ( baseUrl === '/v1/assessments' ) {

        urlObj = {
            url: 'assessments-overview',
            nav: 'assess',
            subNav: 'overview',
            title: 'submitting assessment radios test',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );


    } else if ( baseUrl === '/v1/my-assessments' ) {

        urlObj = {
            url: 'my-assessments',
            nav: 'assess',
            subNav: 'my-assess',
            title: 'submitting assessment radios test',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'My assessments', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );

    }

    // START: Assessment detail
    else if ( baseUrl === '/v1/new-assessment' ) {

        urlObj = {
            url: 'new-assessment',
            nav: 'assess',
            subNav: 'new-assess',
            title: 'New Assessment',
            breadCrumbs: [
                { text: 'Home', href: "/v1/home" },
                { text: 'Assessments', href: "/v1/assessments" },
                { text: 'Overview', href: "" }
            ],
            backLink: {
                show: true,
                extraText: 'to My Assessments',
                url: '/v1/my-assessments'
            }
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );

    } else if ( baseUrl === '/v1/assessment-detail-linked-info' ) {

        urlObj = {
            url: 'assessment-detail-linked-info',
            nav: 'assess',
            subNav: 'my-assess',
            title: 'Assessment Detail Linked Info',
            breadCrumbs: [
                { text: 'Home', href: "/v1/home" },
                { text: 'Assessments', href: "/v1/assessments" },
                { text: 'My assessments', href: "/v1/my-assessments" },
                { text: 'Assessment detail', href: "" }
            ],
            backLink: {
                show: true,
                extraText: 'to My Assessments',
                url: '/v1/my-assessments'
            }
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );

    } else if ( baseUrl === '/v1/assessment-detail-linked-themes' ) {

        urlObj = {
            url: 'assessment-detail-linked-themes',
            nav: 'assess',
            subNav: 'my-assess',
            title: 'Assessment Detail Linked Themes',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'My assessments', href: "/v1/my-assessments" },
                { text: 'Assessment ID: DFE-909787', href: "" }
            ],
            backLink: {
                show: true,
                extraText: 'to My Assessments',
                url: '/v1/my-assessments'
            }
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );

    }




    else if ( baseUrl === '/v1/assessment-detail-select' ) {

        urlObj = {
            url: 'assessment-detail-select',
            nav: 'assess',
            subNav: 'new-assess',
            title: 'Assessment detail radio',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );

    } else if ( baseUrl === '/v1/practice-area-detail-radio' ) {

        urlObj = {
            url: 'practice-area-detail-radio',
            nav: 'assess',
            subNav: 'my-assess',
            title: 'Assessment detail radio',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'My assessments', href: "/v1/my-assessments" },
                { text: 'Assessment ID: DFE-909787', href: "" }
            ],
            backLink: {
                show: true,
                extraText: 'to my assessments',
                url: '#'
            }
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );

    } else if ( baseUrl === '/v1/practice-area-detail-radio-ambition' ) {

        urlObj = {
            url: 'practice-area-detail-radio-ambition',
            nav: 'assess',
            subNav: 'my-assess',
            title: 'Assessment detail radio',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'My assessments', href: "/v1/my-assessments" },
                { text: 'Assessment ID: DFE-909787', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );

    } else if ( baseUrl === '/v1/practice-area-detail-radio-themes' ) {

        urlObj = {
            url: 'practice-area-detail-radio-themes',
            nav: 'assess',
            subNav: 'my-assess',
            title: 'Assessment detail radio',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'My assessments', href: "/v1/my-assessments" },
                { text: 'Assessment ID: DFE-909787', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );

    }




    return res.render('non-limited/homey');
};