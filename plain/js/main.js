$(document).ready(function(){

    skmir.colorbox();
    skmir.ui();
    //skmir.rating();
    //skmir.readRating();
    skmir.popup();
    skmir.tabs();
    skmir.slider();

});
var skmir = new function() {

    this.tabs = function() {
        $('[data-tabs]').each(function(){
            var id = $(this).attr('data-tabs');

            $('[data-tab-type="'+id+'"]').find('[data-tab]').hide();
            $('[data-tab-type="'+id+'"]').find('[data-tab]').first().show();
            $(this).find('[data-tab-id]').first().addClass('active');
        });
        $('[data-tab-id]').on('click', function (){
            var id = $(this).attr('data-tab-id');
            var parent_id = $(this).parents('[data-tabs]').attr('data-tabs');

            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');

            $('[data-tab-type="'+parent_id+'"]').find('[data-tab]').hide();
            $('[data-tab-type="'+parent_id+'"]').find('[data-tab="'+id+'"]').show();

        });
    };

    this.popup = function () {
        $('[data-reserve-popup]').on('click', function(){
            popupInit($('.reservePopup[data-popup-id='+$(this).attr('data-reserve-popup')+']'));

            return false;
        });

        $('body').on('click','.closeBtn, .overlay, .closeButton', function(){
            popupClose();

            return false;
        });

        function popupInit(popup){
            var body = $('body');
            body.addClass('over');
            body.append('<div class="overlay"></div>');
            $('.overlay').fadeIn();
            popup.fadeIn();
        }

        function popupClose(){
            var body = $('body');
            $('.overlay').fadeOut(function(){$('.overlay').remove(); body.removeClass('over');});
            $('.popupWindow').fadeOut();
        }

    };

    this.readRating = function(){
        $('.rating').rating({
            fx: 'full',
            stars: 5,
            width: 200,
            readOnly: true,
            image: 'img/stars.png',
            loader: 'img/ajax-loader.gif'
        });
        $('.rating_or').rating({
            fx: 'full',
            stars: 5,
            width: 200,
            readOnly: true,
            image: 'img/stars_or.png',
            loader: 'img/ajax-loader.gif'
        });
    };

    this.rating = function(){
        $('.review_rating').rating({
            fx: 'full',
            stars: 5,
            width: 15,
            image: 'img/stars.png',
            loader: 'img/ajax-loader.gif',
            url: '/local/user/vote.php',
            callback: function(data){
                $('input#vote').val(data.votes);
                $('.review_rating .vote-result').empty();
            }
        });
    };

    this.slider = function() {
        $('.flatTableSlider .slider').slick({
            dots: false,
            infinite: true,
            speed: 600,
            slidesToShow: 1,
            slidesToScroll: 1
        });
        $('.mainSlider .slider').slick({
            dots: false,
            infinite: true,
            speed: 600,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            fade: true
        });
        $('.houseSlider .slider').slick({
            dots: false,
            infinite: true,
            speed: 600,
            slidesToShow: 3,
            slidesToScroll: 1
        });
        $('.photoSlider.small .slider').slick({
            dots: false,
            infinite: true,
            speed: 600,
            slidesToShow: 4,
            slidesToScroll: 1
        });
        $('.photoSlider .slider').slick({
            dots: false,
            infinite: true,
            speed: 600,
            slidesToShow: 3,
            slidesToScroll: 1
        });
        $('.newsSlider .slider').slick({
            dots: false,
            infinite: true,
            speed: 600,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 10000
        });
        $('.articleSlider .slider').slick({
            dots: false,
            infinite: true,
            speed: 600,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 10000
        });
    };

    this.colorbox = function() {
        $('.cboxElement').each(function(){
            if ($(this).attr('data-group')){
                var group = $(this).attr('data-group');
                $(this).colorbox({rel:''+group+''});
            } else {
                $(this).colorbox();
            }
        });
    };

    this.ui = function() {
            $('body').prepend('<div class="scrollTop"></div>');
            if ($('.scrollTop').length) {
                var footer_bottom = $('footer').outerHeight(true);
                var container_right = $('footer .container').outerWidth() + $('footer .container').offset().left;

                $('.scrollTop').css({left: container_right + 30, bottom: footer_bottom + 30 });

                $(window).scroll(function(){
                    if ($(this).scrollTop() > 120) {
                        $('.scrollTop').fadeIn();
                    } else {
                        $('.scrollTop').fadeOut();
                    }
                });

                $('.scrollTop').click(function(){
                    $('html, body').animate({scrollTop : 0},800);
                    return false;
                });
            }
        $('.spoiler').on('click', function(){
            $(this).toggleClass('open');
            $(this).parent().find('.spoilerContent').toggle();
        });
        $('.select .current').on('click', function(){
            $(this).parents('.select').find('ul').toggle();
        });
        $('.select ul li span').on('click', function(){
            var val = $(this).attr('data-val');

            $(this).parents('.select').find('.current').text(val);
            $(this).parents('.select').find('.val').val(val);
            $('.select').find('ul').hide();
        });
        $(document).click(function(event) {
            if ($(event.target).closest('.select').length) return;
            $('.select').find('ul').hide();
            event.stopPropagation();
        });

        $('.accordeon .head').on('click', function(){
            if ($(this).parent('.item').hasClass('open')){
                $(this).parent('.item').removeClass('open');
                $(this).next('.desc').slideUp();
            } else {
                $(this).parent('.item').addClass('open');
                $(this).next('.desc').slideDown();
            }
        });

        var albumListItem = $('.albumList .item');
        albumListItem.each(function(){
            var i_height = $(this).height();
           var h_heigh = $(this).find('h3').height();

            $(this).find('.info').css({top: i_height-h_heigh-55});
        });

        albumListItem.mouseenter(function() {
            var i_height = $(this).height();
            var d_height = $(this).find('.desc').height();

            $(this).find('.desc').css({top: i_height-d_height - 5});
        })
            .mouseleave(function() {

                $(this).find('.desc').css({top: 15});
            });

        $('.mainMenu > li').hover(function(){
            $('.mainMenu > li').removeClass('active');
            $(this).addClass('active');
        });
        $('.mainMenu ').mouseleave(function(){
            $('.mainMenu > li').removeClass('active');
        });

        $(document).click(function(event) {
            if ($(event.target).closest('.mainMenu > li.current').length) return;
            $('.mainMenu > li').removeClass('active');
            event.stopPropagation();
        });

        $('.mainMenu > li').each(function(){
            if ($(this).find('.subMenu').length > 0){
                $(this).addClass('hasChild');
            }
        });
        
        $('[data-img]').hide();
        $('.mainMenu li a').hover(function(){
            if ($(this).data('link')) {
                var li_id = $(this).data('link')
                $('[data-img]').hide();
                if(typeof($('[data-img="'+li_id+'"]').attr('data-img')) == 'string'){
                   $('[data-img="'+li_id+'"]').show(); 
                }
                else{console.log('2');
                    var parentLink = $(this).parents('.hasChild').children('a').attr('data-link');
                    $(this).parents('.subMenu').find('[data-img='+parentLink+']').show();
                }
            }
        });

    };

};
