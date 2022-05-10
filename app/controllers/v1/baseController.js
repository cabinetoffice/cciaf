

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


    } else if ( baseUrl === '/v1/home' ) {

        urlObj = {
            url: 'home',
            nav: 'home',
            title: 'Home',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Grants', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
            backLink: {
                show: false
            }
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/home-base', { urlObj } );



    } else if ( baseUrl === '/v1/request-access' ) {

        urlObj = {
            url: 'request-access',
            nav: 'account',
            title: 'Request Access',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Grants', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
            backLink: {
                show: false
            }
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/home-base', { urlObj } );



    } else if ( baseUrl === '/v1/request-complete' ) {

        urlObj = {
            url: 'request-complete',
            nav: 'account',
            title: 'Request Access',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Grants', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
            backLink: {
                show: false
            }
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/home-base', { urlObj } );



    } else if ( baseUrl === '/v1/sign-in' ) {

        urlObj = {
            url: 'sign-in',
            nav: 'account',
            title: 'Sign In',
            breadCrumbs: [
                { text: 'Home', href: "/v1/home" },
                { text: 'Sign in', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/home-base', { urlObj } );



    } else if ( baseUrl === '/v1/create-an-account' ) {

        urlObj = {
            url: 'create-an-account',
            title: 'Create an Account'
        };

        return res.render('v1/home-base', { urlObj } );



    } else if ( baseUrl === '/v1/help' ) {

        urlObj = {
            url: 'help',
            nav: 'help',
            title: 'Help',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Grants', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
            backLink: {
                show: false
            }
        };
        return res.render('v1/home-base', { urlObj } );



    }




    return res.render('non-limited/homey');
};