async function run() {
  const response = await fetch("http://localhost:5533/roast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: "def greet():\n    print('hello')",
      level: "medium",
      language: "python"
    })
  });

  const data = await response.json();
  console.log(data);
}

run();