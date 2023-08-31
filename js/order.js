let modal1 = document.getElementById('orderForm');

window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}