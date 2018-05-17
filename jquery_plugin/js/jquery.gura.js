(function($){

	$.fn.gura=function(options){
		//기본 설정값 정의
		var settings=$.extend({
			msg:"안녕! 나는 구라야~"
		}, options);
		// settings object 안에 있는 값을 이용해서 동작 
		this.text(settings.msg);

		//chain 형태로 동작 가능하도록
		return this;
	};

})(jQuery);