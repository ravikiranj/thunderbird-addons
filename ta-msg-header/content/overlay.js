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

    debugTab: function(msg) {
       document.getElementById("tabmail").openTab("contentTab", {
          contentPage: "about:blank",
          onLoad: function (aEvent, aBrowser) {
            let doc = aBrowser.contentDocument;
            let pre = doc.createElement("pre");
            pre.textContent = msg;; 
            doc.body.appendChild(pre);
          },
        });
    },

    log: function(msg) {
        var aConsoleService = Components.classes["@mozilla.org/consoleservice;1"].
                              getService(Components.interfaces.nsIConsoleService);
        aConsoleService.logStringMessage(msg);
    },

    onPageLoad: function(aEvent) {
        var doc = aEvent.originalTarget;
        var html = doc.body.innerHTML;
        var msgHdr = gFolderDisplay.selectedMessage;
        var hdrs;
        MsgHdrToMimeMessage(msgHdr, null, function (aMsgHdr, aMimeMsg) {
            hdrs = aMimeMsg.headers;
            tamsgheader.log("Message Headers : \n" + aMimeMsg.headers.toSource());
            var img = '<img src="https://lh5.googleusercontent.com/-8P5ax9d0gVc/AAAAAAAAAAI/AAAAAAAAAAA/qpUtADXVyvI/s27-c/photo.jpg" />';
            img += '<p>From: ' + hdrs.from + ', User Status: unknown </p>';
            doc.body.innerHTML = img + html;

        });
        tamsgheader.log("HTML : \n" + html);
        var mPane = document.getElementById("messagepane");
        tamsgheader.log("MPANE : \n" + mPane.toSource());
//        var img = "<img src = 'https://lh5.googleusercontent.com/-8P5ax9d0gVc/AAAAAAAAAAI/AAAAAAAAAAA/qpUtADXVyvI/s27-c/photo.jpg' /> <p>From: " hdrs.from + " User Status: unknown</p>";

        //All
        /*
        var all = document.getElementsByTagName("*");
        int max = 10;
        tamsgheader.log("ALL IDS:\n");
        for(var i = 0; i < max && i < all.length; i++){
            tamsgheader.log(all.id);
        }
        */
        //Dont erase below
        aEvent.originalTarget.defaultView.addEventListener("unload", function(event){ tamsgheader.onPageUnload(event); }, true);
    },

    onPageUnload: function(aEvent) {
        // do something
    }
};
