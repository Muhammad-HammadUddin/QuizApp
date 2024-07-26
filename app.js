const next_btn = document.querySelector('#next_btn');
const options = document.querySelector('.options');
const quiz_top_container = document.querySelector('.quiz_top_container');
const timer = document.querySelector('.timer h1');
let qno = 0;
let score = 0;
let interval;

function showquestions(qno) {
    let seconds = 14; // Initialize the timer for each question
    quiz_top_container.innerHTML = '';
    options.innerHTML = '';
    next_btn.disabled = true;

    const p = document.createElement('p');
    p.innerHTML = `${qno + 1}. ${questions[qno].question}`;
    quiz_top_container.appendChild(p);
    for (let i = 0; i < questions[qno].options.length; i++) {
        const option = questions[qno].options[i];
        const createoption = document.createElement('button');
        createoption.innerHTML = option;
        options.appendChild(createoption);
    }

    if (interval) {
        clearInterval(interval); // Clear the previous interval if it exists
    }

    interval = setInterval(() => {
        
        timer.innerHTML = `Time left: ${seconds}s`;
        
        if (seconds <= 0) {
            clearInterval(interval); // Stop the timer
            disablebtn();
            if (qno < questions.length - 1) {
                qno++;
                
                showquestions(qno);
            }
            else {
                localStorage.setItem('score', score);
                localStorage.setItem('totalQuestions', questions.length);
                window.location.href = "/result/result.html";
                
            }// Disable the options and enable the next button
        }
        seconds--;
    }, 1000);

    checkanswer(qno);
}

function checkanswer(qno) {
    options.childNodes.forEach(index => {
        index.addEventListener('click', function (e) {
            if (index.innerHTML == questions[qno].correct) {
                index.style.backgroundColor = '#ACE1AF';
                score++;
            } else {
                index.style.backgroundColor = '#FF474D';
            }
            disablebtn();
            clearInterval(interval); // Stop the timer when an option is clicked
        });
    });
}

function disablebtn() {
    options.childNodes.forEach(index => {
        index.disabled = true;
    });
    next_btn.disabled = false;
}

next_btn.addEventListener('click', function (e) {
    if (qno < questions.length - 1) {
        qno++;
        showquestions(qno);
    } else {
        localStorage.setItem('score', score);
        localStorage.setItem('totalQuestions', questions.length);
        window.location.href = "/result/result.html";
    }
});

function startquiz() {
    qno = 0;
    score = 0; // Reset score
    showquestions(qno);
    enablebtn();
}

function enablebtn() {
    options.childNodes.forEach(index => {
        index.disabled = false;
    });
    next_btn.disabled = true;
}

startquiz();
