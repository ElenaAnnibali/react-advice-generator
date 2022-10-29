/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const appStyles = css`
  display: flex;
  justify-content: center;

  .container {
    width: 33.75em;
    height: 20.625em;
    border-radius: 1.25em;
    background-color: hsl(217, 19%, 24%);
    position: absolute;
    top: 25%;
  }

  span {
    position: absolute;
    left: 15em;
    top: 2.5em;
    color: hsl(150, 100%, 66%);
    font-family: 'Manrope-EB';
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.3em;
  }

  p {
    text-align: center;
    position: absolute;
    font-size: 1.75em;
    left: 0.6em;
    top: 2.5em;
    width: 18em;
    height: 4.29em;
  }

  button {
    position: absolute;
    top: 23em;
    left: 18em;
    border-radius: 50%;
    width: 3.75em;
    height: 3.75em;
    background-color: hsl(150, 100%, 66%);
    border-width: 0;
    cursor: pointer;

    &:hover {
      opacity: 1;
      box-shadow: 0 0 2em 0.5em hsl(150, 100%, 66%);
      transition: opacity 0.3s linear;
    }
  }

  img {
    margin-top: 0.37em;
  }

  .image {
    background: url('/images/pattern-divider-desktop.svg');
    background-repeat: no-repeat;
    position: absolute;
    top: 15em;
    width: 27.8em;
    height: 1.06em;
    left: 2.7em;
  }
`;

const baseUrl = 'https://api.adviceslip.com/advice';

function App() {
  const [advices, setAdvices] = useState(
    "Sometimes it's best to ignore other people's advice.",
  );
  const [adviceId, setAdviceId] = useState(17);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const asyncTimeout = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const getAdvice = async () => {
    try {
      setLoading(true);
      await asyncTimeout(1000);
      const response = await fetch(baseUrl);
      const advice = await response.json();
      console.log(advice);
      setLoading(false);
      setAdvices(advice.slip.advice);
      setAdviceId(advice.slip.id);
    } catch (error) {
      setErrors(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getAdvice().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div css={appStyles}>
      <div className="container">
        <span>Advice # {adviceId}</span>
        <div>
          <p>"{advices}"</p>
        </div>
        <div className="image" />
        <button onClick={getAdvice}>
          <img src="/images/icon-dice.svg" alt="icon dice" />
        </button>
      </div>
    </div>
  );
}

export default App;
