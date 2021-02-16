const populate = () => {
    if(quiz.isEnded()) showScores();
    else {
        // show question
        const element = document.getElementById('quiz__question');
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        const choices = quiz.getQuestionIndex().choices;
        for(let i = 0; i < choices.length; i++) {
            let innerElement = document.getElementById('choice' + i);
            innerElement.innerHTML = choices[i];
            guess('btn' + i, choices[i]);
        }

        showProgress();
    }
};

const guess = (id, guess) => {
    const button = document.getElementById(id);
    button.onclick = () => {
        quiz.guess(guess);
        populate();
    }
};

const showProgress = () => {
    const currentQuestionNumber = quiz.questionIndex + 1;
    const element = document.getElementById('quiz__progress');
    element.innerHTML = 'Pregunta ' + currentQuestionNumber + ' de ' + quiz.questions.length;
};

const showScores = () => {
    const element = document.getElementById('quiz__container');
    let gameOverHTML = `
        <div class="quiz__top">
            <h1 class="quiz__title">Resultado</h1>
            <button class="quiz__closeButton" onclick="closeModal()"><i class="fas fa-times"></i></button>
        </div>
        <h2 id="quiz__score"> Tu Puntaje es: ${quiz.score}</h2>
    `;

    if(quiz.score !== 10) {
        gameOverHTML += '<br> Tienes ' + (10 - quiz.score) +' error(es)' + '<br>';  
        gameOverHTML +=  '<p>  1.- Los Olmecas<br> 2.-  68<br> 3.-  Colibrí<br> 4.-  10%<br> 5.- Alejandro Amenábar<br> 6.- 10<br> 7.- Francisco I. Madero<br> 8.- Octavio Paz<br> 9.- 32<br> 10.- Puebla</p>';
    }

    element.innerHTML = gameOverHTML;

    localStorage.setItem('discount', quiz.score);
    calculateTotal();
};

// create questions
let questions = [
    new Question('¿Cuál fue la primera civilización en México?', ['Los Olmecas', 'Los mayas','Los Toltecas', 'Los Zapotecas'], 'Los Olmecas'),
    new Question('¿Cuántas lenguas indígenas se hablan?', ['60', '69', '68', '70'], '68'),
    new Question('¿Cuál animal no es endémico en México?', ['Ajolote', 'Vaquita Marina','Teporingo', 'Colibrí'], 'Colibrí'),
    new Question('México atesora el ___% de todas las especies del planeta',['20%', '10%', '15%', '5%'], '10%'),
    new Question('Todos son cineastas Mexicanos, exepto:', ['Guillermo del Toro', 'Alfonso Cuarón', 'Alejandro Amenábar', 'Luis Buñuel'], 'Alejandro Amenábar'),
    new Question('¿Cuántos años duró la guerra de independencia?', ['9', '10', '11', '12'], '10'),
    new Question('El lema “Sufragio efectivo, no reelección” fue la bandera política de:', ['Francisco I. Madero', 'Vicente Guerrero', 'A. Santa Anna', 'Benito Juárez'], 'Francisco I. Madero'),
    new Question('Nombre del mexicano que recibió el premio Nobel de literatura', ['Jaime Sabines', 'Juan Rulfo', 'Carlos Fuentes', 'Octavio Paz'], 'Octavio Paz'),
    new Question('¿Cuántos estados tiene la República Mexicana?', ['32', '31', '30', '33'], '32'),
    new Question('¿Dónde se creo TAZIA?', ['Puebla', 'CDMX', 'Jalisco', 'Monterrey'], 'Puebla'),
];