import React, { useRef, useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [times, setTimes] = useState([]);
  const [time, setTime] = useState("00:00:00");
  const timeRef = useRef();
  let timer;

  const start = () => {
    timer = setInterval(() => {
      let [mm, ss, cs] = time.split(":").map((v) => parseInt(v));
      cs = cs + 1;
      if (cs === 100) {
        cs = 0;
        ss = ss + 1;
      }
      if (ss === 60) {
        mm = mm + 1;
        ss = 0;
      }
      const t = getTime(mm, ss, cs);
      setTime(t);
    }, 100);
  }

  const stop = () => {
    clearInterval(timer);
  }

  const lap = () => {
    setTimes(time);
  }

  const reset = () => {
    setTimes([]);
    setTime("00:00:00");
  }
  const getTime = (mm, ss, cs) => {
    mm = mm >= 10 ? mm : "0" + mm;
    ss = ss >= 10 ? ss : "0" + ss;
    cs = cs >= 10 ? cs : "0" + cs;
    return `${mm}:${ss}:${cs}`;
  };
  useEffect(() => {

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {/* Do not remove the main div */}
      <p ref={timeRef}>{time}</p>
      <div>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={lap}>Lap</button>
        <button onClick={reset}>Reset</button>
      </div>
      <ul>
        {times.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
