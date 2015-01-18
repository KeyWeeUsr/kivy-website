function updateBgMainSlide(carousel, currentIndex, targetIndex) {

    var slides = $('.main-slide');

    if (typeof currentIndex !== 'undefined') {
        var currentS = slides.get(currentIndex);
        if ($(currentS).data('bg-type') == 'video') {
            $(currentS).find('video').get(0).pause();
            $(currentS).find('.video-control').removeClass('fa-pause').addClass('fa-play');
        }
        var targetS = slides.get(targetIndex);
        if ($(targetS).data('bg-type') == 'video') {
            var controlBt = $(targetS).find('.video-control');
            if (!Modernizr.touch) {
                controlBt.removeClass('fa-play').addClass('fa-pause');
                $(targetS).find('video').get(0).play();
            }
            else {
                controlBt.removeClass('fa-pause').addClass('fa-play');
            }
        }
    }
    else {
        var firstS = slides.get(0);
        if ($(firstS).data('bg-type') == 'video') {
            var controlBt = $(firstS).find('.video-control');
            if (!Modernizr.touch) {
                controlBt.removeClass('fa-play').addClass('fa-pause');
                $(firstS).find('video').get(0).play();
            }
            else {
                controlBt.removeClass('fa-pause').addClass('fa-play');
            }
        }
    }
}


$(document).ready(function(){

    $('.main-carousel').slick({
        dots: true,
        arrows: false,
        pauseOnDotsHover: true,
        pauseOnHover: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 20000,
        infinite: true,
        waitForAnimate: false,
        //onInit: updateBgMainSlide,
        onBeforeChange: updateBgMainSlide,
    });

    $('.video-control').click(function() {
        var player = $(this).closest('.main-slide').find('video').get(0);
        if (player.paused) {
            $(this).removeClass('fa-play').addClass('fa-pause');
            player.play();
        }
        else {
            $(this).removeClass('fa-pause').addClass('fa-play');
            player.pause();
        }
    });
    
});


$(window).load(function() {

    var theWindow = $(window),
        $bg = $(".main-slide .vjs-tech, .main-slide .vjs-poster, .main-slide-bg"),
        aspectRatio = $bg.width() / $bg.height();

    function updateBg() {
        if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
            $bg.css({
                'height': theWindow.height(),
                'width': 'auto'
                });
        } else {
            $bg.css({
                'width': theWindow.width(),
                'height': 'auto'
                });
        }

        $bg.each(function() {
            $(this).position({
                my: 'center',
                at: 'center',
                of: $(this).closest('.main-slide')
            });
        });
    }

    updateBg();
    updateBgMainSlide();

    $(window).resize(function() {
        updateBg();
        setTimeout(updateBg, 500);
    });

    $('.js-fouc').animate({'opacity': 1}, 100);

});
