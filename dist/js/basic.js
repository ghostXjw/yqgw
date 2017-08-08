'use strict';

$('.y-point a').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
});
$('.y-type-tab ul li a').on('click', function () {
    $('.y-type-tab ul li a').removeClass('active');
    $(this).addClass('active');
});