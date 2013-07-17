(function ($) {
    //cache native handler for click
    var nativeHandler;

    var self = $.event.special.leftClick = {
        //init event for the DOM element
        setup: function (r) {
            $(this).bind('click', eventHandler);
        },
        //destroy event for the DOM element
        teardown: function () {
            $(this).unbind('click', eventHandler);
        },
        //add some functionality to event's trigger
        add: function (handleObj) {
            //cache native handler for call it later
            nativeHandler = handleObj.handler;
        }
    };

    //event handler
    function eventHandler(e) {
        //cache "click" type
        var cachedType = e.type;

        //e.button = 0 for left button, so
        //we won't do anything if it's not left click
        //if e.offsetX < 0 it means that click was fired without mouse, from keyboard or smth else
        if (e.button || e.offsetX < 0) {
            return false;
        }

        //change event type
        //so we can define it in handlers
        e.type = "leftClick";
        //call native handler
        nativeHandler.apply(this, arguments);
        //return "click" type, for other click handlers
        e.type = cachedType;
    }
}(jQuery));
