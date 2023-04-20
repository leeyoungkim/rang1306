$(function(){
    $(".img>div:first").show();
    setInterval(function(){
        $(".img>div:first")
        /*3000이 3초*/
        .fadeOut(3000)
        .next("div")
        .fadeIn(3000)
        .end("div")
        .appendTo(".img")
    },3000);
});

