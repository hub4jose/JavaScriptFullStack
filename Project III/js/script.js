 // focus on name input field when browser loads
  document.getElementById("name").focus();
  // regular Expression to test If user input is Email
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //-----------------------------------T-Shirt----------------------------------//
  let colorFlag = true ;
  let d = document.getElementById("design");
  let c = document.getElementById("color");

  const len = c.options.length;

  //Crate an option for Color as Please select a T-Shirt theme
  const noTheme = document.createElement('option');
  noTheme.textContent = "Please select a T-Shirt theme";
  c.appendChild(noTheme);
// function Hides all color options until Tshirt theme is selected
  selectTheme();
//function to hide Color label and input textbox
  hideColor(colorFlag);

  function selectTheme(){
    c.options.selectedIndex = len;
    for (let i =0 ; i< len ; i++)
    c.options[i].style.display = 'none';
  }


   function hideColor(colorFlag){
     if(!colorFlag){
       c.previousElementSibling.style.display = "block";
       c.style.display = "block";
     }
     else{
     c.previousElementSibling.style.display = "none";
     c.style.display = "none";
     }
   }

  //-----------------------------------T-Shirt Ends----------------------------------//

//-------------------------------------Job Role-----------------------------------//

     let e = document.getElementById("title");

//Other input textbox created if Other title is selected
    let inputOther =   document.createElement('input');
    inputOther.type = "text";
    inputOther.id = "other-title";
    inputOther.placeholder = "Your Job Role";
    inputOther.style.display = "none";

    e.parentNode.appendChild(inputOther);

//title dropbox event to show or hide Other textbox
    e.addEventListener('change',()=>{

      const choice = e.options[e.selectedIndex].value;

      if(choice === "other") {
        document.getElementById('other-title').style.display = "block";
      }
      else {
        document.getElementById('other-title').style.display = "none";
      }

    });

//Event to change Color option as per Theme is selected for T-shirt
    d.addEventListener('change',()=>{
      c.options.selectedIndex = "-1";
      const choice = d.options[d.selectedIndex].value;
      colorFlag = false;

        if (choice === "js puns") {

            for (let i =0 ; i<= len ; i++){
              if(c.options[i].value === "cornflowerblue" || c.options[i].value === "darkslategrey" || c.options[i].value === "gold"){
                c.options[i].style.display = 'block';
              }
              else {
                c.options[i].style.display = 'none';
              }
            }
        }

        else if (choice === "heart js") {
          for (let i =0 ; i<= len ; i++){
            if(c.options[i].value === "tomato" || c.options[i].value === "steelblue" || c.options[i].value === "dimgrey"){
              c.options[i].style.display = 'block';
            }
            else {
              c.options[i].style.display = 'none';
            }
          }
        }

        else {
          selectTheme();
        }

      hideColor(colorFlag);

    });

//-------------------------------------Job Role Ends-----------------------------------//

//-------------------------------------Activities-----------------------------------//


    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const labels = document.querySelectorAll(".activities label");
    const activities = document.querySelector(".activities");
    let sum = 0;
    //create Header Element to show the total cost for activities chosen
    const total = document.createElement("h3");
    total.className = "is-hidden";
    activities.appendChild(total);

  // Event to check Activities selected  and calculate total amount  to be paid
    activities.addEventListener('change',(e)=>{

  //function to check if activities overlap, if so activity cannot be selected
      disableList(e.target);

        if(e.target.checked) {
            if(e.target.name === "all"){
              sum = sum + 200;
            }
            else {
              sum = sum + 100;
            }
        }
        else {
            if(e.target.name === "all"){
              sum = sum - 200;
            }
            else {
              sum = sum - 100;
            }
        }

      total.textContent = "Total: $" + sum + ".00";

      // hide amount for no activity selection
        if (sum > 0) {
          total.className='';
        } else {
          total.className='is-hidden';
        }
    });

  //function to check if activities overlap, if so activity cannot be selected
function disableList(target){

      if (target.name === 'js-frameworks') {

        const overlap = document.querySelector('input[name="express"]');

          if (target.checked){
            overlap.disabled = true;
            overlap.parentNode.className = "disabled";
          } else {
            overlap.disabled = false;
            overlap.parentNode.className = "";
          }

      }

    if (target.name === 'express') {

        const overlap = document.querySelector('input[name="js-frameworks"]');

          if (target.checked){
            overlap.disabled = true;
            overlap.parentNode.className = "disabled";
          } else {
            overlap.disabled = false;
            overlap.parentNode.className = "";
          }

      }

      if (target.name === 'js-libs') {

        const overlap = document.querySelector('input[name="node"]');

          if (target.checked){
            overlap.disabled = true;
            overlap.parentNode.className = "disabled";
          } else {
            overlap.disabled = false;
            overlap.parentNode.className = "";
          }

      }

      if (target.name === 'node') {

        const overlap = document.querySelector('input[name="js-libs"]');

          if (target.checked){
            overlap.disabled = true;
            overlap.parentNode.className = "disabled";
          } else {
            overlap.disabled = false;
            overlap.parentNode.className = "";
          }

      }

    }


//-------------------------------------Activities Ends-----------------------------------//

//-------------------------------------Payments-----------------------------------//

