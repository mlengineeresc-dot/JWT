import { useState } from "react";
export default function Counter({ initialValue }) {
  const [count, setCount] = useState(initialValue);
  const [show, setShow] = useState(false);

  return (
    <>
      <p>count:{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
          setShow(true);
        }}
      >
        Increment
      </button>
      {show && <p>Count value incremented</p>}
    </>
  );
}
