/* CA3 Project Web Dev -JS - coffee-sinead-js.js

	@Sinead Bradley x20147511@student.ncirl.ie
	9 dec 2020
	
	https://sinead-dotcom.github.io/beanAndGoneCoffee/
	
	alpha V10.02
	Would like to load up the product images from a DataBase - since not done DBs yet,
	will use an array of image names instead.
	
*/

//load on .ready, DOM content has loaded; not wait for other assets to load; limit variable scope
$(function(){
		
	//constants
	const euro = "\u20ac"; /* euro sign */
	const totalNumProducts = 12; /*hard code it for now */
	//we haven't done JSON or Databases so using simple arrays to store relevant product information */
	const  merchandiseFileNames = ["images/merchandise/naf-drip-brewer.jpg",
									"images/merchandise/espresso-maker-on-white-stone-counter.jpg",
									"images/merchandise/JJ-silver-coffe-mug.jpg",
									"images/merchandise/coffee-stirrer.jpg",
									
									"images/merchandise/coffee-keep-cup.jpg",
									"images/merchandise/coffee-kettle.jpg",
									"images/merchandise/JJ-coffee-press.jpg",
									"images/merchandise/range-server-to-glass-coffee-mugs.jpg",
									"images/merchandise/recyclable-coffee-cup.jpg",
									"images/merchandise/syphon-cloths.jpg",
									"images/merchandise/coffee-grinder.jpg",
									"images/merchandise/coffee-guide.jpg"
									];
									
	const merchandiseUnitCost = [euro+"111",euro+"200",euro+"300",euro+"400",euro+"50",euro+"60",
								euro+"70",euro+"80",euro+"90",euro+"200",euro+"210",euro+"220"]

	const merchandiseAlt = ["NAF expresso maker", "JJ espresso maker","JJ silver coffe mug",
							"cofee-stirrer", "coffee-keep-cup", "coffee-dripper", "JJ-coffee-press",
							"range-server-to-glass-coffee-mugs", "recyclable-coffee-cup", "syphon-cloths",
							"coffee-grinder", "coffee-guide"];
	const merchandiseName = ["NAF expresso maker", "JJ espresso maker",
							"JJ silver coffe mug","cofee stirrer", "coffee keep cup", "coffee dripper", 
							"JJ coffee press", "range server to glass coffee mugs", "recyclable coffee cup", 
							"JJ cloths", "coffee grinder", "coffee guide"
							];
							//All the descriptions are adapted from Amazon products 
	const merchandiseDetailedDescr = ["The Premium NAF 2-Cup Aluminum Espresso Maker features a modern, \
									stylish design with a high-quality aluminum body. The handle is made \
									from a heat resistant plastic that not only provides you with a firm \
									and reliable grip, but also allows your hand to stay cool during use. \
									It's efficient layout forces pressurized water through coffee grounds, \
									and deposits a rich, full bodied espresso blend into the serving chamber.",
									
							"Experience professional-grade quality delivered straight to your cup for a difference you can taste.\
							For professional-quality results with stirring aroma and bold flavor, the JJ Espresso Machine \
							delivers authentic espresso and creamy cappuccino straight to your cup. The manual selection \
							feature helps you achieve perfect flavor and consistency, while the Italian pump with 10-bar \
							pressure produces improved flavor extraction with no bitterness. Advanced aluminum boiler \
							technology provides rapid pre-heating, while the steam nozzle ensures creamy cappuccinos. \
							Authentic flavor is matched by convenience, with two-cup or one-cup filters included and \
							integrated storage for measuring spoon and tamper. With enhanced features to round off the \
							package—including a removable 1.5 L water tank and a cup heater to add a professional \
							touch—JJ delivers an exceptional home espresso maker experience.", 
							
							"Make coffee any time a dazzling experience with this\
							double-walled Stainless Steel Mug by \
								JJ. Stunningly crafted of high quality 18/8 stainless steel with a brilliantly polished \
								mirror finish, this stylish cup has a double-walled design to keep drinks hot longer and \
								to prevent the temperature from affecting your hands when you hold it. Mug is also \
								generously sized. Dishwasher safe.",
								
								
								
							"Elegant high-end handles, Simple and elegant with mirror polish, more comfortable to use, \
								suitable for mixed drinks such as lemonade, tea, sugar, coffee, milkshake, root beer festoon,\
								jellies, coffee stirring, ice cream, small snacks.  This fashionable design is suitable for \
								home use, coffee shop use and tea shop use. \
								Stainless steel, easy to clean and dishwasher safe.", 
								
							
							"Stainless steel: includes a permanent, stainless steel mesh filter that helps extract your coffee's \
							aromatic oils and subtle flavors instead of being absorbed by a paper filter\
							This coffee dripper is made of durable, heat-resistant borosilicate glass with cork band detailing that is both functional and elegant",
							
									
							"This 2 Level Filtration System - Our french press have highly effective, \
									professional grade 2 level filtration technology will help minimize the \
									amount of residual grounds in your coffee and within just a few minutes you \
									can make the perfect cup of coffee for you.",
									
							"This range server is designed exclusively for the popular pour over brewing method. \
								The cone dripper's interior ridges aid in water movement, and its glass body prevents heat loss.\
								The rubber lid is also compatible to support the ceramic dripper. The dripper fits snugly atop \
								the heat-proof, microwave-safe range server.  It is easy to clean and dishwasher safe.", 
	
							"6 oz coffee paper cups.  50 decorated paper cups in a pack.  These are recyclable cups - disposable\
								paper cups which are convenient for party drinks, great for birthday party and other events.  The \
								cups hold single and double shots of Espresso nicely.  Make the eco friendly choice, these \
								paper cups that are 100% compostable, recyclable and safe for the environment.", 

							"The best cloth filter on the market, super quality, super durable. Cloth filters for Coffee \
							JJ flannel cloth.  It will replace your old cloth and give a clean coffee making cloth. \
							It's the indispensable cooperate of the JJ.", 

							"This is a fully functional traditional grinds coffee beans for fresh, home brewed espresso and java.", 

							"This is the ultimate guide to the history, science, and cultural influence of coffee according to \
							coffee aficionado and master storyteller JJ James. You’ll explore the origins of coffee before \
							discovering the varieties of coffee and the alchemy responsible for transforming a humble bean into \
							the world’s most popular drink"
						];
	let shippingMsg = "Please note that there are shipping delays due to Covid 19 restrictions";

	var errText = { error1: "This is error1",
					error2: "This is error2",
	}
	
	
	// listen for hamburger button click - when media mobile 
	$('#sidebarButton').on('click', function(){
		$("#sidebarNav").slideToggle("slow");
	});
	if (document.title === "Bean & Gone Coffee Merchandise Product") {
		//Does cookie tell us what product to load
		let thisProduct = getCookie("product");
		if (thisProduct !== ""){
			let xx=10;
			loadThisProduct(thisProduct);
		}
	} else if (document.title === "Shop Coffee Merchandise at Bean & Gone Coffee") {
		//load all the proudcts to display
		loadProducts();
		$('.acceptCookies').on('click', function(){
			setCookie("allowCookies",'yes',1);		
			$('#staticBackdrop').modal('hide');
			
		});
		
		//Does cookie tell us what product to load
		let cookiesAllowed = getCookie("allowCookies");
		if (!cookiesAllowed){//ask for consent
			$('#staticBackdrop').modal({
								backdrop: 'static'
							})
		}
	} else if (document.title === "Subscribe to Bean & Gone Coffee") {
		initSubscribeForm();
		// rest are function
	} else if (document.title === "FAQ Bean & Gone Coffee") {
		initFAQForm();
		var z=4;
	}	
		
	
	
	/* the supporting function */
	function initFAQForm(){
		$('.accordion-button').on('click', function(){
			var $theTarget = $(this).data();
			var $target = $theTarget.bsTarget;
			//prop('bsTarget');
			if ($(this).hasClass('collapsed')){
				$(this)[0].classList.remove('collapsed');
				var $toShow = $($target);
				$toShow[0].classList.add('show');
				$toShow.slideToggle('slow');
			} else {
				$(this)[0].classList.add('collapsed');
				var $toShow = $($target);
				$toShow[0].classList.remove('show');
				$toShow.slideToggle('slow');
			}
			var x=1;
		});
		
	}
	
	function initSubscribeForm() {
		  'use strict'
		  // Fetch all the forms we want to apply custom Bootstrap validation styles to
			var $form2 = $('.secondForm');

			/* This is what is called when the submit button is clicked
				Note, it validates.  If valid it calls the form action - which is sending an e-mail -
				this is to simulate a server side action....
				If have time - add cookie to store the purchase and show it in Nav */
				
			$('.secondForm').on('submit', function (event) {
					
					if ($('.secondForm')[0].checkValidity() === true ) {/* firstly, do browsers validity checks */
						if (validateForm2()){
							$form2.classList.add('was-validated');
							return 
						} else {
							event.preventDefault();
							event.stopPropagation();
						}
					};
			});
			return true;
	};
	
	//<!--<form id="orderForm" action="mailto:x20147511@student.ncirl.ie" method="post" enctype="text/plain" autocomplete="off">
	//					<form id="orderForm" action="order.php" method="post" onsubmit="return checkInfo();"/>-->
						
	function validateForm2(){
		
		//first-name validation
		//Note: for this field only we will have SEPARATE error messages to show that 
		//different errors can have their own error message...
		if (!validateAlphaNumeric('#given-name')){
			return false;
		};
		
		//family-name validation - Come back after inital testing - PUT IN ONE BIG IF statement 
		let regexCheckFamily =  /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/; //surname
		var $familyName = $('#family-name');
		//$familyName[0].setCustomValidity('Passwords must match');
		
		if ($familyName.val() === '') {
          $familyName.focus();
		  /* it's already set in .html $familyName[0].setCustomValidity('Please enter a valid first name');*/
		  //$('#given-name-Feedback').text('Valid first name is required.');
		  $familyName[0].classList.add('is-invalid');
		  $familyName[0].classList.remove('is-valid');
          return false;
        } 
		if ($familyName.val().length < 1) {
          $familyName.focus();
		  $familyName[0].classList.add('is-invalid');
		  $familyName[0].classList.remove('is-valid');
          return false;
		}
		if (!regexCheckFamily.test($familyName.val())){//make sure alphabetic
			$familyName.focus();
			$familyName[0].classList.add('is-invalid');
			$familyName[0].classList.remove('is-valid');
			return false;
		}
		else {//The surname name is valid
			$familyName[0].classList.add('is-valid');
			$familyName[0].classList.remove('is-invalid');
		}
		
		//Validate e-mail
		//email validation - Come back after inital testing - PUT IN ONE BIG IF statement 
		let regexCheckEmail = /[^@]+@[^@]+/; //email - simple validation
		//https://www.w3.org/TR/html52/sec-forms.html#form-submission-algorithm
		///^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
		
		var $email = $('#email');
		
		if ($email.val() === '') {
          $email.focus();
		  $email[0].classList.add('is-invalid');
		  $email[0].classList.remove('is-valid');
          return false;
        } 
		if ($email.val().length < 1) {
          $email.focus();
		  $email[0].classList.add('is-invalid');
		   $email[0].classList.remove('is-valid');
          return false;
		}
		if (!regexCheckEmail.test($email.val())){//make sure alphabetic, ampersand, dash
			$email.focus();
			$email[0].classList.add('is-invalid');
			 $email[0].classList.remove('is-valid');
			return false;
		}
		else {//The email is valid
			$email[0].classList.add('is-valid');
			 $email[0].classList.remove('is-invalid');
		}
		
		if (!validateAlphaNumeric('#address-line1')){
			return false;
		}
		if (!validateAlphaNumeric('#address-line2')){
			return false;
		}
		if (!validateAlphaNumeric('#postal-code')){
			return false;
		}
		
		//validate T&C checkbox
		// Get the value from a checked checkbox
		if ($('#terms-and-conditions').prop("checked") === false) {
			$('#terms-and-conditions').focus();
			return false;
		}

		//credit card name validation
		//Note: for this field only we will have SEPARATE error messages to show that 
		//different errors can have their own error message...
		if (!validateAlphaNumeric('#cc-name')){
			return false;
		}
		
		
		
		//Validate credit card number 
		//credit card number validation - Come back after inital testing - PUT IN ONE BIG IF statement 
		let regexCcNumber =   /^[0-9-\s]*$/; //cc-number
		var $ccNumber = $('#cc-number');
		
		if ($ccNumber.val() === '') {
          $ccNumber.focus();
		  /* it's already set in .html $ccNumber[0].setCustomValidity('Please enter a valid first name');*/
		  //$('#given-name-Feedback').text('Valid first name is required.');
		  $ccNumber[0].classList.add('is-invalid');
		   $ccNumber[0].classList.remove('is-valid');
          return false;
        } 
		if ($ccNumber.val().length < 1) {
          $ccNumber.focus();
		  $ccNumber[0].classList.add('is-invalid');
		   $ccNumber[0].classList.remove('is-valid');
          return false;
		}
		if (!regexCcNumber.test($ccNumber.val())){//make sure valid - research in more depth
			$ccNumber.focus();
			$ccNumber[0].classList.add('is-invalid');
			 $ccNumber[0].classList.remove('is-valid');
			return false;
		}
		else {//The cc-number is valid
			$ccNumber[0].classList.add('is-valid');
			 $ccNumber[0].classList.remove('is-invalid');
		}
		
		
		//Validate credit card expiration
		//credit card expiration validation - Come back after inital testing - PUT IN ONE BIG IF statement 
		let regexExpiration =     /^\d{2}\/\d{2}$/;
		/*/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;*/
								  /* /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/; */
		var $ccExpiration = $('#cc-expiration');
		
		if ($ccExpiration.val() === '') {
          $ccExpiration.focus();
		  $ccExpiration[0].classList.add('is-invalid');
		  $ccExpiration[0].classList.remove('is-valid');
          return false;
        } 
		if ($ccExpiration.val().length !== 5) {
          $ccExpiration.focus();
		  $ccExpiration[0].classList.add('is-invalid');
		    $ccExpiration[0].classList.remove('is-valid');
          return false;
		}
		if (!regexExpiration.test($ccExpiration.val())){//make sure valid - research in more depth
			$ccExpiration.focus();
			$ccExpiration[0].classList.add('is-invalid');
			  $ccExpiration[0].classList.remove('is-valid');
			return false;
		}
		else {//The cc-expiration is valid
			$ccExpiration[0].classList.add('is-valid');
			$ccExpiration[0].classList.remove('is-invalid');
		}
		
		//Validate credit card CVV
		//credit card CVV - Come back after inital testing - PUT IN ONE BIG IF statement 
		let regexCVV =   /^\d{3}$/; //cc-number
		var $ccCVV = $('#cc-cvv');
		
		if ($ccCVV.val() === '') {
          $ccCVV.focus();
		  $ccCVV[0].classList.add('is-invalid');
		  $ccCVV[0].classList.remove('is-valid');
          return false;
        } 
		if ($ccCVV.val().length < 1) {
          $ccCVV.focus();
		  $ccCVV[0].classList.add('is-invalid');
		    $ccCVV[0].classList.remove('is-valid');
          return false;
		}
		if (!regexCVV.test($ccCVV.val())){//make sure valid - research in more depth
			$ccCVV.focus();
			$ccCVV[0].classList.add('is-invalid');
			  $ccCVV[0].classList.remove('is-valid');
			return false;
		}
		else {//The cc-number is valid
			$ccCVV[0].classList.add('is-valid');
			  $ccCVV[0].classList.remove('is-invalid');
		}
		return true; //so that it can post the subscription!
	}

	//form.classList.add('was-validated')
			
	
	function loadThisProduct(i){
		
		$newProduct = $(".productOne")
			
		//set product name
		$newProduct.children().first().text(merchandiseName[i]);  //product name
		
		//set price 
		$newProduct.children().eq(1).text(merchandiseUnitCost[i]);//set product price
		//need an onclick funct which will call the prepareProductMerchandiseCall() - set up cookies first
		$theButton = $newProduct.children().eq(2);  //This is the button 
		$theButton.on("click", function(e){
										setCookie("order",i,1);		
										let jj = 15;
											}
		);

		//Set the Product Img
		$newProductPic = $(".productPic")
		$newProductPic.children().first().children().first().children().first().attr("src", merchandiseFileNames[i]);  //product img
		$newProductPic.children().first().children().first().children().first().attr("alt", merchandiseAlt[i]);
		
		$newProductDetails = $(".section2ProductDetails");
		$newProductDetails.children().first().text(merchandiseDetailedDescr[i]);//set detailed description
		$newProductMsg = $(".section2Msg");
		$newProductMsg.children().first().text(shippingMsg);
	}

	function addProductToOrder(i){
		let zz=10;
	}
	
	function loadProducts(){
		for (let i=0; i< totalNumProducts; i++){
			$newProduct = $(".cloneProduct").clone();
			
			//set product name
			$newProduct.children().first().children().first().children().eq(1).text(merchandiseName[i]);
			$newProduct.children().first().children().first().children().eq(0).attr("src", merchandiseFileNames[i]);
			$newProduct.children().first().children().first().children().eq(0).attr("alt", merchandiseAlt[i]);
			
			//set price 
			$newProduct.children().first().children().first().children().eq(2).text(merchandiseUnitCost[i]);
			//need an onclick funct which will call the prepareProductMerchandiseCall() - set up cookies first
			$theThumb = $newProduct.children().first().children().first()  //This is the cloneProduct img 
			
			//set index in invisible <p> - helps with id the event owner and indexes into arrays above
			$newProduct.children().first().children().first().children().eq(3).text(i);
			
			$theThumb.on("click", function(e){
											let dex = this.children[3].textContent; //from debugger 
											setCookie("product",dex,1);		
											//then go to the product page
											let uu = 15;
											window.location.href = "product-merchandise.html"											
											let jj = 15;
												}
			);
			//clean up the class (don't want cloneProduct in it 
			$newProduct.attr("class", "col-md-4 item1 espresso product");
			
			$newProduct.appendTo("#sectionOne");
		}
	
	let sum= 0;
		
	};
	
	//W3 Schools
	function setCookie(cname, cvalue, exdays) {
		  var d = new Date();
		  d.setTime(d.getTime() + (exdays*24*60*60*1000));
		  var expires = "expires="+ d.toUTCString();
		  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	//W3Schools
	function checkCookie() {
	  var product=getCookie("product");
	  if (product != "") {
		alert("Welcome to product: " + product);
	  } /*else {
		 user = prompt("Please enter your name:","");
		 if (user != "" && user != null) {
		   setCookie("username", user, 30);
		 }
	  }*/
	}
	//W3Schools
	function getCookie(cname) {
	  var name = cname + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
		  c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		  return c.substring(name.length, c.length);
		}
	  }
	  return "";
	}
	
	function validateUsername(){
	  let feedback;
	  let valid = false;
	  let regexCheck =  /^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$/; //first surname
	  /*let regexCheck = /^[a-zA-Z]+[\s]+[a-zA-Z]$/;  //allows alphabet lower,upper
	  /*let regexCheck = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/; */ /*firstname surname - and apostrophe */
	  let eUsernameMsg = document.getElementById('usernameErrorMsg'); //provides feedback on userName	
	  
	  //first clear the LoginErrorMsg at the top
	  let eLoginFeedback = document.getElementById('loginErrorMsg'); // feedback on login
	  clearErrorMsg(eLoginFeedback);
	  
	  //text box space is size===30
	  if (eUsername.value.length < 1) {// check username NOT EMPTY as per CA1 brief
		feedback = "Not long enough...";
		//event.preventDefault();//error on field
	  } else if (!regexCheck.test(eUsername.value)){//make sure alphabetic
		  feedback = "Firstname Surname";
		  //event.preventDefault();//error on field
	  } else { //userName field good to go
		  feedback = "";
		  valid = true;
	  }
	  eUsernameMsg.textContent = feedback;
	  return valid;
	}
	
	function validateAlphaNumeric(fieldString){
		//formInput validation Come back after inital testing - PUT IN ONE BIG IF statement 
		let regexCheckField =  /^[ A-Za-z0-9_@/./,/'/#&+-\s]*$/; //address1
		var $addressLine1 = $(fieldString);
		
		if ($addressLine1.val() === '') {
          alert("Please enter your address");
          $addressLine1.focus();
		  $addressLine1[0].classList.add('is-invalid');
		  $addressLine1[0].classList.remove('is-valid');
          return false;
        } 
		if ($addressLine1.val().length < 1) {
          $addressLine1.focus();
		  $addressLine1[0].classList.add('is-invalid');
		   $addressLine1[0].classList.remove('is-valid');
          return false;
		}
		if (!regexCheckField.test($addressLine1.val())){//make sure alphabetic
			$addressLine1.focus();
			$addressLine1[0].classList.add('is-invalid');
			 $addressLine1[0].classList.remove('is-valid');
			return false;
		}
		else {//The surname name is valid
			$addressLine1[0].classList.add('is-valid');
			 $addressLine1[0].classList.remove('is-invalid');
		}
		return true;
	}
	
}); // function, wait till dom loaded before js.  limit variable to local fnct. 