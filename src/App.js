import { useEffect, useRef, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { create, all } from 'mathjs'


function App() {
  const [num, setNum] = useState('');
  const [ans, setAns] = useState('');
  const config = {}
  const math = create(all, config)
  const lastWord = num.toString().substring(num.length - 1, num.length);
  const numRef = useRef(null);
  const ansRef = useRef(null);

  const pressNumber = (n) => {
    setAns('');
    if (n === '00') {
      if (num === '0') {
        return
      } else {
        switch (lastWord) {
          case '+':
          case '-':
          case 'x':
          case '÷':
          case '':
            setNum(num + '0')
            break;
          default:
            setNum(num + n.toString());
            break;
        }
      }
    } else if (n === '.' && num === '') {
      setNum('0.')
    } else {
      setNum(num + n.toString());
    }
  }
  const add = () => {
    setAns('');
    if (lastWord === '÷' || lastWord === 'x' || lastWord === '-' || lastWord === '+') {
      setNum(num.replace(/.$/, '+'))
    } else if (ans !== '') {
      setNum(ans + "+")
    }
    else {
      setNum(num + "+")
    }
  }
  const division = () => {

    setAns('');
    if (lastWord === '÷' || lastWord === 'x' || lastWord === '-' || lastWord === '+') {
      setNum(num.replace(/.$/, '÷'))
    } else if (ans !== '') {
      setNum(ans + "÷")
    }
    else {
      setNum(num + "÷")
    }
  }
  const multiplication = () => {

    setAns('');
    if (lastWord === '÷' || lastWord === 'x' || lastWord === '-' || lastWord === '+') {
      setNum(num.replace(/.$/, 'x'))
    } else if (ans !== '') {
      setNum(ans + "x")
    }
    else {
      setNum(num + "x")
    }
  }
  const Subtraction = () => {
    setAns('');
    if (lastWord === '-' || lastWord === '+') {
      setNum(num.replace(/.$/, '-'))
    } else if (ans !== '') {
      setNum(ans + "-")
    }
    else {
      setNum(num + "-")
    }
  }
  const equal = () => {

    if (num === '') {
      return;
    }
    const result = num.replace(/[x ÷]/g,
      (match) => {
        if (match === 'x') {
          return '*'
        } else if (match === '÷') {
          return '/'
        }
      }
    );
    try {
      setNum('')

      const takeComma = result.replace(/,/g, '');

      setAns(math.evaluate(takeComma));

    } catch (error) {
      alert('發生了一點問題 請重新操作')
    }
  }


  const clear = () => {
    setNum('');
    setAns('');
  }
  const fallBack = () => {
    setNum(num.toString().slice(0, -1))
  }

  useEffect(() => {

    if (numRef.current) {
      numRef.current.scrollLeft = numRef.current.scrollWidth;
    }
    
    if (ans.length > 10 && ans.length <= 15) {
      ansRef.current.style.fontSize = '40px'
    } else if (ans.length > 15 && ans.length <= 20) {
      ansRef.current.style.fontSize = '24px'
    } else if (ans.length > 20) {
      ansRef.current.style.fontSize = '16px'
    }
    else {
      ansRef.current.style.fontSize = '56px'
    }

    const takeComma = num.replace(/,/g, '');
    const addComma = takeComma.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setNum(addComma);
    const addCommaAns = ans.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setAns(addCommaAns);



  }, [num, ans])







  return (
    <div className="App ">
      <div className='back d-flex vh-100
      justify-content-center
      align-items-center
      '
      >
        <div className='cal'>
          <div className='top d-flex flex-column
          '>
            <div className='cal-area'
              ref={numRef}
            >
              {num}
            </div>
            <div className='ans-area'
              ref={ansRef}
            >
              {ans}
            </div>
          </div>
          <div className='under'>
            <div className="row g-0 d-flex
          justify-content-center
          align-items-center
          "
              style={{
                marginTop: '16px'
              }}
            >
              <div className="col" onClick={() => pressNumber("7")}>7</div>
              <div className="col" onClick={() => pressNumber("8")}>8</div>
              <div className="col" onClick={() => pressNumber("9")}>9</div>
              <div className="col symbol d-flex
              justify-content-center
              align-items-center
              "
                style={{
                  maxWidth: "72px"
                }}
                onClick={() => division()}
              >
                <span>
                  ÷
                </span>
              </div>
            </div>
            <div className="row g-0 d-flex
          justify-content-center
          align-items-center
          "
              style={{
                marginTop: '16px'
              }}
            >
              <div className="col" onClick={() => pressNumber("4")}>4</div>
              <div className="col" onClick={() => pressNumber("5")}>5</div>
              <div className="col" onClick={() => pressNumber("6")}>6</div>
              <div className="col symbol d-flex
              justify-content-center
              align-items-center
              "
                style={{
                  maxWidth: "72px"
                }}
                onClick={() => multiplication()}
              >
                <span>
                  ×
                </span>
              </div>
            </div>
            <div className="row g-0 d-flex
          justify-content-center
          align-items-center
          "
              style={{
                marginTop: '16px'
              }}
            >
              <div className="col" onClick={() => pressNumber("1")}>1</div>
              <div className="col" onClick={() => pressNumber("2")}>2</div>
              <div className="col" onClick={() => pressNumber("3")}>3</div>
              <div className="col symbol d-flex
              justify-content-center
              align-items-center
              "
                style={{
                  maxWidth: "72px"
                }}
                onClick={() => add()}
              >
                <span >
                  +
                </span>
              </div>
            </div>
            <div className="row g-0 d-flex
          justify-content-center
          align-items-center
          "
              style={{
                marginTop: '16px'
              }}
            >
              <div className="col" onClick={() => pressNumber(0)}>0</div>
              <div className="col" onClick={() => pressNumber('00')}>00</div>
              <div className="col" onClick={() => pressNumber('.')}>.</div>
              <div className="col symbol d-flex
              justify-content-center
              align-items-center
              "
                style={{
                  maxWidth: "72px"
                }}
                onClick={() => Subtraction()}

              >
                <span>
                  -
                </span>
              </div>
            </div>
            <div className="row g-0 d-flex
          justify-content-center
          align-items-center
          "
              style={{
                marginTop: '16px'
              }}
            >
              <div className="col "
                style={{
                  textAlign: 'center',
                  font: "normal normal 500 24px/28px Roboto",
                  letterSpacing: "0px",
                  color: "#00C4FF",
                  opacity: 1,
                }}
                onClick={() => clear()}
              >
                AC
              </div>
              <div className="col"
                style={{
                  textAlign: 'center',
                  font: "normal normal 500 24px/28px Roboto",
                  letterSpacing: "0px",
                  color: "#00C4FF",
                  opacity: 1,
                }}
                onClick={() => fallBack()}
              >
                ⌫
              </div>
              <div className="col-6 symbol d-flex
              justify-content-center
              align-items-center
              "
                style={{
                  width: '155px',
                  background: "transparent linear-gradient(90deg, #00C4FF 0%, #6C00FF 100%) 0% 0% no-repeat padding-box",
                  borderRadius: '16px',
                }}
                onClick={() => equal()}
              >
                <span >
                  =
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
