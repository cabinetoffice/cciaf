

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


    } else if ( baseUrl === '/v1/organisations' ) {

        urlObj = {
            url: 'organisations',
            nav: 'orgs',
            subNav: 'overview',
            title: 'Organisations Home',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/organisations-base', { urlObj } );



    } else if ( baseUrl === '/v1/my-organisation' ) {

        urlObj = {
            url: 'my-organisation',
            nav: 'orgs',
            subNav: 'my-org',
            title: 'My organisations',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/organisations-base', { urlObj } );



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
            url: 'assess-overview',
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
            url: 'assess-overview',
            nav: 'assess',
            subNav: 'my-assess',
            title: 'submitting assessment radios test',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );



    }




    return res.render('non-limited/homey');
};