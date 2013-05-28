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
					if (games.value.category[1] === "First Person Shooter"){
						html += '<div data-role="collapsible"><h3>' + games.value.name[1] + '</h3><img height="50" width="100" alt="First Person Shooter" src="First-Person-Shooter.png" />';    
					} else {
						html += '<div data-role="collapsible"><h3>' + games.value.name[1] + '</h3><img height="50" width="100" alt="'+games.value.category[1]+'" src='+ games.value.category[1] + '.png />';    
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
				$('#dynamicReviews').collapsibleset('refresh');
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
						if (games.value.category[1] === "First Person Shooter"){
							html += '<div data-role="collapsible"><h3>' + games.value.name[1] + '</h3><img height="50" width="100" alt="First Person Shooter" src="First-Person-Shooter.png" />' + '<ul>';    
						} else {
							html += '<div data-role="collapsible"><h3>' + games.value.name[1] + '</h3><img height="50" width="100" alt="'+games.value.category[1]+'" src='+ games.value.category[1] + '.png />' + '<ul>';    
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
				$('#'+cat+'Reviews').collapsibleset('refresh');
			}
	});
};
var editThis = function(key){
	var categories = ["Action","Adventure","First-Person-Shooter","Racing","Role-Playing"];
	var editConsoleList = ["Xbox 360","Playstation 3","Wii"];
	var editConsoleListId = ["Xbox360","Ps3","Wii"];
	var html = '';
	localStorage.removeItem("editReview");
	$.ajax({
		"url": "/asd/"+key,
		"dataType": "json",
		"success": function(data){
			html += '<form Action="#" method="post" name="editGameForm" id="editForm"><fieldset id="editItemField"><div data-role="fieldcontain"><ul data-role="listview"  data-inset="true" id="editItemForm"><li data-role="list-divider">Game Category*</li><li id="gamecategoryList"><label for="gamecategory" style="display:none">Game category: </label><select id="editGameCategory" name="gamecategory" class="required" data-native-menu="false">';
			for(var i in categories){
				if(data.category[1] === categories[i]){
					html += '<option value="'+categories[i]+'" selected>'+categories[i]+'</option>';
				} else {
					html += '<option value="'+categories[i]+'">'+categories[i]+'</option>';
				};
			};
			html += '</select></li><li data-role="list-divider">Game Name*</li><li><input type="text" id="editGameName" value="'+data.name[1]+'" name="editGameName" class="required" /></li><li data-role="list-divider">Game Publisher*</li><li><input type="text" value="'+data.publisher[1]+'" name="editGamePublisher" id="editGamePublisher" class="required" /></li><li data-role="list-divider">Game Release Date*</li><li><input type="date" value="'+data.release[1]+'" id="editGameRelease" name="editGameRelease" class="required editGameRelease" /> </li><li data-role="list-divider">Game Rating(0-10)</li><li><input type="range" id="editGameRate" name="editGameRate" value="'+data.rate[1]+'" min="0" max="10" class="ignore"/></li><li data-role="list-divider">Game Console*: </li><li id="editConsoleList"><fieldset id="editGameConsole" name="editGameConsole" value="Game Console: " data-role="controlgroup">';
			for(var o in editConsoleList){
				if(editConsoleList[o] === data.console[1][0] || editConsoleList[o] === data.console[1][1] || editConsoleList[o] === data.console[1][2]){
					html += '<input type="checkbox" value="'+editConsoleList[o]+'" name="edit'+editConsoleList[o]+'" id="edit'+editConsoleListId[o]+'" checked /><label value="'+editConsoleList[o]+'" for="edit'+editConsoleListId[o]+'">'+editConsoleList[o]+'</label>';
				} else {
					html += '<input type="checkbox" value="'+editConsoleList[o]+'" name="edit'+editConsoleList[o]+'" id="edit'+editConsoleListId[o]+'" /><label value="'+editConsoleList[o]+'" for="edit'+editConsoleListId[o]+'">'+editConsoleList[o]+'</label>';
				};
			};
			html+= '</fieldset></li><li data-role="list-divider">Comments</li><li><textarea id="editComments" name="editComments">'+data.comments[1]+'</textarea></li></ul></form><div><input id="'+data._id+/*'?rev='+data._rev+*/'" type="submit" value="Edit Review" name="submit" class="editButton"/></div></div>';
			localStorage.setItem("editReview", html);
			window.location.assign('#editItem');
			window.location.reload(true);
		}
	});
};
var thisDelete = function(key){
	$.ajax({
			url: '/asd/'+key,
			type: 'GET',
			dataType:"json",
			success:function(data){
				var thisConfirm = confirm("Are you sure you want to delete " + data.name[1] + "?");
				if(thisConfirm){
					$.ajax({
						url: '/asd/'+key+'?rev='+data._rev, 
						type:'DELETE', 
						dataType:'json',
						success:function(){
							alert(data.name[1] + " was deleted!");
						}
					});
					location.reload(true);
				} else {
					return;
				};
			}
		});
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
	localStorage.setItem("Game Name: ", $('#gameName').value);
};
var getPublisher = function () {
	localStorage.setItem("Game Publisher: ", $('#gamePublisher').value);
};
var getRelease = function () {
	localStorage.setItem("Game Release: ", $('#gameRelease').value);
};
var getRate = function () {
	var label = document.getElementById("ratingLabel");
	localStorage.setItem("Game Rate: ", $('#gameRate').value);
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
var editConsole = function () {
	var con = [];
	$('#editItem div input[type=checkbox]').each(function(){
		if(this.checked){
			con.push(this.value);
		}
	});
	localStorage.setItem("Game Console: ", con);
	return (con);
};
var getComments = function () {
	localStorage.setItem("Comments: ", $('#comments').value);
};
var addImage = function(category, thisLi){
	var newLi = document.createElement("li");
	var image = document.createElement("img");
	var sorce = image.setAttribute("src", "img/"+ category + ".png");
	image.setAttribute("alt", category);
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
$('#Action').on('pagebeforecreate', function(){
	displaycategory("Action");
});
$('#Action').on('pageshow', function(){
	$('.deleteButton').click(function(){thisDelete(this.id);});
	$('.editButton').click(function(){editThis(this.id);});
});
$('#Adventure').on('pagebeforecreate', function(){
	displaycategory("Adventure");
});
$('#Adventure').on('pageshow', function(){
	$('.deleteButton').click(function(){thisDelete(this.id);});
	$('.editButton').click(function(){editThis(this.id);});
});
$('#First-Person-Shooter').on('pagebeforecreate', function(){
	displaycategory('First-Person-Shooter');
});
$('#First-Person-Shooter').on('pageshow', function(){
	$('.deleteButton').click(function(){thisDelete(this.id);});
	$('.editButton').click(function(){editThis(this.id);});
});
$('#Racing').on('pagebeforecreate', function(){
	displaycategory('Racing');
});
$('#Racng').on('pageshow', function(){
	$('.deleteButton').click(function(){thisDelete(this.id);});
	$('.editButton').click(function(){editThis(this.id);});
});
$('#Role-Playing').on('pagebeforecreate', function(){
	displaycategory('Role-Playing');
});
$('#Role-Playing').on('pageshow', function(){
	$('.deleteButton').click(function(){thisDelete(this.id);});
	$('.editButton').click(function(){editThis(this.id);});
});
$('#addItem').on('pageinit', function(){
	$('#clearData').click(function(){
		var confirmThis = confirm("This will clear all saved data!");
		if(confirmThis){
			localStorage.clear();
			location.reload();
		} else {
			return;
		};
	});
	$('#gameReviewForm').validate({
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
			var lowerName = $('#gameName').value.toLowerCase();
			var newName = lowerName.replace(/ /g,'');
			$.ajax({
				headers:{
					'Accept':'application/json',
					'Content-Type':'application/json'
				},
				url: '/asd', 
				type:'POST', 
				data:JSON.stringify({
					'_id':'games:' + newName,
					'category':['Game Category: ', $('#gamecategory').value],
					'name':['Game Name: ', $('#gameName').value],
					'publisher':['Game Publisher: ', $('#gamePublisher').value],
					'release':['Game Release: ', $('#gameRelease').value],
					'rate':['Game Rating: ', $('#gameRate').value],
					'console':['Game Console: ', getConsole()],
					'comments':['Comments: ', $('#comments').value]}),
				dataType:'json',
				success:function(){
					alert($('#gameName').value + " was saved!");
				} 
			});
			localStorage.removeItem("Game category: ");
			localStorage.removeItem("Game Name: ");
			localStorage.removeItem("Game Publisher: ");
			localStorage.removeItem("Game Release: ");
			localStorage.removeItem("Game Rate: ");
			localStorage.removeItem("Game Console: ");
			localStorage.removeItem("Comments: ");
			location.reload(true);
		}
	});
	function addImage(category, thisLi){
		var newLi = document.createElement("li");
		var image = document.createElement("img");
		var sorce = image.setAttribute("src", category + ".png");
		image.setAttribute("class","image");
		image.setAttribute("alt", category);
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
});
$('#displayReviews').on('pageshow', function(){
	$('#dynamicReviews').collapsibleset('refresh');
	$('.deleteButton').click(function(){thisDelete(this.id);});
    $('.editButton').click(function(){editThis(this.id);});
});
$('#editItem').on('pagebeforecreate',function(){
	$('#editFormDiv').html(localStorage.getItem('editReview'));
});
$('#editItem').on('pageinit', function(){
	$('#editForm').validate({
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
			var lowerName = $('#editGameName').value.toLowerCase();
			var newName = lowerName.replace(/ /g,'');
			$.ajax({
				url: '/asd/'+$('.editButton').attr('id'),
				type:'GET',
				dataType:'json',
				success:function(data){
					var revision = data._rev;
					$.ajax({
						url: '/asd/'+$('.editButton').attr('id'),
						type: 'PUT',
						contentType:"application/json",
						data:JSON.stringify({
							'_rev': revision,
							'category':['Game Category: ', $('#editGameCategory').value],
							'name':['Game Name: ', $('#editGameName').value],
							'publisher':['Game Publisher: ', $('#editGamePublisher').value],
							'release':['Game Release: ', $('#editGameRelease').value],
							'rate':['Game Rating: ', $('#editGameRate').value],
							'console':['Game Console: ', editConsole()],
							'comments':['Comments: ', $('#editComments').value]}),
						processData:false,
						success: function(){
							alert($('#editGameName').value + " has been edited!");
							parent.history.back();
						}
					});
				}
			});
		}
	});
});