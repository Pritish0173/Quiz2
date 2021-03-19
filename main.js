function data(qno)
{
	var radios = document.getElementsByName(qno); // list of radio buttons
	// var val = localStorage.getItem('q1'); // local storage value

	for(var i=0;i<radios.length;i++){
		// var opt=radios[i].value;
		// console.log(opt)
		if(radios[i].checked){
			// console.log(radios[i].value)
			return radios[i].value
		}
	}
}

function check(){

	// var question1 = document.quiz.question1.value;
	// var question2 = document.quiz.question2.value;
	// var question3 = document.quiz.question3.value;
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

	// var givenans=data()
	// localStorage.setItem("givenans1",givenans)
	// if(ans==givenans){
	// 	correct++;
	// }
	


	// if (question1 == "Providence") {
	// 	correct++;
	// }
	// if (question2 == "Hartford") {
	// 	correct++;
	// }	
	// if (question3 == "Albany") {
	// 	correct++;
	// }
	
	// var pictures = ["img/win.gif", "img/meh.jpeg", "img/lose.gif"];
	// var messages = ["Great job!", "That's just okay", "You really need to do better"];
	// var score;

	// if (correct == 0) {
	// 	score = 2;
	// }

	// if (correct > 0 && correct < 3) {
	// 	score = 1;
	// }

	// if (correct == 3) {
	// 	score = 0;
	// }

	document.getElementById("after_submit").style.visibility = "visible";

	document.getElementById("message").innerHTML = "Roll No: " + localStorage.getItem("rollno");
	document.getElementById("number_correct").innerHTML = "You got " + correct + " correct.";
	// document.getElementById("picture").src = pictures[score];
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