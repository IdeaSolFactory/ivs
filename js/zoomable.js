/**
 * Zoomable.js
 * Version: 1.0 | 22/04/2020 
 * Author: ISF
 * Email:
 * 
 * =======================================================
 * Description: 
 * 
 * 
 * =======================================================
 * Usage:
 * 
 * 
 * =======================================================
 * Requisites:
 * 
 */ 

$(document).ready(function () {

    Zoomable();

    function Zoomable() {

        var Options = {
            galleryClass: "zoomable-gallery",
            containerClass: "has-zoomable",
            wrapperClass: "zoomable__wrapper",
            imageContainerClass: "zoomable__container",
            imageClass: "zoomable__image",
            class: "zoomable",
            dataReference: "image-path",
            pathToPicsRoot: "images/",
            picSizes: [480, 768, 1024, 1680, 1920],
            canSwipe: true,
            useBgFilter: true,
            imageDesc: true
        }

        // Associate every zoomable gallery/image with a number
        var zoomableGalleries = [];
        var zoomableImgs = [];

        $("." + Options.galleryClass).each(function( index ){
            $(this).data("galleryNum", index);
            $(this).find("." + Options.class).each(function(index){
                $(this).data("imageNum", index);
            });
        });
    
        var isZoomed = false;
    
        // Check if close btn was clicked
        $(document).on('click', ".zoomable__close-btn", function () {
            $(".zoomable__wrapper").remove();
            $("body").css("overflow", "auto");
            isZoomed = false;
        });
    
        // Check if zoomable-image-wrapper was clicked
        $(document).on( 'click', "." + Options.containerClass, function(){
            var finalWrapperClass;
            var selectedImage = $("." + Options.class, this); // Selected image
            var selectedImageAlt = selectedImage.attr("alt");

            // CanSwipe
            // Needs to be restructured!!!
            // if (Options.canSwipe){
            //     var numOfImages = $("." + Options.galleryClass).find("." + Options.class).length;
                
            //     var galleryItems = [];
            //         for(var i = 0; i < numOfImages; i++){
            //             galleryItems[i] = ($("." + Options.galleryClass).find("." + Options.class)[i]);
            //             console.log(galleryItems[i]);
            //         }
            // }
    
            if (Options.useBgFilter == false) {
                finalWrapperClass = Options.wrapperClass + " nofilter";
            } else {
                finalWrapperClass = Options.wrapperClass;
            }
    
            if ($(".has-zoomable img").hasClass(Options.class) && isZoomed == false) {
                var selectedImgPath = $(selectedImage).attr('src');
    
                // Get info from data attributes
                var imagePath = $("." + Options.class, this).data(Options.dataReference);
                var imageName = selectedImgPath.split('/').pop();
                var imageSize;
                var imageDescription = "";
    
                // Get relative image path if "Projects" project-path is given
                if (imagePath == "projects") {
                    imagePath = imagePath + "/" + selectedImgPath.split('/')[2];
                }

                if(imagePath == "references"){
                    imagePath = imagePath + "/" + selectedImgPath.split('/')[2];
                }
    
                // Get Alt text for image
                if ( Options.imageDesc == true && selectedImageAlt != null){
                    imageDescription = selectedImageAlt;
                }
    
                // Check screen width
                var screenSize = GetScreenSize();
                console.log(screenSize);
    
                switch (true) {
    
                    case (screenSize > 480 && screenSize <= 768):
                        imageSize = Options.picSizes[1];
                        break;
    
                    case (screenSize > 768 && screenSize <= 1024):
                        imageSize = Options.picSizes[2];
                        break;
    
                    case (screenSize > 1024 && screenSize <= 1680):
                        imageSize = Options.picSizes[3];
                        break;
    
                    case (screenSize > 1680):
                        imageSize = Options.picSizes[4];
                        break;
    
                    default:
                        imageSize = Options.picSizes[0];
                }
    
                // Get Path of pic
                var path = GetImgPath(
                    Options.pathToPicsRoot,
                    imagePath,
                    imageName,
                    imageSize)
                console.log("PATH: " + path);
    
                // Prepend body with class
                $("body").prepend(
                    '<div class="' + finalWrapperClass + '">\
                            <div class="'+ Options.imageContainerClass + '">\
                                <div class="zoomable__close-btn"></div>\
                                <div class="'+ Options.imageClass + '">\
                                    <img src="'+ path + '">\
                                </div>\
                                <span class="zoomable__descr">' + imageDescription +'</span>\
                            </div>\
                        </div>'
                );
                isZoomed = true;
                $("body").css('overflow', 'hidden');
            }
        });
    }
    
    function GetScreenSize() {
        var screenSize = $(window).width();
        return screenSize;
    }
    
    function GetImgPath(imageRoot, imagePath, imageName, imageSize) {
        var path = imageRoot + imagePath + "/" + imageSize + "/" + imageName;
        return path;
    }

    // function GetCurrentGalleryElements(obj, parentClass){   
    //     var gallery = ($(obj).closest("." + parentClass));
    // }
});

