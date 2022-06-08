'use strict';
const excelToJson = require('convert-excel-to-json');

const express = require('express');
var session = require('express-session');


module.exports =  function grid( req, res ) {

    let baseUrl = req.url;
    let urlObj = {};
    let searchFilter = req.params.filter;

    let applicantFilter = req.params.applicantFilter;
    let cats = req.params.cats;
    let query = req.query;
    let dataBody = req.body;
    let mySearch = req.session.data;

    let userId = req.params.userID;
    let themeId = req.params.themeID;
    let practiceAreaId = req.params.paID;

    let columnKey = {
        A: 'pa_id',
        B: 'pa_div_id',
        C: 'criteria',
        D: 'pa_desc'
    };
    let overviewColumnKey = {
        A: 'theme_id',
        B: 'theme_name',
        C: 'assigned_to',
        D: 'sub_tasks',
        E: 'pc_complete',
        F: 'status',
        G: 'overall_rating',
        H: 'overall_score',
        I: 'average'
    };
    let usersColumnKey = {
        A: 'user_id',
        B: 'name',
        C: 'job_title',
        D: 'email',
        E: 'working_on',
        F: 'status',
        G: 'is_owner'
    };
    let practiceAreasColumnKey = {
        A: 'pa_id',
        B: 'theme_id',
        C: 'pa_desc',
        D: 'assigned_to',
        E: 'num_of_criteria',
        F: 'pa_complete',
        G: 'percent_complete'
    };

    /* this is where we gather the grants data */
    const importContent = excelToJson({
        sourceFile: './public/data/gov_comm_content_db_v2.xlsx',
        columnToKey: overviewColumnKey,
        header: {
            rows: 1
        }
    });
    let importThemes = importContent.overview;

    // START: The URL interrogation loop
    // -----------------------------------
    if ( baseUrl === '/links' ) {
        return res.send("links");
    }

    // START:: #1 Assessments Overview Main Landing Page
    else if (( baseUrl === '/v2/assessments' )
        || ( baseUrl === `/v2/assessments?test=${query.test}` )) {

        console.log('QUERY DATA', query);

        urlObj = {
            url: 'assessments-overview',
            nav: 'assess',
            subNav: 'overview',
            title: 'submitting assessment radios test',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Current Assessment', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
            themeData: importThemes,
            testVersion: query.test
        };

        return res.render('v2/data-base', { urlObj } );
    }

    // START:: Assessments "Cover Sheet" Page
    else if (( baseUrl === '/v2/assessments/cover-sheet')
        || ( baseUrl === `/v2/assessments/cover-sheet?test=${query.test}` )) {

        urlObj = {
            url: 'assessments-cover-sheet',
            nav: 'assess',
            subNav: 'overview',
            title: 'Current Assessment - Cover Sheet',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Current assessment', href: "/v1/grants" },
                { text: 'Cover sheet', href: "" }
            ],
        };

        return res.render('v2/data-base', { urlObj } );
    }

    // START:: #3 Assessments THEMES Page
    else if (( baseUrl === '/v2/assessments/themes' )
        || ( baseUrl === `/v2/assessments/themes?test=${query.test}` )) {

        /* this is where we gather the grants data */
        const importContent = excelToJson({
            sourceFile: './public/data/gov_comm_content_db_v2.xlsx',
            columnToKey: overviewColumnKey,
            header: {
                rows: 1
            }
        });

        let importThemes = importContent.overview;

        urlObj = {
            url: 'assessments-themes',
            nav: 'assess',
            subNav: 'overview',
            title: 'submitting assessment radios test',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Current Assessment', href: "/v1/grants" },
                { text: 'Themes 1 to 8', href: "" }
            ],
            themeData: importThemes,
            testVersion: query.test
        };

        return res.render('v2/data-base', { urlObj } );
    }


    // START:: #4 Assessments -> THEMES SINGLE PAGE
    else if (( baseUrl === `/v2/assessments/themes/${themeId}` )
    || ( baseUrl === `/v2/assessments/themes/${themeId}?test=${query.test}` )) {

        console.log('got the numberoooooo', userId);

        /* this is where we gather the grants data */
        const importContent = excelToJson({
            sourceFile: './public/data/gov_comm_content_db_v2.xlsx',
            columnToKey: practiceAreasColumnKey,
            header: {
                rows: 1
            }
        });

        let importPracticeAreas = importContent.practice_areas;

        console.log('THE PA  ARRAY', importPracticeAreas );

        //var item = importUsers.find(item => item.user_id === parseInt(userId) );

        console.log('THE ITEM', item);

        //let myNewID = importUsers.findIndex(x => x.user_id === userId );

        let myNEWPuppy = importPracticeAreas.find(x => x.theme_id === themeId);

        console.log('New PUppy GET ITTTT??', myNEWPuppy);

        urlObj = {
            url: 'assessments-theme-single',
            nav: 'assess',
            subNav: 'overview',
            title: 'Current Assessment - Manage Users',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Current assessment', href: "/v1/grants" },
                { text: 'Themes', href: "#" },
                { text: `Theme ${themeId}`, href: "" }
            ],
            backLink: {
                show: true,
                extraText: 'to Assessment',
                url: '/v2/assessments/themes?test=a'
            },
            themeData: importPracticeAreas,
            userData: item
        };

        return res.render('v2/data-base', { urlObj } );

    }

    // START:: #4 Assessments -> THEMES -> PRACTICE AREA PAGE
    else if (( baseUrl === `/v2/assessments/themes/${themeId}/practice-areas/${practiceAreaId}` )
        || ( baseUrl === `/v2/assessments/themes/${themeId}/practice-areas/${practiceAreaId}?test=${query.test}` )) {

        console.log('got the numberoooooo', practiceAreaId);

        urlObj = {
            url: `assessments-theme-pa-id-${practiceAreaId}`,
            nav: 'assess',
            subNav: 'overview',
            title: 'Current Assessment - Manage Users',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Current assessment', href: "/v1/grants" },
                { text: 'Themes', href: "#" },
                { text: `Theme ${themeId}`, href: "" }
            ],
            backLink: {
                show: true,
                extraText: 'to Assessment',
                url: '/v2/assessments/themes?test=a'
            },
            // themeData: importPracticeAreas,
            userData: item
        };

        console.log('got the OBJ', urlObj);

        return res.render('v2/data-base', { urlObj } );

    }

    // START:: Assessments -> THEMES SINGLE SUMMARY PAGE
    else if (( baseUrl === `/v2/assessments/themes/${themeId}/summary` )
        || ( baseUrl === `/v2/assessments/themes/${themeId}/summary?test=${query.test}` )) {

        console.log('got the numberoooooo', userId);

        /* this is where we gather the grants data */
        const importContent = excelToJson({
            sourceFile: './public/data/gov_comm_content_db_v2.xlsx',
            columnToKey: usersColumnKey,
            header: {
                rows: 1
            }
        });

        let importUsers = importContent.users;

        console.log('THE USER ARRAY', importUsers );

        //var item = importUsers.find(item => item.user_id === parseInt(userId) );

        console.log('THE ITEM', item);

        let singleUser = importUsers[userId];

        console.log('USR SING', importUsers[userId]);

        //let myNewID = importUsers.findIndex(x => x.user_id === userId );

        let myNEWPuppy = importUsers.find(x => x.user_id === userId);

        console.log('GET ITTTT??', myNEWPuppy);

        urlObj = {
            url: `assessments-theme-single-summary`,
            nav: 'assess',
            subNav: 'overview',
            title: `Current Assessment - Theme ${themeId} &raquo; Summary`,
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Current assessment', href: "/v1/grants" },
                { text: 'Manage users', href: "#" },
                { text: 'Manage user: UserName GoesHere', href: "" }
            ],
            backLink: {
                show: true,
                extraText: 'to Manage Users',
                url: '/v2/assessments/manage-users'
            },
            themeData: importUsers,
            userData: item
        };

        return res.render('v2/data-base', { urlObj } );

    }

    // START:: Assessments -> THEMES SINGLE PRACTICE AREAS
    // -----------------------------------------------------------------------
    else if (( baseUrl === `/v2/assessments/themes/${themeId}/practice-areas` )
        || ( baseUrl === `/v2/assessments/themes/${themeId}/practice-areas?test=${query.test}` )) {

        /* this is where we gather the grants data */
        const importContent = excelToJson({
            sourceFile: './public/data/gov_comm_content_db_v2.xlsx',
            columnToKey: practiceAreasColumnKey,
            header: {
                rows: 1
            }
        });

        let importPracticeAreas = importContent.practice_areas;

        console.log('THE PA  ARRAY', importPracticeAreas );

        //var item = importUsers.find(item => item.user_id === parseInt(userId) );

        console.log('THE ITEM', item);

        //let myNewID = importUsers.findIndex(x => x.user_id === userId );

        let myNEWPuppy = importPracticeAreas.find(x => x.theme_id === themeId);

        console.log('New PUppy GET ITTTT??', myNEWPuppy);

        urlObj = {
            url: `assessments-theme-single-practice-areas`,
            nav: 'assess',
            subNav: 'overview',
            title: `Current Assessment - Theme ${themeId} &raquo; Summary`,
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Current assessment', href: "/v1/grants" },
                { text: `Theme ${themeId} `, href: "#" },
                { text: 'Manage user: UserName GoesHere', href: "" }
            ],
            backLink: {
                show: true,
                extraText: 'to Themes',
                url: '/v2/assessments/manage-users'
            },
            themeData: importPracticeAreas,
            userData: item
        };

        return res.render('v2/data-base', { urlObj } );

    }

    // START:: Assessments -> THEMES SINGLE SUMMARY PAGE
    // -----------------------------------------------------------------------
    else if (( baseUrl === `/v2/assessments/themes/${themeId}` )
        || ( baseUrl === `/v2/assessments/themes/${themeId}/reports?test=${query.test}` )) {

        console.log('got the numberoooooo', userId);

        /* this is where we gather the grants data */
        const importContent = excelToJson({
            sourceFile: './public/data/gov_comm_content_db_v2.xlsx',
            columnToKey: usersColumnKey,
            header: {
                rows: 1
            }
        });

        let importUsers = importContent.users;
        console.log('THE USER ARRAY', importUsers );
        //var item = importUsers.find(item => item.user_id === parseInt(userId) );
        console.log('THE ITEM', item);
        let singleUser = importUsers[userId];
        console.log('USR SING', importUsers[userId]);
        //let myNewID = importUsers.findIndex(x => x.user_id === userId );
        let myNEWPuppy = importUsers.find(x => x.user_id === userId);
        console.log('GET ITTTT??', myNEWPuppy);

        urlObj = {
            url: `assessments-theme-single-reports`,
            nav: 'assess',
            subNav: 'overview',
            title: `Current Assessment - Theme ${themeId} &raquo; Summary`,
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Current assessment', href: "/v1/grants" },
                { text: 'Themes', href: "#" },
                { text: `These ${themeId}`, href: "" }
            ],
            backLink: {
                show: true,
                extraText: 'to Manage Users',
                url: '/v2/assessments/manage-users'
            },
            themeData: importUsers,
            userData: item
        };

        return res.render('v2/data-base', { urlObj } );

    }

    // START:: #3 Assessments SUMMARY SCORES Page
    // -----------------------------------------------------------------------
    else if (( baseUrl === '/v2/assessments/summary-scores' )
        || ( baseUrl === `/v2/assessments/summary-scores?test=${query.test}` )) {

        /* this is where we gather the grants data */
        const importContent = excelToJson({
            sourceFile: './public/data/gov_comm_content_db_v2.xlsx',
            columnToKey: overviewColumnKey,
            header: {
                rows: 1
            }
        });

        let importThemes = importContent.overview;
        // console.log("spok data", spok);
        // console.log("this is the trimmed ", spok2);

        urlObj = {
            url: 'assessments-summary-scores',
            nav: 'assess',
            subNav: 'overview',
            title: 'submitting assessment radios test',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Current Assessment', href: "/v1/grants" },
                { text: 'Themes 1 to 8', href: "" }
            ],
            themeData: importThemes,
            testVersion: query.test
        };

        return res.render('v2/data-base', { urlObj } );
    }

    // START:: Assessments -> Reports
    // -----------------------------------------------------------------------
    else if (( baseUrl === '/v2/assessments/reports' )
        || ( baseUrl === `/v2/assessments/reports?test=${query.test}` )) {

        /* this is where we gather the grants data */
        const importContent = excelToJson({
            sourceFile: './public/data/gov_comm_content_db_v2.xlsx',
            columnToKey: overviewColumnKey,
            header: {
                rows: 1
            }
        });

        //console.log('here is the list 2', importThemes);

        let importThemes = importContent.overview;

        urlObj = {
            url: 'assessments-reports',
            nav: 'assess',
            subNav: 'overview',
            title: 'Current Assessment - Reports',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Current assessment', href: "/v1/grants" },
                { text: 'Reports', href: "" }
            ],
            themeData: importThemes
        };

        return res.render('v2/data-base', { urlObj } );

    }

    // START:: Assessments -> Manage Users
    // -----------------------------------------------------------------------
    else if (( baseUrl === '/v2/assessments/manage-users' )
        || ( baseUrl === `/v2/assessments/manage-users?test=${query.test}` )) {

        /* this is where we gather the grants data */
        const importContent = excelToJson({
            sourceFile: './public/data/gov_comm_content_db_v2.xlsx',
            columnToKey: usersColumnKey,
            header: {
                rows: 1
            }
        });

        let importUsers = importContent.users;

        urlObj = {
            url: 'assessments-manage-users',
            nav: 'assess',
            subNav: 'overview',
            title: 'Current Assessment - Manage Users',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Current assessment', href: "/v1/grants" },
                { text: 'Manage users', href: "" }
            ],
            themeData: importUsers,
            testVersion: query.test
        };

        return res.render('v2/data-base', { urlObj } );

    }

    // START:: Assessments -> Manage Users SINGLE
    // -----------------------------------------------------------------------
    else if ( baseUrl === `/v2/assessments/manage-users/${userId}` ) {

        console.log('got the numberoooooo', userId);

        /*
        this is where we gather the grants data
         */
        const importContent = excelToJson({
            sourceFile: './public/data/gov_comm_content_db_v2.xlsx',
            columnToKey: usersColumnKey,
            header: {
                rows: 1
            }
        });

        let importUsers = importContent.users;

        console.log('THE USER ARRAY', importUsers );

        var item = importUsers.find(item => item.user_id === parseInt(userId) );

        console.log('THE ITEM', item);



        let singleUser = importUsers[userId];



        console.log('USR SING', importUsers[userId]);

        //let myNewID = importUsers.findIndex(x => x.user_id === userId );

        let myNEWPuppy = importUsers.find(x => x.user_id === userId);

        console.log('GET ITTTT??', myNEWPuppy);

        urlObj = {
            url: 'assessments-manage-user-single',
            nav: 'assess',
            subNav: 'overview',
            title: 'Current Assessment - Manage Users',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Current assessment', href: "/v1/grants" },
                { text: 'Manage users', href: "#" },
                { text: 'Manage user: UserName GoesHere', href: "" }
            ],
            backLink: {
                show: true,
                extraText: 'to Manage Users',
                url: '/v2/assessments/manage-users'
            },
            themeData: importUsers,
            userData: item
        };

        return res.render('v2/data-base', { urlObj } );

    }






    // START::
    else if ( baseUrl === '/v2/assessments/theme-5' ) {

        urlObj = {
            url: 'assessments-theme-5',
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

        return res.render('v2/data-base', { urlObj } );


    }

    // START::
    else if ( baseUrl === '/v2/assessments/theme-5/pa-5-1' ) {


        /*
        this is where we gather the grants data
         */
        const content = excelToJson({
            //sourceFile: './public/data/pa-5_test.xlsx',
            sourceFile: './public/data/gov_comm_content_db_v2.xlsx',
            columnToKey: columnKey,
            header: {
                rows: 1
            }
        });

        console.log('here is the list', content);

        //let spok = content.Sheet1;
        let spok = content.cr_5;
        // console.log("spok data", spok);
        console.log("this is the trimmed ", spok);

        urlObj = {
            url: 'assessments-pa-5-1',
            nav: 'assess',
            subNav: 'overview',
            title: 'submitting assessment radios test',
            breadCrumbs: [
                { text: 'Home', href: "/home3-descoped" },
                { text: 'Assessments', href: "/v1/grants" },
                { text: 'Overview', href: "" }
            ],
            data: spok
        };

        //console.log("here urlOby", urlObj);

        return res.render('v2/data-base', { urlObj } );


    }

    else if ( baseUrl === '/v1/my-assessments' ) {

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
                { text: 'Assessment ID: DFE-909787', href: "/v1/assessment-detail-linked-themes" },
                { text: 'Theme 5', href: "" }
            ],
            backLink: {
                show: true,
                extraText: 'to Assessment Detail',
                url: '/v1/assessment-detail-linked-info'
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
                { text: 'Assessment ID: DFE-909787', href: "/v1/assessment-detail-linked-themes" },
                { text: 'Theme 5', href: "" }
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
                { text: 'Assessment ID: DFE-909787', href: "/v1/assessment-detail-linked-themes" },
                { text: 'Theme 5', href: "" }
            ],
        };

        //console.log("here urlOby", urlObj);

        return res.render('v1/data-base', { urlObj } );

    }

    /*
    else if ( baseUrl === '/v1/chart-test' ) {

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


    }
     */


    return res.render('non-limited/homey');
};