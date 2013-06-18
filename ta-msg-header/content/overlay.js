Components.utils.import("resource:///modules/gloda/index_msg.js");
Components.utils.import("resource:///modules/gloda/mimemsg.js");
// This is Thunderbird 3.3 only!
Components.utils.import("resource://gre/modules/Services.jsm");
Components.utils.import("resource://gre/modules/NetUtil.jsm");


var tamsgheader = {
    init: function() {
        var messagepane = document.getElementById("messagepane"); // mail
        if(messagepane){
            messagepane.addEventListener("load", function(event) { tamsgheader.onPageLoad(event); }, true);
        }
    },

    showMessageDetails: function(msg){
        document.getElementById("tabmail").openTab("contentTab", {
            contentPage: "about:blank",
            onLoad: function (aEvent, aBrowser) {
                var doc = aBrowser.contentDocument;
                var pre = doc.createElement("pre");
                pre.textContent = msg;
                doc.body.appendChild(pre);
            },
        });
    },

    dumpObject: function(ob){
        var op = '';
        for(property in ob){
            op += property + ': ' + ob[property]+';';
        }
        dump(op);
    },

    onPageLoad: function(aEvent) {
        var doc = aEvent.originalTarget; // doc is document that triggered "onload" event
        dump(doc.body.innerHTML);
        dump("NEW");
        dump(doc.toSource());
        dump("END");
        
        // add event listener for page unload 
        aEvent.originalTarget.defaultView.addEventListener("unload", function(event){ tamsgheader.onPageUnload(event); }, true);
    },

    onPageUnload: function(aEvent) {
        // do something
    }
};
