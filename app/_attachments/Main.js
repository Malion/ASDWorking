var types = ['gamecategory', 'gameName', 'gamePublisher', 'gameRelease', 'gameRate', 'gameConsole', 'comments'];
var types2 = ["Game category: ", "Game Name: ", "Game Publisher: ", "Game Release: ", "Game Rate: ", "Game Console: ", "Comments: "];
var myForm = $('#gameReviewForm');
var errorLink = $('#addItemErrorsLink');
var displaySaves = function() {
	var html = '';
		$.ajax({
			"url": "_view/games",
			"dataType": "json",
			"success": function(data){
				$.each(data.rows, function(index, games){
					if (games.value.category[1] === "First-Person-Shooter"){
						html += '<div data-role="collapsible"><h3>' + games.value.name[1] + '</h3><img height="50" width="100" src="First-Person-Shooter.png" />';    
					} else {
						html += '<div data-role="collapsible"><h3>' + games.value.name[1] + '</h3><img height="50" width="100" src='+ games.value.category[1] + '.png />';    
					}
					for (var o in games.value) {
						if (o === name){
							html += games.value.name[1];
						}
						html += '<li>' + games.value[o][0] +''+ games.value[o][1] + '</li>';
					};
					html += '<div><input type="button" title="deleteEntry" class="deleteButton" name="deleteEntry" id="'+games.id+'" value="Delete" data-inline=true /><input type=button title=editEntry name=editEntry id='+games.id+' class="editButton" value=Edit data-inline=true /></div></div>';
				});
				$('#displayReviews div #dynamicReviews').html(html);
				$('#dynamicReviews').collapsibleset('refresh')
			}
	});
};
// Displays for different categorys
var displaycategory = function(cat) {
	var html = '';
	$.ajax({
		"url": "_view/games",
		"dataType": "json",
		"success": function(data){
			$.each(data.rows, function(index, games){
					if(games.value.category[1] === cat){
						if (games.value.category[1] === "First-Person-Shooter"){
							html += '<div data-role="collapsible"><h3>' + games.value.name[1] + '</h3><img height="50" width="100" src="First-Person-Shooter.png" />' + '<ul>';    
						} else {
							html += '<div data-role="collapsible"><h3>' + games.value.name[1] + '</h3><img height="50" width="100" src='+ games.value.category[1] + '.png />' + '<ul>';    
						}
						for (var o in games.value){
							if (o === name){
								html += games.value.name[1];
							};
						html += '<li>' + games.value[o][0] +''+ games.value[o][1] + '</li>';
						};
						html += '<div><input type="button" title="deleteEntry" class="deleteButton" name="deleteEntry" id="'+games.id+'" value="Delete" data-inline=true /><input type=button title=editEntry name=editEntry id='+games.id+' class="editButton" value=Edit data-inline=true /></div></ul></div>';
					};
				});
				$('#'+cat+' div #'+cat+'Reviews').html(html);
			}
	});
};
var editThis = function(key){
	
	$.ajax({
		"url": "/asd/"+key,
		"dataType": "json",
		"success": function(data){
			console.log($('select option[value='+data.category[1]+']'))
			console.log(data.category[1])
			$('select option[value='+data.category[1]+']').attr('selected', true);
			gameName.value = data.name[1];
			gamePublisher.value = data.publisher[1];
			gameRelease.value = data.release[1];
			gameRate.value = data.rate[1];
			for(var i=0; i<data.console[1].length; i++){
				$('input[value="'+data.console[1][i]+'"]').attr('checked', true);
			};
			comments.value = data.comments[1];
		}
	})
	window.location.assign('#addItem');
	$('#addItemForm').listview('refresh')
};
var thisDelete = function(key){
	var thisConfirm = confirm("Are you sure you want to delete this?");
	if(thisConfirm){
		$.ajax({
				headers:{
					'Accept':'application/json',
					'Content-Type':'application/json'
				},
				url: '/asd', 
				type:'DELETE', 
				dataType:'json',
				success:function(){
					alert(gameName.value + " was deleted!")
				} 
			});
		location.reload();
	} else {
		return;
	};
};
var getcategory = function () {
		var thisCategory = ["Action","Adventure","First Person Shooter","Racing","Role Playing"];
		var saveThis = ["Action","Adventure","First-Person-Shooter","Racing","Role-Playing"];
		for(var n in thisCategory){
			if($('span.required').html() === thisCategory[n]){
				localStorage.setItem("Game category: ", saveThis[n]);
			};
		};
};
var getName = function () {
	localStorage.setItem("Game Name: ", gameName.value);
};
var getPublisher = function () {
	localStorage.setItem("Game Publisher: ", gamePublisher.value);
};
var getRelease = function () {
	localStorage.setItem("Game Release: ", gameRelease.value);
};
var getRate = function () {
	var label = document.getElementById("ratingLabel");
	localStorage.setItem("Game Rate: ", gameRate.value);
};
var getConsole = function () {
	var con = [];
	$('input[type=checkbox]').each(function(){
		if(this.checked){
			con.push(this.value);
		}
	});
	localStorage.setItem("Game Console: ", con);
	return (con);
};
var getComments = function () {
	localStorage.setItem("Comments: ", comments.value);
};
var addImage = function(category, thisLi){
	var newLi = document.createElement("li");
	var image = document.createElement("img");
	var sorce = image.setAttribute("src", "img/"+ category + ".png");
	image.setAttribute("class","image");
	newLi.appendChild(image);
};
var autoFillData = function (){
	for (var i = 0; i<types2.length; i++) {
		var key = types2[i];
		var value = localStorage.getItem(key);
		if (value !== undefined && key !== "Game Console: " && key !== "Game category: ") {
			types[i].value = value;
		} else if (value !== undefined && key !== "Game Console: " && key === "Game category: "){
			$('select option[value='+value+']').attr('selected', true);
		} else if (value !== undefined && value !== null && key === "Game Console: "){
			if(value[0] === "X" && value[0] !== undefined){
				$('input[value="Xbox 360"]').attr('checked', true);
			}
			if(value[0] === "P" && value[0] !== undefined || value[9] === "P" && value[9] !== undefined){
				$('input[value="Playstation 3"]').attr('checked', true);
			}
			if(value[0] === "W" && value[0] !== undefined || value[9] === "W"  && value[9] !== undefined || value[23] === "W" && value[23] !== undefined){
				$('input[value="Wii"]').attr('checked', true);
			}
		};
	};
};
$('#home').on('pageinit', function(){
	//Home Page Functions
});
$('#Action').on('pageinit', function(){
	displaycategory("Action");
	$('.deleteButton').click(function(){thisDelete(this.id);});
	$('.editButton').click(function(){editThis(this.id);});
});
$('#Adventure').on('pageinit', function(){
	displaycategory("Adventure");
	$('.deleteButton').click(function(){thisDelete(this.id);});
	$('.editButton').click(function(){editThis(this.id);});
});
$('#First-Person-Shooter').on('pageinit', function(){
	displaycategory('First-Person-Shooter');
	$('.deleteButton').click(function(){thisDelete(this.id);});
	$('.editButton').click(function(){editThis(this.id);});
});

