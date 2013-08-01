// ==UserScript==
// @name           Linked Iframe & Frameset Buster
// @namespace      http://code.chimericdream.com/
// @description    Detects whether you are in a linked iframe (such as a Digg bar or on Linkive), and breaks out of it.
// @updateURL      https://raw.github.com/chimericdream/greasemonkey-linkediframeandframesetbuster/master/greasemonkey-linked_iframe_frameset_buster.user.js
// @downloadURL    https://raw.github.com/chimericdream/greasemonkey-linkediframeandframesetbuster/master/greasemonkey-linked_iframe_frameset_buster.user.js
// @version        1.9
// @include        http://*.linkive.com/*
// @include        http://*.digg.com/*
// @include        http://digg.com/*
// @include        http://photoshoplady.com/*
// @include        http://*.photoshoplady.com/*
// @include        http://tutorialmagazine.com/*
// @include        http://*.tutorialmagazine.com/*
// @include        http://bigresource.com/*
// @include        http://*.bigresource.com/*
// @include        http://tutorialized.com/*
// @include        http://*.tutorialized.com/*
// @include        http://ht.ly/*
// @include        http://ow.ly/*
// ==/UserScript==

(function(d){
    var lire  = /linkive\.com/i          // Linkive
    var dgre  = /digg\.com/i             // Digg
    var plre  = /photoshoplady\.com/i    // PhotoshopLady
    var tmre  = /tutorialmagazine\.com/i // TutorialMagazine
    var brre  = /bigresource\.com/i      // BigResource
    var tutre = /tutorialized.com/i      // Tutorialized
    var owlre = /ow.ly/i                 // Ow.ly
    var htre  = /ht.ly/i                 // Ht.ly

    if (lire.exec(window.location) !== null) {
        var site = 'linkive';
    } else if (dgre.exec(window.location) !== null) {
        var site = 'digg';
    } else if (plre.exec(window.location) !== null) {
        var site = 'pslady';
    } else if (tmre.exec(window.location) !== null) {
        var site = 'tutmag';
    } else if (brre.exec(window.location) !== null) {
        var site = 'bigres';
    } else if (tutre.exec(window.location) !== null) {
        var site = 'tutorialized';
    } else if (owlre.exec(window.location) !== null) {
        var site = 'owly';
    } else if (htre.exec(window.location) !== null) {
        var site = 'hootly';
    }

    switch (site) {
        case 'linkive':
            // Old Linkive
            // Left in for backwards compatibility
            var iframe = document.getElementById('linkive-iframe');
            if (iframe !== null) {
                window.location = iframe.src;
            }

            // New Linkive
            var iframe = document.getElementById('browser-iframe');
            if (iframe !== null) {
                window.location = iframe.src;
            }
            break;

        case 'digg':
            // Digg
            var iframe = document.getElementById('diggiFrame');
            if (iframe !== null) {
                window.location = iframe.src;
            }
            break;

        case 'pslady':
        case 'tutmag':
            // PhotoshopLady.com, TutorialMagazine.com
            var iframe = document.getElementById('mainFrame');
            if (iframe !== null) {
                window.location = iframe.src;
                return;
            }
            // PhotoshopLady.com
            var pllink = document.getElementById('bigImage');
            if (pllink !== null) {
                if (pllink.href !== null) {
                    window.location = pllink.href;
                    return;
                }
            }
            // Added 3/24/10
            var h2els = document.getElementsByTagName('h2');
            for (var i in h2els) {
                var h2as = h2els[i].getElementsByTagName('a');
                for (var j in h2as) {
                    var atitle = h2as[j].getAttribute('title');
                    if (atitle.substr(0, 17) == 'Permanent Link to') {
                        window.location = h2as[j].href;
                        return;
                    }
                }
            }
            break;

        case 'bigres':
            // BigResource.com
            if (typeof document.getElementsByName('t')[0] !== 'undefined') {
                window.location = document.getElementsByName('t')[0].src;
            }
            break;

        case 'tutorialized':
            // Tutorialized.com
            if (typeof document.getElementsByName('tutorial')[0] !== 'undefined') {
                window.location = document.getElementsByName('tutorial')[0].src;
            }
            break;

        case 'owly':
        case 'hootly':
            // Ow.ly, Ht.ly (HootSuite's URL shorteners)
            var iframe = document.getElementById('hootFrame');
            if (iframe !== null) {
                window.location = iframe.src;
            }
            break;
    }
}(document));