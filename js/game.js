var words = ["skirt", "sweater", "jeans"];
      var word = ""; // слово
      var remain = 0; // сколько осталось угадать букв
      var answer = []; // массив, в который будет записано слово игрока
      var guess = ""; // переменная для буквы игрока
      var counter = 0; // Сколько было всего сделано ходов
 
      // Настройка элемента холста canvas
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
 
      // Получаем ширину и высоту элемента canvas
      var width = canvas.width; // ширина холста
      var height = canvas.height; // высота холста
      var figure; // фигура, которую будем рисовать
      
 
      
 
      // Функция для рисования рамки
      var drawCanvasBorder = function() {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(width, 0);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.lineTo(0, 0);
        ctx.strokeStyle = "#B9917D";
        ctx.stroke();
      };
 
      // Выводим оставшееся количество ходов
      var drawRemain = function() {
        ctx.clearRect(0, 0, width, height); // очистка холста
        ctx.font = "20px 'Trebuchet MS', sans-serif";
        ctx.fillStyle = "Black";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(
          "Remained letters to guess: " +
            remain +
            " Steps were made " +
            counter,
          10,
          height - 30
        );
      };
 
      // Выводим результат игры
      var drawResult = function(res) {
        ctx.font = "20px 'Trebuchet MS', sans-serif";
        ctx.fillStyle = "Black";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Game is over! " + res, 10, height - 50);
      };
 
      // Выводим слово
      var drawWord = function() {
        ctx.font = "20px 'Trebuchet MS', sans-serif";
        ctx.fillStyle = "Black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(answer.join(" "), width / 2, 30);
      };
 
      // Задаем конструктор Figure (фигура)
      var Figure = function() {
        this.n = 0;
      };
 
      // Рисуем фигуру в зависимости от номера проигрышного кода
      Figure.prototype.drawPart = function() {
        ctx.fillStyle = "#B9917D";
        ctx.beginPath();
        switch (this.n) {
          case 1:
            ctx.moveTo(200, 300);
            ctx.lineTo(200, 100);
            break;
          case 2:
            ctx.moveTo(200, 300);
            ctx.lineTo(200, 100);
            ctx.lineTo(300, 100);
            break;
          case 3:
            ctx.moveTo(200, 300);
            ctx.lineTo(200, 100);
            ctx.lineTo(300, 100);
            ctx.lineTo(300, 150);
            break;
			 case 4:
            ctx.moveTo(200, 300);
            ctx.lineTo(200, 100);
            ctx.lineTo(300, 100);
            ctx.lineTo(300, 150);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = "#B9917D";
            ctx.moveTo(300,150);
            ctx.arc(300, 150, 15, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            break;
			 case 5:
            ctx.moveTo(200, 300);
            ctx.lineTo(200, 100);
            ctx.lineTo(300, 100);
            ctx.lineTo(300, 150);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = "#B9917D";
            ctx.moveTo(300,150);
            ctx.arc(300, 150, 15, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(300, 165);
            ctx.lineTo(300, 220);
            break;
			 case 6:
            ctx.moveTo(200, 300);
            ctx.lineTo(200, 100);
            ctx.lineTo(300, 100);
            ctx.lineTo(300, 150);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = "#B9917D";
            ctx.moveTo(300,150);
            ctx.arc(300, 150, 15, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(300, 165);
            ctx.lineTo(300, 220);
            ctx.lineTo(270, 270);
            ctx.moveTo(300, 220);
            ctx.lineTo(330, 270);
            break;
			 case 7:
            ctx.moveTo(200, 300);
            ctx.lineTo(200, 100);
            ctx.lineTo(300, 100);
            ctx.lineTo(300, 150);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = "#B9917D";
            ctx.moveTo(300,150);
            ctx.arc(300, 150, 15, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(300, 165);
            ctx.lineTo(300, 220);
            ctx.lineTo(270, 270);
            ctx.moveTo(300, 220);
            ctx.lineTo(330, 270);
            ctx.moveTo(300, 170);
            ctx.lineTo(330, 210);
            ctx.moveTo(300, 170);
            ctx.lineTo(270, 210);
            break;
        }
        ctx.stroke();
      };
 
      function play() {
        var randomIndex = Math.floor(Math.random() * words.length);
        word = words[randomIndex]; // слово
        remain = word.length - 2; // сколько осталось угадать букв
 
        answer[0] = word[0];
 
        // Массив для слова - начальный вид
        answer[word.length - 1] = word[word.length - 1];
        for (var i = 1; i < word.length - 1; i++) {
          answer[i] = "_";
        }
 
        drawRemain();
        drawWord();
        drawCanvasBorder();
 
        figure = new Figure();
      }
 
      // ход игрока и проверка
      function check() {
        guess = prompt("");
        counter++;
        var guessOK = false; // угадал или не угадал букву
        for (var i = 1; i < word.length - 1; i++) {
          if (word[i] === guess) {
            answer[i] = guess;
            guessOK = true;
            remain--;
          }
        }
        if (remain < 0) remain = 0;
        drawRemain();
        drawWord();
        drawCanvasBorder();
        if (!guessOK) {
          figure.n++;
        }
        figure.drawPart();
        if (remain == 0) {
          var res = "You won!";
          drawResult(res, counter);
        }
		  if (counter >= 7) {
          var res = "You lost!";
          drawResult(res, counter);
        }
      }