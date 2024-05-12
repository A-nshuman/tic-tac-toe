import { useRef } from "react";
import React, { useState } from "react";

let data = ["", "", "", "", "", "", "", "", ""]
let takenArray = []
let columns = [0, 1, 2, 3, 4, 5, 6, 7, 8]

function Hero() {

    let [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [player, setPlayer] = useState("Your Turn");
    const [Pcolor, setColor] = useState("var(--dull-red)");
    const [Wcolor, setWcolor] = useState("var(--dull-red)");
    const [whoWon, setWinner] = useState("");
    const [winPara, setPara] = useState("");
    let winnerRef = useRef(null);

    let box0ref = useRef(null);
    let box1ref = useRef(null);
    let box2ref = useRef(null);
    let box3ref = useRef(null);
    let box4ref = useRef(null);
    let box5ref = useRef(null);
    let box6ref = useRef(null);
    let box7ref = useRef(null);
    let box8ref = useRef(null);

    let boxArray = [box0ref, box1ref, box2ref, box3ref, box4ref, box5ref, box6ref, box7ref, box8ref]

    // const handleMouseOver = (ref) => {
    //     ref.current.style.boxShadow = "inset 0 0 10px var(--dark)";
    // };

    // const handleMouseOut = (ref) => {
    //     ref.current.style.boxShadow = "none";
    // };

    const toggle = (event, index) => {

        if (lock) {
            return 0;
        }

        if (count % 2 === 0) {

            event.target.innerHTML = "close";
            event.target.style.backgroundColor = "var(--dull-red)";

            takenArray.push(index);
            columns.splice(columns.indexOf(index), 1);
            data[index] = "x";

            setPlayer("Computer's Turn");
            setColor("var(--dull-blue)");
            setCount(++count);

            setTimeout(() => {

                if (!lock) {

                    const randomIndex = Math.floor(Math.random() * columns.length);
                    const randomNumber = columns[randomIndex];
                    const compBox = document.querySelector(`.box${randomNumber}`);

                    compBox.innerHTML = "circle";
                    compBox.style.backgroundColor = "var(--dull-blue)";

                    takenArray.push(randomNumber);
                    columns.splice(columns.indexOf(randomNumber), 1);
                    data[randomNumber] = "o";

                    setPlayer("Your Turn");
                    setColor("var(--dull-red)");
                    setCount(++count);

                }

            }, 1000);

        }

        checkWinner();

    };

    const checkWinner = () => {
        if (data[0] === data[1] && data[1] === data[2] && data[0] !== "") {
            won(data[0]);
            winnerHighlight(0, 1, 2);
        } else if (data[3] === data[4] && data[4] === data[5] && data[3] !== "") {
            won(data[3]);
            winnerHighlight(3, 4, 5);
        } else if (data[6] === data[7] && data[7] === data[8] && data[6] !== "") {
            won(data[6]);
            winnerHighlight(6, 7, 8);
        } else if (data[0] === data[3] && data[3] === data[6] && data[0] !== "") {
            won(data[0]);
            winnerHighlight(0, 3, 6);
        } else if (data[1] === data[4] && data[4] === data[7] && data[1] !== "") {
            won(data[1]);
            winnerHighlight(1, 4, 7);
        } else if (data[2] === data[5] && data[5] === data[8] && data[2] !== "") {
            won(data[2]);
            winnerHighlight(2, 5, 8);
        } else if (data[0] === data[4] && data[4] === data[8] && data[0] !== "") {
            won(data[0]);
            winnerHighlight(0, 4, 8);
        } else if (data[2] === data[4] && data[4] === data[6] && data[2] !== "") {
            won(data[2]);
            winnerHighlight(2, 4, 6);
        }
    }

    const winnerHighlight = (index1, index2, index3) => {
        setTimeout(() => {
            boxArray[index1].current.style.backgroundColor = "var(--yellow)";
        }, 500);
        setTimeout(() => {
            boxArray[index2].current.style.backgroundColor = "var(--yellow)";
        }, 1000);
        setTimeout(() => {
            boxArray[index3].current.style.backgroundColor = "var(--yellow)";
        }, 1500);
    }

    const won = (winner) => {

        setLock(true);

        if (winner === 'x') {
            setPara("Congratulations");
            setWinner("You");
            setWcolor("var(--dull-red)");
        } else {
            setPara("Better Luck Next Time");
            setWinner("Computer");
            setWcolor("var(--dull-blue)");
        }

        setTimeout(() => {
            winnerRef.current.style.display = "flex";
        }, 2000);

    }

    const handleDev = () => {
        window.open('https://github.com/A-nshuman', '_blank')
    }

    const clickHandler = () => {
        data = ["", "", "", "", "", "", "", "", ""];
        winnerRef.current.style.display = "none";
        takenArray = []
        columns = [0, 1, 2, 3, 4, 5, 6, 7, 8]

        setLock(false);
        setCount(0);
        setPlayer("Your Turn");
        setColor("var(--dull-red)");

        boxArray.map((box) => {
            box.current.innerHTML = "";
            box.current.style.backgroundColor = "var(--light)";
        });
    }

    return (
        <>
            <h1 className="title">Tic-Tac-Toe</h1>

            <div className="container">
                <div className="developer" onClick={handleDev}>Anshuman Bhardwaj</div>

                <div className="winner" ref={winnerRef}>
                    <div className="winnerPara">{winPara}</div>
                    <div className="winnerStatement">
                        <div className="winnerDisplay" style={{ filter: `drop-shadow(0 0 3px ${Wcolor})` }}>{whoWon}</div>
                        won the match
                    </div>
                    <button className="closeBtn" onClick={clickHandler}>Play Again</button>
                </div>

                <div className="gameFrame">
                    <div className="box material-symbols-outlined box0" ref={box0ref} onClick={(e) => { toggle(e, 0) }}></div>
                    <div className="box material-symbols-outlined box1" ref={box1ref} onClick={(e) => { toggle(e, 1) }}></div>
                    <div className="box material-symbols-outlined box2" ref={box2ref} onClick={(e) => { toggle(e, 2) }}></div>
                    <div className="box material-symbols-outlined box3" ref={box3ref} onClick={(e) => { toggle(e, 3) }}></div>
                    <div className="box material-symbols-outlined box4" ref={box4ref} onClick={(e) => { toggle(e, 4) }}></div>
                    <div className="box material-symbols-outlined box5" ref={box5ref} onClick={(e) => { toggle(e, 5) }}></div>
                    <div className="box material-symbols-outlined box6" ref={box6ref} onClick={(e) => { toggle(e, 6) }}></div>
                    <div className="box material-symbols-outlined box7" ref={box7ref} onClick={(e) => { toggle(e, 7) }}></div>
                    <div className="box material-symbols-outlined box8" ref={box8ref} onClick={(e) => { toggle(e, 8) }}></div>
                </div>

                <p className="whoseMove">
                    <span className="player" style={{ color: Pcolor, filter: `drop-shadow(0 0 5px ${Pcolor})` }}>{player}</span>
                </p>

            </div>
        </>
    );

}

export default Hero;