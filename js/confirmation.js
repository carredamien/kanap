let searchParams = new URLSearchParams(location.search);
let orderId = searchParams.get("order")
let order = document.getElementById('orderId');

order.innerHTML = `<br><br> ${orderId}`;
localStorage.clear();