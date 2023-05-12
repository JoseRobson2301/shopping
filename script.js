window.onload = function() {
    var cartItems = [];
  
    function addToCart(productName, price) {
      var item = {
        name: productName,
        price: price
      };
  
      cartItems.push(item);
      updateCart();
    }
  
    function updateCart() {
      var cartTable = document.getElementById("carrinhoTable");
      cartTable.innerHTML = `
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th></th>
        </tr>
      `;
  
      var totalPrice = 0;
  
      cartItems.forEach(function(item, index) {
        var row = cartTable.insertRow();
        var productNameCell = row.insertCell(0);
        var quantityCell = row.insertCell(1);
        var priceCell = row.insertCell(2);
        var removeButtonCell = row.insertCell(3);
  
        productNameCell.innerHTML = item.name;
        quantityCell.innerHTML = "1";
        priceCell.innerHTML = "R$" + item.price.toFixed(2);
        totalPrice += item.price;
  
        var removeButton = document.createElement("button");
        removeButton.innerHTML = "Remover";
        removeButton.addEventListener("click", function() {
          removeFromCart(index);
        });
        removeButtonCell.appendChild(removeButton);
      });
  
      var totalElement = document.getElementById("totalPrice");
      totalElement.innerHTML = totalPrice.toFixed(2);
  
      var cartSection = document.getElementById("carrinhoSection");
      cartSection.style.display = "block";
    }
  
    function removeFromCart(index) {
      cartItems.splice(index, 1);
      updateCart();
    }
  
    function finalizePurchase() {
      alert("Compra finalizada com sucesso!");
      cartItems = [];
      updateCart();
    }
  
    function showCart() {
      updateCart();
    }
  
    // Adicione os listeners de clique aos botões após o carregamento completo da página
    var addToCartButtons = document.getElementsByClassName("adicionar");
    for (var i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener("click", addToCartButtonClick);
    }
  
    function addToCartButtonClick() {
      var productName = this.parentNode.querySelector("h3").innerText;
      var priceText = this.parentNode.querySelector("p:nth-child(3)").innerText;
      var price = parseFloat(priceText.replace("Preço: R$", ""));
      addToCart(productName, price);
    }
  };