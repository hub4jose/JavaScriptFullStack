//list of students on the page
let $studentList = $('.student-item');

const inputbox = "<div class='student-search'><input placeholder='Search for students...'><button class='btn'>Search</button></div>"
const paginate = "<div class='pagination'><ul></ul></div>";
let pageno;

$(".page-header").append(inputbox);
// first page loads at first
showPage(1 , $studentList);
// show list of students per page number provided
function showPage(page , list){
    $('.student-item').hide();
// As index of the list start with 0
      const listStart = (page-1) * 10 ;
      const listEnd = listStart + 9;

       $.each(list, function(index, li){
         if(index >=listStart && index<=listEnd){
            $(this).show();
         }
       });

}

// function to add the pagination
function appendPageLinks(list){

$(".page").append(paginate);
  // total pages for the student lists
    const pages = Math.ceil(list.length/10);
    let i;
    for ( i=1; i<=pages; i++ ){
    $(".pagination ul").append("<li class='pageNo'><a href='#'>" + i +"</a></li>");
  }
$('.pagination ul li a').first().addClass('active');
  $(".pageNo a").click(function(e){
    pageno = $(this).text();
    showPage(pageno,list);
    $('.pagination ul li a').removeClass();
   $(this).addClass('active');
    e.preventDefault();
  });

}
//call function to add pagination
 appendPageLinks($studentList);

//Function to show the Studentlist for each page clicked


$(".btn").click(()=>{
let newList = [];
  //$('.student-item').hide();

  $(".pagination").remove();
  const inputValue = $("input").val().toLowerCase();

$studentList.each(function(){
 if(($(this).find("h3").text()).includes(inputValue)){

   newList.push($(this));

}


 });

 if(newList.length === 0){
$('.page-header h2').text("Search Students Not Found!!");
}
else {
  $('.page-header h2').text("Students");

}
showPage(1 , newList)
appendPageLinks(newList);


});
