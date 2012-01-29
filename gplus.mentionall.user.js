// ==UserScript==
// @name           gplus.mentionall
// @namespace      korepwx
// @description    Google+ Mention All
// @include        https://plus.google.com/*

(function() {
	var doc = unsafeWindow.document;
	
	function is_button_added(self) {
		
		return (self.lastElementChild.className == "sp_mention_all");
		
	};

	function add_button() {
		vos = doc.getElementsByClassName("vo");
		for (var i=0; i<vos.length; i++) {
			var vo = vos[i];
			if (!is_button_added(vo)) {
				vo.innerHTML += " &nbsp; &nbsp;<span class='sp_mention_all'><a href='javascript:void(0);' " + 
					"onclick='window.mention_all(this, event);'>Mention All</a></span>";
			}
		}
	};
	
	function select_child(self, className) {
		if (!self) return null;
		e = self.firstElementChild;
		while (e) {
			if (e.className == className) return e;
			e = e.nextElementSibling;
		}
		return null;
	};
	
	unsafeWindow.mention_all = function(self, ev) {
		// select reply list
		reply_list = self;
		for (var i=0; i<3; i++) reply_list = reply_list.parentElement;
		reply_list = reply_list.nextElementSibling;
		editor = select_child(reply_list, "oYifjc hs");
		reply_list = select_child(reply_list, "epoPNd Js");
		if (!reply_list) {
			return;
		}
		reply_list = select_child(reply_list, "gemAid");
		// loop and compose
		mentions = '';
		reply = reply_list.firstElementChild;
		while (reply) {
			e = select_child(reply, "We");
			if (!e) continue;
			e = e.firstElementChild;
			oid = e.attributes["oid"].value;
			e = e.nextElementSibling.firstElementChild;
			name = e.text;
			mentions += ('<input class="e-QXyXGe" style="white-space: nowrap; background: none repeat scroll 0% 0% rgb(238, 238, 238); border: 1px solid rgb(221, 221, 221); border-radius: 2px 2px 2px 2px; display: inline-block; font: 13px/1.4 Arial,sans-serif; margin: 0pt 1px; padding: 0pt 1px; vertical-align: baseline; color: rgb(51, 102, 204);" type="button" '+
							'tabindex="-1" data-token-entity="@'+oid+'" oid="'+oid+'" value="+'+name+'"> ');
			
			reply = reply.nextElementSibling;
		}
		// add to html
		editor = select_child(editor, "wo");
		if (!editor) return;
		if (editor.childElementCount == 0) return;
		editor = editor.firstElementChild.firstElementChild.firstElementChild;
		editor = editor.contentDocument.body;
		editor.innerHTML = mentions + editor.innerHTML;
	};
	
	setInterval(add_button, 1000);
})();

// ==/UserScript==