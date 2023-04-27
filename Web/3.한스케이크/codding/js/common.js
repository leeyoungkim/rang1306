Phone = {
    Load: function(target, type){
        try{
            $.ajax({
                type     : "GET",
                url      : "/manager/common/json/contact.json",
                dataType : "json",
                timeout  : 10000,
                success: function(Row){
                    Phone.List(Row, target, type);
                    $('.select1').selectOrDie();
                }
            });
        } catch(e){
            alert(e.description);
        }
    },
    List: function(Row, target, type){
        var target = $("#"+target);
            html = '<option value="">선택</option>\n';
            checked = '';

        for(var i=0; i<Row.Contact.phone.length; i++){
            if(target.attr("value")){
                checked = (target.attr("value").indexOf(Row.Contact.phone[i].number) > -1) ? "selected" : "";
            }
            if(Row.Contact.phone[i].type == type || type == 3){
                html +=  '<option value="'+Row.Contact.phone[i].number+'" '+checked+'>'+Row.Contact.phone[i].number+'</option>\n';
            }
        }
        target.html(html);
    }
}

Email = {
    Load: function(target, set){
        try{
            $.ajax({
                type     : "GET",
                url      : "/manager/common/json/contact.json",
                dataType : "json",
                timeout  : 10000,
                success: function(Row){
                    Email.List(Row, target);
                    Email.Bind(target, set);
                    $('.select2').selectOrDie();
                }
            });
        } catch(e){
            alert(e.description);
        }
    },
    List: function(Row, target){
        var target = $("#"+target);
            html = '<option value="">직접입력</option>\n';
            checked = '';

        for(var i=0; i<Row.Contact.email.length; i++){
            if(target.attr("value")){
                checked = (target.attr("value").indexOf(Row.Contact.email[i].value) > -1) ? "selected" : "";
            }
            html += '<option value="'+Row.Contact.email[i].value+'" '+checked+'>'+Row.Contact.email[i].value+'</option>\n';
        }
        target.append(html);
    },
    Bind: function(target, set){
        var trigger = $("#"+target);
            set = $("#"+set);

        trigger.bind({
            change: function(){
                if($(this).val()){
                    set.val($(this).val());
                } else {
                    set.val($(this).val()).focus();
                }
            }
        })
    }
}

AreaData = {
    Load: function(target1, target2, mode){
        try {
            $.ajax({
                type     : "GET",
                url      : "/front/common/json/area.json",
                dataType : "json",
                timeout  : 10000,
                success  : function(Row){
                    AreaData.Sido(Row, target1, target2, mode);
                    AreaData.Bind(Row, target1, target2, mode);
                }
            });
        } catch(e){
            alert(e.description);
        }
    },
    Sido: function(Row, target1, target2, mode){
		var id1 = target1;
        var target1 = $("#"+target1);
            target2 = $("#"+target2);
            html = '';
            select = '';
				
        html = '<option value="">광역시/도</option>\n';
		
        for(var i=0; i<Row.AreaData.length; i++){
            select = (target1.attr("value") == Row.AreaData[i].SiDo) ? "selected" : "";
            html += '<option value=\"'+Row.AreaData[i].SiDo+'\" '+select+'>'+Row.AreaData[i].SiDo+'</option>\n';
        }
		
		target1.empty().html(html);

        if(target2) AreaData.Gugun(Row, target1, target2, mode, target1.find("option").index(target1.find("option:selected")));
    },
    Gugun: function(Row, target1, target2, mode, idx){
        var html = '';

        html = '<option value="">군/구</option>\n';
        if(idx > 0){
            var num = idx - 1;
            for(var i=0; i<Row.AreaData[num].GuGun.length; i++){
                select = (target2.attr("value") == Row.AreaData[num].GuGun[i]) ? "selected" : "";
                html += '<option value=\"'+Row.AreaData[num].GuGun[i]+'\" '+select+'>'+Row.AreaData[num].GuGun[i]+'</option>';
            }
        }

        target2.empty().html(html);

        if(mode == "on"){
            target2.unbind("change").bind({
                change: function(){
                    var sno = '';
                    AreaData.Search(target1.val(), target2.val(), sno);
                }
            });
        }
    },
    Bind: function(Row, target1, target2, mode){
        var target1 = $("#"+target1);
            target2 = $("#"+target2);

        target1.bind({
            change: function(){
                target1.attr("value", '');
                target2.attr("value", '');

                AreaData.Gugun(Row, target1, target2, mode, $(this).find("option").index($(this).find("option:selected")));
            }
        });
    },
    Search: function(area1, area2, sno){
        try {
            $.ajax({
                type     : "GET",
                url      : "/front/ajax/shopSelectSearch.php",
                data     : { area1:area1, area2:area2, sno:sno },
                dataType : "html",
                timeout  : 10000,
                success  : function(result){
                    $("#sno").empty().html(result);
                }
            });
        } catch(e){
            alert(e.description);
        }
    }
}

