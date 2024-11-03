import { useEffect, useRef, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { create, all } from 'mathjs'


function App() {
  const [num, setNum] = useState('');//算式
  const [ans, setAns] = useState('');//答案
  //mathjs套件
  const config = {}
  const math = create(all, config)

  const lastWord = num.toString().substring(num.length - 1, num.length);//抓num最後一個字
  const numRef = useRef(null);
  const ansRef = useRef(null);

  const pressNumber = (n) => {
    setAns('');//答案清空
    if (n === '00') {//按下00
      if (num === '0') {//如果只有0 直接return
        return
      } else {
        switch (lastWord) {//如果尾巴是加減乘除或空的
          case '+':
          case '-':
          case 'x':
          case '÷':
          case '':
            setNum(num + '0')//只加一個零
            break;
          default:
            setNum(num + n.toString());//預設加兩個
            break;
        }
      }
    } else if (n === '.' && num === '') {//按下．且num是空的
      setNum('0.')//加0.
    } else {
      setNum(num + n.toString());//剩下按什麼加什麼
    }
  }
  const add = () => {
    setAns('');
    if (lastWord === '÷' || lastWord === 'x' || lastWord === '-' || lastWord === '+') {
      setNum(num.replace(/.$/, '+'))//尾巴是加減乘除換成加
    } else if (ans !== '') {//有ans就直接ans上加號
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
    if (lastWord === '-' || lastWord === '+') {//乘除不用換掉 因為有負數
      setNum(num.replace(/.$/, '-'))
    } else if (ans !== '') {
      setNum(ans + "-")
    }
    else {
      setNum(num + "-")
    }
  }
  const equal = () => {

    if (num === '') {//算式為空 直接return
      return;
    }
    const result = num.replace(/[x ÷]/g,//把乘除換成 '*' '/'符合套件格式
      (match) => {
        if (match === 'x') {
          return '*'
        } else if (match === '÷') {
          return '/'
        }
      }
    );
    try {
      setNum('')//按下等於後 清空算式

      const takeComma = result.replace(/,/g, '');//拿掉逗號以符合套件格式

      setAns(math.evaluate(takeComma));//math套件把字串轉成算式再return結果

    } catch (error) {
      alert('發生了一點問題 請重新操作')//catch 捕捉錯誤
    }
  }


  const clear = () => {//清空函式
    setNum('');
    setAns('');
  }
  const fallBack = () => {//倒退函式
    setNum(num.toString().slice(0, -1))//slice切到0是開始-1代表倒數第一個字
  }

  if (numRef.current) {//螢幕自動滾動到新增的數字
    numRef.current.scrollRight = numRef.current.scrollWidth;
  }
  useEffect(() => {

    
    if (ans.length > 10 && ans.length <= 15) {//根據字數 改變字的大小 防止跑版
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
    const addComma = takeComma.replace(/\B(?=(\d{3})+(?!\d))/g, ",");//加上逗號 每三位加上逗號
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
