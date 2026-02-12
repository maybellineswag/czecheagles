(function($) {
    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $banner = $('#banner');

    // Breakpoints.
    breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)'
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Header.
    if ($banner.length > 0 && $header.hasClass('alt')) {
        $window.on('resize', function() { $window.trigger('scroll'); });
        $banner.scrollex({
            bottom: $header.outerHeight(),
            terminate: function() { $header.removeClass('alt'); },
            enter: function() { $header.addClass('alt'); },
            leave: function() { $header.removeClass('alt'); }
        });
    }

    // Menu.
    var $menu = $('#menu');
    var $sites = $('#sites');

    // Menu functions
    function hideMenu() {
        $body.removeClass('is-menu-visible');
    }

    function hideSites() {
        $body.removeClass('is-sites-visible');
    }

    function toggleMenu() {
        $body.toggleClass('is-menu-visible');
    }

    function toggleSites() {
        $body.toggleClass('is-sites-visible');
    }

    // Menu event listeners
    $('a[href="#menu"]').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        toggleMenu();
    });

    $('a[href="#sites"]').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        toggleSites();
    });

    // Close button handlers
    $('#menu .close').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        hideMenu();
    });

    $('#sites .close').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        hideSites();
    });

    // Close on escape key
    $(document).on('keydown', function(event) {
        if (event.keyCode == 27) {
            hideMenu();
            hideSites();
        }
    });

    // Close on body click
    $body.on('click', function(event) {
        hideMenu();
        hideSites();
    });

    // Prevent clicks inside menu from bubbling
    $('#menu .inner, #sites .inner').on('click', function(event) {
        event.stopPropagation();
    });

    $(document).ready(function () {
        // Open the menu when clicking on "Menu" link
        $('a[href="#menu"]').on('click', function (event) {
            event.preventDefault();
            $('#menu').addClass('active'); // Add active class to display the menu
        });
    
        // Close the menu when clicking the "X" or outside the menu
        $('#menu .close').on('click', function () {
            $('#menu').removeClass('active'); // Remove active class to hide the menu
        });
    
        $(document).on('click', function (event) {
            const $target = $(event.target);
            if (!$target.closest('#menu').length && !$target.is('a[href="#menu"]')) {
                // If the click is outside the menu and not on the "Menu" link
                $('#menu').removeClass('active');
            }
        });
    });
    

})(jQuery);