$('#Racing').on('pageinit', function(){
	displaycategory('Racing');
	$('.deleteButton').click(function(){thisDelete(this.id);});
	$('.editButton').click(function(){editThis(this.id);});
});
$('#Role-Playing').on('pageinit', function(){
	displaycategory('Role-Playing');
	$('.deleteButton').click(function(){thisDelete(this.id);});
	$('.editButton').click(function(){editThis(this.id);});
});
$('#addItem').on('pageinit', function(){
	autoFillData();
	$('#clearData').click(function(){
		var confirmThis = confirm("This will clear all saved data!");
		if(confirmThis){
			localStorage.clear();
			location.reload();
		} else {
			return;
		};
	});
	myForm.validate({
		ignore: '.ignore',
		invalidHandler: function(form, validator){
			errorLink.click();
			var html = '';
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]');
				var legend = $('#consoleList').children('legend');
				var fieldName = key=="xbox360" ? legend.text() : label.text();
				html += '<li>'+ fieldName +'</li>';
			};
			$('#addItemErrors ul').html(html);
		},
		submitHandler: function(){
			var lowerName = gameName.value.toLowerCase();
			$.ajax({
				headers:{
					'Accept':'application/json',
					'Content-Type':'application/json'
				},
				url: '/asd', 
				type:'POST', 
				data:JSON.stringify({
					'_id':'games:' + lowerName,
					'category':['Game Category: ', gamecategory.value],
					'name':['Game Name: ', gameName.value],
					'publisher':['Game Publisher: ', gamePublisher.value],
					'release':['Game Release: ', gameRelease.value],
					'rate':['Game Rating: ', gameRate.value],
					'console':['Game Console: ', getConsole()],
					'comments':['Comments: ', comments.value]}),
				dataType:'json',
				success:function(){
					alert(gameName.value + " was saved!")
				} 
			});
			localStorage.removeItem("Game category: ");
			localStorage.removeItem("Game Name: ");
			localStorage.removeItem("Game Publisher: ");
			localStorage.removeItem("Game Release: ");
			localStorage.removeItem("Game Rate: ");
			localStorage.removeItem("Game Console: ");
			localStorage.removeItem("Comments: ");
			return;
		}
	});
	function addImage(category, thisLi){
		var newLi = document.createElement("li");
		var image = document.createElement("img");
		var sorce = image.setAttribute("src", category + ".png");
		image.setAttribute("class","image");
		newLi.appendChild(image);
	};
	$('#gamecategory-button').bind("mouseleave", getcategory);
	$('#gameName').bind("blur", getName);
	$('#gamePublisher').bind("blur", getPublisher);
	$('#gameRelease').bind("blur", getRelease);
	$('#gameRate').bind("change", getRate);
	$('#gameConsole').bind("change", getConsole);
	$('#comments').bind("blur", getComments);
});
$('#displayReviews').on('pagebeforecreate', function(){
displaySaves();
})
$('#displayReviews').on('pageshow', function(){
	$('.deleteButton').click(function(){thisDelete(this.id);});
    $('.editButton').click(function(){editThis(this.id);});
});