var Dialog = function (options){
	
	options = options || {};
	
	var o = {
		"text": "this is my test window",
		"modal": true,
		"opacity": 25,
		"display": "center center",
		"prefix": "dl"
	};

	o.text = options.text || o.text;
	o.modal = options.modal || o.modal;
	o.opacity = options.opacity || o.opacity;
	o.display = options.display || o.display;
	o.prefix = options.prefix || o.prefix;

	this.open = function (){
		if(o.modal)
		{
			addModal(this.settings.contentWidth(), this.settings.contentHeight());
		}
		var boxObj = displayBox();
		var top = this.settings.topPosition(o.display, o.prefix);
		var left = this.settings.leftPosition(o.display, o.prefix);
		
		var style = "";
		style = "top:" + top + "px; left:" + left + "px;";
			
		boxObj.setAttribute("style", style);
	};
	
	this.destroy = function (){
		var content = document.getElementById(o.prefix + "Content");
		var modal = document.getElementById(o.prefix + "Modal");
		var iframe = document.getElementById(o.prefix + "Iframeoverlay");
		//get the parent node from the content div. the content div and modal div have both the same parent
		var parent = content.parentNode;
		parent.removeChild(content);
		parent.removeChild(modal);
		parent.removeChild(iframe);
	};

	var addModal = function (width, height){
		var style = "";
		style = "width:" + width + "px; height:" + height + "px;";
		style += "opacity:" + (o.opacity / 100) + ";filter: alpha(opacity=" + o.opacity + ")";
		var modalID = o.prefix + "Modal";
		
		var newDiv = document.createElement("div");
		newDiv.setAttribute("id", modalID);
		newDiv.setAttribute("style", style);
		document.body.appendChild(newDiv);
		
		//reset style to only have width and height
		style = "width:" + width + "px; height:" + height + "px;";
		
		var iframeShim = document.createElement("iframe");
		iframeShim.setAttribute("id", o.prefix + "Iframeoverlay");
		iframeShim.setAttribute("src", "javascript:void(0);");
		iframeShim.setAttribute("frameborder", "0");
		iframeShim.setAttribute("scrolling", "no");
		iframeShim.setAttribute("style", style);
		document.body.appendChild(iframeShim);		
	};
	
	var displayBox = function (){
		var newDiv = document.createElement("div");
		newDiv.setAttribute("id", o.prefix + "Content");
		//newDiv.setAttribute("style", style);
		document.body.appendChild(newDiv);
		
		document.getElementById(o.prefix + "Content").innerHTML = o.text;
		
		return document.getElementById(o.prefix + "Content");
	}
};

Dialog.prototype.settings = {
	viewPortWidth: function() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    },
    viewPortHeight: function() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    },
    contentWidth: function() {
		var bW = document.body.offsetWidth;
		var wW = this.viewPortWidth();
		if(bW < wW)
		{
			bW = wW;
		}
		
		return bW;
    },
    contentHeight: function() {
		var bH = document.body.offsetHeight;
		var wH = this.viewPortHeight();
		if(bH < wH)
		{
			bH = wH;
		}
		
		return bH;
    },
    topPosition: function(d, p) {
        var pos = d.split(" ");
        var cHeight = document.getElementById(p + "Content").offsetHeight;
        var cVP = this.viewPortHeight();
        var px = 0;
        
		switch(pos[0])
		{
			case "center":
				px = (cVP - cHeight) / 2;
				break;
			case "top":
				px = 0;
				break;
			case "bottom":
				px = cVP - cHeight;
				break;
			default:
				px = pos[0];
		}
		
		return px;
    },
    leftPosition: function(d, p) {
		var pos = d.split(" ");
        var cWidth = document.getElementById(p + "Content").offsetWidth;
        var cVP = this.viewPortWidth();
        var px = 0;

		switch(pos[1]){
			case "center":
				px = (cVP - cWidth) / 2;
				break;
			case "left":
				px = 0;
				break;
			case "right":
				px = cVP - cWidth;
				break;
			default:
				px = pos[1];
		}
		
		return px;
    }
};