const payments = document.getElementById('payment');
//Credit card payment option by default
  payments.options.selectedIndex = '1';
  payments.options[0].disabled = true;
  document.getElementById('pay-pal').className = "is-hidden";
  document.getElementById('bit-coin').className = "is-hidden";
//payment Events
payments.addEventListener('change',()=>{
  const selectedvalue =  payments.options[payments.selectedIndex].value ;

  if (selectedvalue === 'credit card'){
    document.getElementById('credit-card').className = "";
      document.getElementById('pay-pal').className = "is-hidden";
      document.getElementById('bit-coin').className = "is-hidden";
  }
  else if(selectedvalue === 'paypal'){
    document.getElementById('pay-pal').className = "";
    document.getElementById('credit-card').className = "is-hidden";
    document.getElementById('bit-coin').className = "is-hidden";

  }
  else if(selectedvalue === 'bitcoin'){
    document.getElementById('bit-coin').className = "";
    document.getElementById('pay-pal').className = "is-hidden";
    document.getElementById('credit-card').className = "is-hidden";
  }
});

//-------------------------------------Payments Ends -----------------------------------//


//-------------------------------------validation-----------------------------------//

      let form = document.querySelector('form');
      let name = document.getElementById("name");
      let email = document.getElementById("mail");

      // Create error label for Shirt not picked
      const errShirt = document.createElement('label');
      errShirt.textContent = "Dont Forget to pick a Tshirt";
      errShirt.Id = "selectShirt";
      const shirtInfo = document.querySelector('.shirt');
      const legend = document.querySelector('.shirt legend');
      shirtInfo.insertBefore(errShirt,legend);
      errShirt.style.display = "None";

      // Create error label for Activity not picked
      const errActivity = document.createElement('label');
      errActivity.textContent = "Please sellect an activity";
      errActivity.Id = "selectActivity";
      const activityInfo = document.querySelector('.activities');
      const legend2 = document.querySelector('.activities legend');
      activityInfo.insertBefore(errActivity,legend2);
      errActivity.style.display = "None";

      let ccn= document.getElementById('cc-num');
      const zp = document.querySelector('#zip');
      const cvv = document.querySelector('#cvv');

      const prevVal= ccn.previousElementSibling.textContent;

      // Create error label for Credit Card Entry
      let ccError = document.createElement('label');
      const payCC = document.querySelector('#credit-card');
      payCC.insertBefore(ccError,payCC.firstChild);
      ccError.style.display = "None";
      ccError.style.color = 'red';

      name_label = name.previousElementSibling;
      email_label = email.previousElementSibling;

//Real time Email Validation
email.addEventListener('input',()=>{
let eLen = email.value.length;

    if(eLen > 0  && !regex.test(email.value) ){
      email_label.textContent = "Email:(please provide valid Email Address.)";
      email_label.style.color = 'red';

    }

    else{
      email_label.textContent = "Email:";
      email_label.style.color = '';
    }
});

// Validate After Form Submit
form.addEventListener('submit',(e)=>{

  //flag to track if there is an error
        let validationTracker = true;

   //name validation
    if (name.value == "" || name.value == null) {
      name_label.textContent = "Name:(please provide name)";
      name_label.style.color = 'red';
        validationTracker = false;
    } else {
      name_label.textContent = "Name:";
      name_label.style.color = '';
    }
//validate email --  not needed after realtime validation
    if (email.value == "" || email.value == null || !regex.test(email.value)) {
      email_label.textContent = "Email:(please provide valid Email Address.)";
      email_label.style.color = 'red';
        validationTracker = false;
    } else {
      email_label.textContent = "Email:";
      email_label.style.color = '';
    }

  //validate  if shirt is selected

   if (d.selectedIndex == "0") {
     errShirt.style.display = "Block";
     errShirt.style.color = 'red';
       validationTracker = false;
   } else {
     errShirt.style.display = "None";
     errShirt.style.color = '';

   }


  // validate if atleast a checkbox is selected 'Please sellect an activity'
   if (sum == 0 ){
     errActivity.style.display = "Block";
     errActivity.style.color = 'red';
       validationTracker = false;
   } else {
     errActivity.style.display = "None";
     errActivity.style.color = '';

   }

// validation for Credit card selection

    if(document.querySelector('#payment').selectedIndex === 1 ) {
       ccError.style.display = "None";
      //Credit Card input length
       const ccnLength= ccn.value.length;

        if(ccnLength >= 13 && ccnLength <=16){

            ccn.previousElementSibling.style.color = '';

        } else {

            if(ccnLength === 0){
            ccError.textContent= 'Please enter a credit card number.';
            ccError.style.display = "Block";

            }else{
            ccError.textContent=' Please enter a number that is between 13 and 16 digits long.';
            ccError.style.display = "Block";
            }
            ccn.previousElementSibling.style.color = 'red';
              validationTracker = false;
        }

          //validate Zipcode
          if(zp.value.length === 5){
            zp.previousElementSibling.style.color = '';
          }else{
            zp.previousElementSibling.style.color = 'red';
              validationTracker = false;
          }

          //validate CVV
          if(cvv.value.length === 3){
            cvv.previousElementSibling.style.color = '';
          }else {
            cvv.previousElementSibling.style.color = 'red';
              validationTracker = false;
          }

    }

    if(!validationTracker){
       e.preventDefault();
     }

});

//-------------------------------------Validation Ends-----------------------------------//
