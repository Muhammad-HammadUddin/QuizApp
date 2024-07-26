const result_header = document.querySelector('.result_header h1');
const result_show = document.querySelector('.result_show p');
const avator = document.querySelector('.avator');
const play_again_btn = document.querySelector('.play_again_btn');

const score = parseInt(localStorage.getItem('score'));
const totalQuestions = parseInt(localStorage.getItem('totalQuestions'));

avator.src = totalQuestions / 2 > score ? "../sad.png" : "../congrats.png";
result_header.innerHTML = totalQuestions / 2 > score ? "You Failed" : "Congrats";
result_show.innerHTML = `You scored ${score}/${totalQuestions} correct answers`;

play_again_btn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = "../index.html"; // Change to your quiz page
});

