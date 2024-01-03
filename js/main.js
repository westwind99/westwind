$(function(){

	//브라우져창 높이 가져오기
	let wh = $(window).height();

	$(window).resize(function(){
		wh = $(window).height();
		$('html,body').stop().animate({ scrollTop:wh*a},700);
	});

	//gnb
	$("#gnb li:eq(0) a, h1 a").click(function(){
		$('html,body').animate({ scrollTop:wh*0},700); return false;	    
	})
	$("#gnb li:eq(1) a").click(function(){
		$('html,body').animate({ scrollTop:wh*1},700); return false;
	})
	$("#gnb li:eq(2) a").click(function(){
		$('html,body').animate({ scrollTop:wh*2},700); return false;
	})
	$("#gnb li:eq(3) a").click(function(){
		$('html,body').animate({ scrollTop:wh*3},700); return false;
	})


	//마우스휠 사용
	let a = 0;
	let area_n = $(".area").length;
	let wheel = true;


	$(".area").on("mousewheel",function(e,delta) {

		if ( wheel ) {
			let n = $(this).index();
			//alert(n)





				if ( n == 0 && delta<0){ 

					$("h1").css({bottom:100});

				}else if ( n==1  && delta>0) {

					$("h1").css({bottom:0});

				}




			if(delta < 0) { 
				a = n+1;
			} 
			else { 
				a = n-1;
			}

			if ( a <= 0 ) { a = 0; }
			if ( a >= area_n-1 ) { a = area_n-1; }

			$('html,body').stop().animate({ scrollTop:wh*a },700); 	
		}
		
	});


	//스크롤하기전 설정
    
	setTimeout(function(){
		$(".st0").css({strokeDashoffset:0});
	},1000);
	
    $(".bar").css({top:-6});

	$(".psp_gallery").css({ opacity:0 });



	//스크롤할때
	$(window).scroll(function(){ 
	  
		  let sc = $(document).scrollTop(); 		  
	  
		  if((sc >=0) && (sc < wh)) {	//home
			  a=0; $("#tt").text(a);
			  $(".st0").css({ transition:"3s", strokeDashoffset:0});
			  $(".bar").css({top:-6});
			  //$("h1").css({bottom:0});
		  }else{
		  	$(".st0").css({ transition:"0.1s",strokeDashoffset:1982});
		  }

		  if((sc >= wh) && (sc < wh*2)) {//works
			  a=1; $("#tt").text(a);
			  $(".st2").css({transition:"2s",strokeDashoffset:0});
			  $(".bar").css({top:160});
			  //$("h1").css({bottom:100});
			  $(".psp_gallery").css({transition:"0.5s 0.8s", opacity:1 });
              $(".ex1").css({transition:"0.5s 1.2s", opacity:1 });
              $(".more a").css({transition:"0.5s 1.2s", opacity:1 });
		  }else{
		  	$(".st2").css({transition:"0.1s",strokeDashoffset:2712});
			$(".psp_gallery").css({transition:"0.3s", opacity:0 });
			$(".ex1").css({transition:"0.3s", opacity:0 });
			$(".more a").css({transition:"0.3s", opacity:0 });
              
		  }
						  
		  if((sc >= wh*2) && (sc < wh*3)) {	//about
			  a=2; $("#tt").text(a);
			  $(".bar").css({top:160*2});
              
              //$(".profile").css({transition:"0.6s", left:"320px" })
              $(".skill_bg").css({width:"100%", transition: "0.5s"})
              
			  $(".f1").css({transition:"0.5s 0.5s ", width:"95%"})
			  $(".f2").css({transition:"0.3s 0.5s",width:"85%"})
			  $(".f3").css({transition:"0.4s 0.5s",width:"76%"})
			  $(".f4").css({transition:"0.7s 0.5s",width:"87%"})
			  $(".f5").css({transition:"0.8s 0.5s",width:"68%"})
			  $(".f6").css({transition:"1.0s 0.5s",width:"75%"})
		  } else {
		  		$(".fill").css({ transition:"0.3s 0s"})
		  		$(".fill").css({width:"0%"})
                $(".skill_bg").css({width:"0%"})
                //$(".profile").css({transition:"0.6s", left:"-1000px" })
		  }

		  
		  if(sc >= wh*3) {	//contact
			  a=3; $("#tt").text(a);
              $(".st1").css({transition:"3s",strokeDashoffset:0})
			  $(".bar").css({top:160*3 +4});
		  } else{
		  	$(".st1").css({transition:"0.1s",strokeDashoffset:2363});
		  }						  
						  
	});
  
	
//	//팝업
//	$(".menu").click(function(){
//		wheel = false;
//		$(this).next().show();
//		return false;
//	});
//
//	$(".close").click(function(){
//		wheel = true;
//		$(".pop").hide();
//		return false;
//	});

    
})





window.addEventListener("load",function(){

    const wrap = document.querySelector(".psp_gallery");
    const ball = document.querySelectorAll(".psp_gallery .ball");
	const next = document.querySelector(".psp_gallery .next");
	const prev = document.querySelector(".psp_gallery .prev");

    let d = 0; //초기 각도
	let targetD = 0;

	const wide = 200;//ball들 전체폭(값이 클수록 더 넓게 퍼짐)
	const ps = 10; //원근감(큰것과 작은것의 격차) : 낮을수록 원근감 강해짐

	const ball_top = wrap.offsetHeight/2 - ball[0].offsetHeight/2;
	const num = ball.length; //ball의 갯수
	const centerX = wrap.offsetWidth/2 - ball[0].offsetWidth/2;

	let x = [];
	let psp = [];

    function pspRolling() { 

		   d = d + 0.1*( targetD - d); //각도를 1씩 증가	   
			
			for (i=0; i<num; i++) {
				x[i] = Math.cos( Math.PI / 180 * (d+360/num*i) ) *wide + centerX;
				psp[i] = 1 - Math.sin( Math.PI / 180 * (d+360/num*i) )/ps;

				ball[i].style.left = x[i] + "px";
				ball[i].style.transform = "scale(" + psp[i] + ")";
				ball[i].style.opacity = psp[i];
				ball[i].style.zIndex = Math.floor(psp[i] * 100);
				ball[i].style.top = ball_top + "px";
			}
			
    }
    setInterval(pspRolling, 10);//pspRolling함수를 0.01초마다 실행


	let url = [
			"sub_inniweb.html",
			"sub_mrpizza.html",
			"sub_adidas.html",
			"sub_baskin.html",
			"sub_olive.html",
			"sub_innimobile.html",
            "sub_polo.html",
            "sub_byledo.html",
	]
    
    

	let kk = 0;

	const more = document.querySelector(".more a");
    
    const ex = document.querySelectorAll(".ex"); 
    
	next.addEventListener("click",function(e){
		e.preventDefault();
		targetD -= 360/num;	        

		kk++;
		if(kk>7){kk=0}
        
        ex.forEach(function(e){ e.style.display = "none"; }); //각각 다 안보이게 하고        
        ex[kk].style.display = "block"; //해당하는것만 보이게함
        
		more.href = url[kk];	

	});


	prev.addEventListener("click",function(e){
		e.preventDefault();
		targetD += 360/num;	

		kk--;
		if(kk<0){kk=7}
        
        ex.forEach(function(e){ e.style.display = "none"; }); //각각 다 안보이게 하고        
        ex[kk].style.display = "block"; //해당하는것만 보이게함    
        
		more.href = url[kk];	

	});



});

