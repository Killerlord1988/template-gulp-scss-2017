function initSlider(id) {
    $(id).slick({
        dots: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000
    });
}
$(window).load(function () {

    var isMobile = 767;
    var isTablet = 768;
    initSlider('.advantages__items');
    initSlider('.reviews__items');
    $('.reviews').find('.slick-dots').addClass('black-dots');
    $('.advantages').find('.slick-arrow').css('display', 'none');

    var windowWidth = window.innerWidth;
    if(windowWidth >= isTablet) {
        $('.advantages__items').slick('unslick');
    } else {
        initSlider('.advantages__items');
    }

    window.addEventListener('resize', function(){
        $('.advantages').find('.slick-arrow').css('display', 'none');
        var windowWidth = window.innerWidth;
        if(windowWidth >= isTablet) {
            $('.advantages__items').slick('unslick');
        } else {
            initSlider('.advantages__items');
         }
    });
});

