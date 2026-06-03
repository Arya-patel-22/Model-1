import { useState, useEffect } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

      useEffect(() => {
      console.log("Count changed");
  }, [count]);

  return (
    <div>

      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>

      <button onClick={() => setCount(count - 1)}>
        Decriment
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>

    </div>
  );
}

export default Counter;
