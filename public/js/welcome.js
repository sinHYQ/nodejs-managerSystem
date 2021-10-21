
$(".panel-title a").click(function () {
  $(".breadcrumb li").eq(1).find("a").text($(this).text());
  $(".breadcrumb li").eq(2).find("a").text($(this).parents(".panel-heading").next().find("a").eq(0).text());
});
$(".panel-body a").click(function () {
  $(".breadcrumb li").eq(2).find("a").text($(this).text());
});



$(".delete").click(function () {
    var delName=$(this).parent().prev().prev().text();
    // location.href = "/api/welcome/delete/"
   /*  $.ajax({
      type: "GET",
      url: "http://localhost:3000/api/welcome/delete",
      data: {
        username: delName,
      },
      success:function(data){
        console.log(data);
      },
      error:function(message){
          console.log(message);
      },
      cache:false,
      dataType:'json'
    }); */

});
