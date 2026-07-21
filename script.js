document.addEventListener("DOMContentLoaded", function () {
    var here = window.location.pathname.split("/").pop();
    var links = document.querySelectorAll(".submenu a");
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href");
      if (href === here) {
        links[i].classList.add("active");
      }
    }
  });

function getOrder() { 
    try {
      var raw = localStorage.getItem("betong_order");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
  
  function saveOrder(order) {
    localStorage.setItem("betong_order", JSON.stringify(order));
  }  
  function addItem(name) {
    var order = getOrder();
    var found = false;
    for (var i = 0; i < order.length; i++) {
      if (order[i].name === name) {
        order[i].qty += 1;
        found = true;
        break;
      }
    }
    if (!found) {
      order.push({ name: name, qty: 1 });
    }
    saveOrder(order);
    alert(name + " added to your order!");
  }
  
  function clearOrder() {
    localStorage.removeItem("betong_order");
  }

  function submitReservation(event) {
    event.preventDefault();
    var name = document.getElementById("name").value || "Guest";
    var time = document.getElementById("time").value || "6:00pm";
    var date = document.getElementById("date").value || "your booking date";
    window.location.href =
      "confirmation.html?name=" +
      encodeURIComponent(name) +
      "&time=" +
      encodeURIComponent(time) +
      "&date=" +
      encodeURIComponent(date);
    return false;
  }
  function fillConfirmation() {
    var params = new URLSearchParams(window.location.search);
    var name = params.get("name") || "Guest";
    var time = params.get("time") || "6:00pm";
    var date = params.get("date") || "your booking date";
  
    var el = document.getElementById("confirm-line");
    if (el) {
      el.textContent =
        "Dear " + name + ", your reservation is confirmed for " + time + " on " + date + ".";
    }
  
    var list = document.getElementById("order-list");
    if (list) {
      var order = getOrder();
      list.innerHTML = "";
      if (order.length === 0) {
        var li = document.createElement("li");
        li.textContent = "No items added yet! You can order in store.";
        list.appendChild(li);
      } else {
        for (var i = 0; i < order.length; i++) {
          var item = document.createElement("li");
          item.textContent = order[i].qty + "x " + order[i].name;
          list.appendChild(item);
        }
      }
    }
  }  