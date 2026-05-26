import { useEffect, useState } from "react";

function Quotes() {

  const [quotes, setQuotes] = useState([]);

  useEffect(() => {

    fetch("https://dummyjson.com/quotes")
      .then((response) => response.json())
      .then((data) => {

        setQuotes(data.quotes);

      });

  }, []);

  return (
    <div>

      <h1>Quotes</h1>

      {quotes.map((item) => (

        <div key={item.id}>

          <h3>{item.quote}</h3>

          <p>- {item.author}</p>

          <hr />

        </div>

      ))}

    </div>
  );
}

export default Quotes;