var d = document,
        itemBox = d.querySelectorAll(".item_box"), // блок каждого товара
        cartCont = d.getElementById("cart_content"); // блок вывода данных корзины
      // Функция кроссбраузерная установка обработчика событий
      function addEvent(elem, type, handler) {
        if (elem.addEventListener) {
          elem.addEventListener(type, handler, false);
        } else {
          elem.attachEvent("on" + type, function() {
            handler.call(elem);
          });
        }
        return false;
      }
      // Получаем данные из LocalStorage
      function getCartData() {
        return JSON.parse(localStorage.getItem("cart"));
      }
      // Записываем данные в LocalStorage
      function setCartData(o) {
        localStorage.setItem("cart", JSON.stringify(o));
        return false;
      }

      function addItem(plus) {
        if (getCartData()) {
          var cartData = getCartData();
          var item = plus.getAttribute("data-id");
          //console.log(cartData[item][3]);
          cartData[item][3] = Number(cartData[item][3]) + 1;
          console.log(cartData[item][3]);

          setCartData(cartData);
          cartCont.innerHTML = basketGenerate();
        }
      }

      function removeItem(plus) {
        if (getCartData()) {
          var cartData = getCartData();
          var item = plus.getAttribute("data-id");
          //console.log(cartData[item][2]);
          cartData[item][3] = Number(cartData[item][3]) - 1;
          console.log(cartData[item][3]);
          if (cartData[item][3] == 0) delete cartData[item];

          setCartData(cartData);
          cartCont.innerHTML = basketGenerate();
        }
      }

function count() {
  let count = 0;
  if (getCartData()) {
    let cartData = getCartData();
    for (const key in cartData) {
		 // console.log(cartData[key]);
		 count += cartData[key][3];
    
    }
  }
  return count;
}

function sum() {
  let sum = 0;
  if (getCartData()) {
    let cartData = getCartData();
    for (const key in cartData) {
		 // console.log(cartData[key]);
		 sum += cartData[key][2] * cartData[key][3];
    
    }
  }
  return sum;
}


      // Добавляем товар в корзину
      function addToCart(e) {
        let button = e.target;
        button.disabled = true; // блокируем кнопку на время операции с корзиной
        let cartData = getCartData() || {}; // получаем данные корзины или создаём новый объект, если данных еще нет
        let parentBox = button.parentNode; // родительский элемент кнопки "Добавить в корзину";
        let itemId = button.getAttribute("data-id"); // ID товара
        let itemTitle = parentBox.querySelector(".item_title").innerHTML; // название товара
        let itemBrand = parentBox.querySelector(".item_brand").innerHTML; // бренд товара
        let itemPrice = parentBox.querySelector(".item_price").innerHTML; // стоимость товара
        console.log(cartData);
        if (cartData.hasOwnProperty(itemId)) {
          // если такой товар уже в корзине, то добавляем +1 к его количеству
          cartData[itemId][3] += 1;
        } else {
          // если товара в корзине еще нет, то добавляем в объект
          cartData[itemId] = [itemTitle, itemBrand, itemPrice, 1];
        }
// Обновляем данные в LocalStorage
        if (!setCartData(cartData)) {
          this.disabled = false; // разблокируем кнопку после обновления LS
          cartCont.innerHTML = "Item added to cart.";
          setTimeout(function() {
            cartCont.innerHTML = "Items in cart: " + count();
          }, 1000);
        }
        return false;
      }
      // Устанавливаем обработчик события на каждую кнопку &quot;Добавить в корзину&quot;
      for (var i = 0; i < itemBox.length; i++) {
        addEvent(itemBox[i].querySelector(".add_item"), "click", addToCart);
      }

      function basketGenerate() {
        var cartData = getCartData(), // вытаскиваем все данные корзины
          totalItems = "";
        console.log(JSON.stringify(cartData));
        // если что-то в корзине уже есть, начинаем формировать данные для вывода
        if (cartData !== null) {
          totalItems =
            '<table class="shopping_list table table-striped rounded"><tr><th scope="col">Name</th><th scope="col">Brand</th><th scope="col">Price</th><th scope="col">Quantity</th><th scope="col">Add an item</th><th scope="col">Delete an item</th></tr>';
          for (var items in cartData) {
            totalItems += "<tr>";
            for (var i = 0; i < cartData[items].length; i++) {
              totalItems += "<td>" + cartData[items][i] + "</td>";
            }
            totalItems +=
              "<td>" +
              '<span class="plus" data-id="' +
              items +
              '" onclick="addItem(this)">+</span>' +
              "</td>";

            totalItems +=
              "<td>" +
              '<span class="minus" data-id="' +
              items +
              '" onclick="removeItem(this)">-</span>' +
              "</td>";

            totalItems += "</tr>";
          }
          totalItems +=
            "<tr>" +
            "<td>" +
            "Total" +
            "</td>" +
            "<td>" +
            sum() +
            "</td>" +
            "<td>" +
            count() +
            "</td>" +
            "<td></td><td></td></tr>";
          totalItems += "</table>";
          return totalItems;
        } else {
          // если в корзине пусто, то сигнализируем об этом
          return "Items in cart: " + count();
        }
      }

      // Открываем корзину со списком добавленных товаров
      function openCart(e) {
        cartCont.innerHTML = basketGenerate();
        return false;
      }

      /* Открыть корзину */
      addEvent(d.getElementById("checkout"), "click", openCart);
      /* Очистить корзину */
      addEvent(d.getElementById("clear_cart"), "click", function(e) {
        localStorage.removeItem("cart");
        cartCont.innerHTML = "Cart is cleared";
      });
      sum();