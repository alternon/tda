var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-96845322-1']);
_gaq.push(['_trackPageview']);

function getOutBoundLinkPush(type, category,ruta) {
	/*var pageTracker = _gat._getTracker("UA-35921441-1");
        pageTracker._trackEvent(type, category);*/
       ga('create', 'UA-96845322-1', 'auto');
       ga('send', 'event', {
	    eventCategory: type,
	    eventAction: category,
	    eventLabel: category
	  });
        // if(ruta!=''){
        // 	setTimeout(function(){
        // 		window.location.href = ruta;
        // 	},500);
        	
        // }
        
}

(function() {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	
	  ga('create', 'UA-96845322-1', 'auto');
	  ga('send', 'pageview');
})();