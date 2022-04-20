

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
            title: 'Home'
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/home-base', { urlObj } );



    }  else if ( baseUrl === '/v1/sign-in' ) {

        urlObj = {
            url: 'sign-in',
            title: 'Sign In'
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/home-base', { urlObj } );



    } else if ( baseUrl === '/v1/create-an-account' ) {

        urlObj = {
            url: 'create-an-account',
            title: 'Create an Account'
        };

        return res.render('v1/home-base', { urlObj } );



    }




    return res.render('non-limited/homey');
};