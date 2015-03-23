$(function(){
    $(".calendar-wrapper ul li").on("click", function(){
        target = $(this).attr("data-target");
        
        $(".calendar-wrapper ul li").removeClass("active");
        $(this).addClass("active");
        
        $(".calendar-wrapper table").hide();
        $(".calendar-wrapper table#"+target).show();
    });
    
    //Classes modal
    var classes = null;
    $('#class-modal').on('show.bs.modal', function (event) {
        var elm = $(event.relatedTarget); // Button that triggered the modal
        var className = elm.data('class'); // Extract info from data-* attributes
        var classObj = null;
        var modal = $(this);
        
        if (classes === null) {
            $.getJSON( "js/classes.json", function( data ) {
                classes = data.classes;
                
                populateModal(modal, className, classes);
            });
        } else {
            populateModal(modal, className, classes);
        }
        
    });
});

var populateModal = function(modal, className, classes) {
    var classObj = null;
    var imageDir = "images/gallery/";
    
    for (var i=0; i<classes.length; i++) {
        if (classes[i].id == className) {
            classObj = classes[i];
            break;
        }
    }
    
    if (classObj !== null) {
        modal.find('.modal-title').text(classObj.title);
        modal.find('.modal-body .desc-wrapper').text(classObj.desc);
        if (classObj.image!==null && classObj.image!=="") {
            modal.find('.modal-body .image-wrapper').html('<img class="img-responsive" src="'+ imageDir + classObj.image +'" alt="'+ classObj.title +'" />');
    
        }
    }
}