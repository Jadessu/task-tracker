import styled from "styled-components";

const TimerSets = styled.div`
display: flex;
`

export const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return (
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds)
  );
};

export function Length({ title, changeTime, type, time, formatTime }) {
  return (
    <div>
      <h3> {title}</h3>
      <TimerSets>
        <button onClick={() => changeTime(-60, type)}> Arrow Down</button>
        <h3>{formatTime(time)}</h3>
        <button onClick={() => changeTime(60, type)}> Arrow up</button>
     </TimerSets>
    </div>
  );
}
