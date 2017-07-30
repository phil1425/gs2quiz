var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var numberContainer = document.getElementById('number');
var submitButton = document.getElementById('submit');
var rerunButton = document.getElementById('rerun');
var randomButton = document.getElementById('random');
var gotoButton = document.getElementById('goto')
var numQuestion = document.getElementById('numQuestion')
var i = 0;
var trueAnswers = 0;
var mistake = false;
var wrongAnswers = 0;
var totalQuestions = 0;
resultShown = 0;

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers = [];
        mistake = false;

        // first reset the list of answers
        answers = [];

        // for each available answer...
        for(letter in questions[i].answers){

            // ...add an html radio button
            answers.push(
                '<p>'
                    + '<input type="checkbox" name="question'+i+'" value="'+letter+'">'
                    + letter + ': '
                    + questions[i].answers[letter]
                + '</p>'
            );
        }

        // add this question and its answers to the output
        output.push(
            '<div class="question">'+'<font color="gray">' +questions[i].number +': '+'</font>'
            + questions[i].question +'</div>'
            + '<div class="answers">' + answers.join('') + '</div>'
        );

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
        z = i+1;
        resultsContainer.innerHTML = trueAnswers+' Richtige bei '+totalQuestions+' Fragen';
        numberContainer.innerHTML = 'Frage ' +z+ ' von ' + questions.length;
    }


    function showResults(questions, quizContainer, resultsContainer){

        // gather answer containers from our quiz
        var answerContainer = quizContainer.querySelector('.answers');

        // keep track of user's answers
        var userAnswers = [];
        var numCorrect = 0;

        // find selected answer
        tickedAnswers = answerContainer.querySelectorAll('input:checked');
        untickedAnswers = answerContainer.querySelectorAll('input:not(:checked)');
        console.log(tickedAnswers);
        console.log(untickedAnswers);
        for(var j=0; j<tickedAnswers.length; j++){
          if(tickedAnswers[j].value in questions[i].correctAnswers){
            console.log(tickedAnswers[j].value + 'r');
            tickedAnswers[j].parentElement.style.backgroundColor = 'lightgreen';
            if(resultShown<4){
              tickedAnswers[j].parentElement.append('\u2713');
            }
            resultShown++;
          }else{
            console.log(tickedAnswers[j].value + 'f');
            mistake = true;
            tickedAnswers[j].parentElement.style.backgroundColor = 'red';
            if(resultShown<4){
              tickedAnswers[j].parentElement.append('\u00D7');
            }
            resultShown++;
          }
        }
        for(var j=0; j<untickedAnswers.length; j++){
          if(untickedAnswers[j].value in questions[i].correctAnswers){
            console.log(untickedAnswers[j].value + 'f');
            mistake = true;
            untickedAnswers[j].parentElement.style.backgroundColor = 'red';
            if(resultShown<4){
              untickedAnswers[j].parentElement.append('\u2713');
            }
            resultShown++;
          }else{
            console.log(untickedAnswers[j].value + 'r');
            untickedAnswers[j].parentElement.style.backgroundColor = 'lightgreen';
            if(resultShown<4){
              untickedAnswers[j].parentElement.append('\u00D7');
            }
            resultShown++;

          }
        }
        if(mistake == false && resultShown<5){
          trueAnswers++;
        }

        // show number of correct answers out of total
    }

    // show questions right away
    showQuestions(questions, quizContainer);

    // on submit, show results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }
    rerunButton.onclick = function(){
      totalQuestions++;
      resultShown = 0;
        if(i>= (questions.length-1)){
          i = 0;
        }else{
          i++;
        }
      generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
    }

    randomButton.onclick = function(){
      totalQuestions++;
      resultShown = 0;
      i = Math.floor((Math.random() * questions.length));
      generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
    }

    gotoButton.onclick = function(){
      console.log(numQuestion.value);
      totalQuestions++;
      resultShown = 0;
      if (numQuestion.value <= questions.length && numQuestion.value >0){
        i = parseInt(numQuestion.value)-1;
        generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
      }
    }
}