Calendar = {
    Load: function(){
        $('#birthday').datetimepicker({
            lang:'kr',
            format:'Y-m-d',
            timepicker:false,
            closeOnDateSelect: true
        });

        $('#opendate').datetimepicker({
            lang:'kr',
            format:'Y-m-d',
            timepicker:false,
            closeOnDateSelect: true
        });

        $("#carl_birthday").click(function(){
            $('#birthday').datetimepicker('show');
        });

        $("#carl_opendate").click(function(){
            $('#opendate').datetimepicker('show');
        });
    }
}

DaumMap = {
    View: function(target, address, name){
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new daum.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addr2coord(address, function(status, result) {

            // 정상적으로 검색이 완료됐으면 
             if (status === daum.maps.services.Status.OK) {

                var coords = new daum.maps.LatLng(result.addr[0].lat, result.addr[0].lng);

                var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                    mapOption = {
                        center: coords, // 지도의 중심좌표
                        level: 4 // 지도의 확대 레벨
                    };  

                // 지도를 생성합니다    
                var map = new daum.maps.Map(mapContainer, mapOption); 

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new daum.maps.Marker({
                    map: map,
                    position: coords
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new daum.maps.InfoWindow({
                    content: '<p style="font:12px/1.5 sans-serif;width:152px;height:34px;display:block;text-align:center;line-height:34px;"><strong>'+name+'</strong></p>'
                });
                infowindow.open(map, marker);

                map.panBy(1, 1);
            } 
        });   
    }
}

MainContent = {
    Load: function(code){
        try {
            $.ajax({
                type     : "POST",
                url      : "/front/ajax/mainContent_ajax.php",
                data     : { code:code },
                timeout  : 10000,
                success  : function(result){
                    switch(code){
                        case '1':
                            $("#main_banner").html(result);
                            UI.mainActive();
                            break;
                        case '2':
                            $("#sub_banner").html(result);
                            UI.subActive();
                            break;
                        default:
                            break;
                    }
                    
                }
            });
        } catch(e){
            alert(e.description);
        }
    }
}

Functions = {
    AllCheck: function(){
        $("#AllCheck").click(function(){
            if($(this).is(":checked")){
                $("input:checkbox").prop("checked", true);
            } else {
                $("input:checkbox").prop("checked", false);
            }
        });
    },
    UrlBack: function(){
        $("#cancelBtn").click(function(){
            history.back();
            return false;
        });
    },
    ClosePop: function(){
        $("#closeBtn").click(function(){
            window.close();
        });
    },
    NumberOnly: function(){
        $(".numberonly").on("keyup", function(){
            $(this).val($(this).val().replace(/[^0-9]/gi, ""));
        });
    },
    NumberHyphenOnly: function(){
        $(".numberhyphenonly").on("keyup", function(){
            $(this).val($(this).val().replace(/[^0-9:\-]/gi, ""));
        });
    },
    OneDayClose: function(target){
        $.cookie(target, 'Y', {path:'/', expires:1});
        $("#"+target).hide();
    },
    MoveLink: function(form, target, no, type){
        var form = $("#"+form);

        if(type == "designer_style"){
            form.find("input[name=no]").val(no);
        } else {
            $("#no").val(no);
        }
        
        form.attr("action", target+".php");
        form.submit();
    },
    MoveList: function(form, target){
        var form = $("#"+form);
        form.attr("action", target+".php");        
        form.submit();
    },
    MovePosition: function(type){
        var idName = (type == "designer_style") ? "sno" : "no";

        if($("#"+idName).val()){
            var no = $("#"+idName).val();
                noPos = $("#"+no).position().top;
            $(window).scrollTop(noPos);
        }
    }
}

$(document).ready(function(){
    Functions.AllCheck();
    Functions.UrlBack();
    Functions.ClosePop();
    Functions.NumberOnly();
    Functions.NumberHyphenOnly();
});