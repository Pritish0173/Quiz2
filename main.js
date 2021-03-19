function data(qno)
{
	var radios = document.getElementsByName(qno);

	for(var i=0;i<radios.length;i++){

		if(radios[i].checked){

			return radios[i].value
		}
	}
}

function check(){

	var correct = 0;

	var length = parseInt(localStorage.getItem("responselength"));

	for(var i = 0; i<length;i++){

		var answerno = "answer" + i;
		var questionno = "q" + i;
		
		var ans = localStorage.getItem(answerno);
				
		var givenans=data(questionno);
		localStorage.setItem("givenans1",givenans)
		if(ans==givenans){
			correct++;
		}
		
	}


	document.getElementById("after_submit").style.visibility = "visible";
	document.getElementById("button").style.visibility = "hidden";

	document.getElementById("message").innerHTML = "Roll No: " + localStorage.getItem("rollno");
	document.getElementById("number_correct").innerHTML = "You got " + correct + " correct.";

}


function loadDoc() {
	
	var str = "";
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "test.json", true);
	xhr.responseType = 'json';
	xhr.onload = function() {
		var status = xhr.status;
		if (status === 200) {

			var responselength = xhr.response.length;
			responselength = responselength + "";
			localStorage.setItem("responselength", responselength);
		
			for(var i=0;i<xhr.response.length;i++){

				var answer = xhr.response[i]["answer"];
				localStorage.setItem("answer"+i,answer)

				str += "<div id='question" + i + "'><p id='id" + i + "'>" + xhr.response[i][i+1] + "</p>" + 
					"<input type='radio' name='q" + i + "' id='q" + i + "' value='" + xhr.response[i]["a"] + "'>" +"<label>" + xhr.response[i]["a"] + "</label><br>" + 
					"<input type='radio' name='q" + i + "' id='q" + i + "' value='" + xhr.response[i]["b"] + "'>" +"<label>" + xhr.response[i]["b"] + "</label><br>" + 
					"<input type='radio' name='q" + i + "' id='q" + i + "' value='" + xhr.response[i]["c"] + "'>" +"<label>" + xhr.response[i]["c"] + "</label><br>" + 
					"<input type='radio' name='q" + i + "' id='q" + i + "' value='" + xhr.response[i]["d"] + "'>" +"<label>" + xhr.response[i]["d"] + "</label><br>" + 
					"</div><br><br>";

				
			}

			str +=  '<input id = "button" type = "button" value = "Finish" onclick = "check();">';

			document.getElementById("quiz").innerHTML = str;

			document.getElementById("question").style.visibility = "hidden";

			countdown()

		} 
		else {
			console.log("Error in response")
		}
	};
	xhr.send();

}

function store() {
	var givenrollno = document.getElementById("rollno").value;
	localStorage.setItem("rollno", givenrollno);

	var givencourse = document.getElementById("course").value;
	localStorage.setItem("course", givencourse);

	var form = document.getElementById('login');
	form.style.display = 'none';

	document.getElementById("question").style.visibility = "visible";
}

function countdown(){
	var count = 20;
	var interval = setInterval(function(){
		document.getElementById('count').innerHTML= "Time Left: " + count;
		count--;
		if (count === 0){
			check()
			clearInterval(interval);
			document.getElementById('count').innerHTML='Done';
			// or...
			alert("You're out of time!");
		}
	}, 1000);
}