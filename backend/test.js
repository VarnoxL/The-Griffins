const response = await fetch("http://localhost:5533/roast", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    code: "print('hello world')"
  })
});

const data = await response.json();

console.log(data);
