import { useState } from "react";
import { keywords } from "./Keywords.tsx";
import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function LiveMath() {
  const [expr, setExpr] = useState("v = r\\omega");
  const [exprHistory, setHistory] = useState([]);

  const addItem = (insertItem) => {
    setHistory((prevArray) => [...prevArray, insertItem]);
  };

  const renderExpression = (curr_expr, index) => (
    <div key={index} style={{ marginBottom: "0.5rem" }}>
      <MathJax inline>{`\\(${curr_expr}\\)`}</MathJax>
    </div>
  );

  function renderHistory(list) {
    return list.map((item, index) => renderExpression(item, index));
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>History</h1>
      <MathJaxContext>
        <div id="expressionHistory">{renderHistory(exprHistory)}</div>
        <article id="expression_render" style={{ margin: "1rem 0" }}>
          <MathJax inline>{`\\(${expressionToMathJax(expr)}\\)`}</MathJax>
        </article>
        <main>
          <input
            id="input"
            type="text"
            value={expr}
            onInput={(e) => setExpr(e.target.value)}
            placeholder="Type LaTeX here..."
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              textAlign: "center",
              width: "60%",
            }}
          />
          <button
            style={{ marginLeft: "0.5rem", padding: "0.5rem 1rem" }}
            onClick={() => addItem(expr)}
          >
            Save
          </button>
          <button
            style={{ marginLeft: "0.5rem", padding: "0.5rem 1rem" }}
            onClick={() => addItem(expr)}
          >
            Solve
          </button>
        </main>
      </MathJaxContext>
    </div>
  );
}

function expressionToMathJax(expression) {
  const expSplit = expression.split(" ");
  let containsVariable = false;

  for (let i = 0; i < expSplit.length; i++) {
    const token = expSplit[i];

    if (token.trim() === "") continue;

    if (isNaN(Number(token))) {
      containsVariable = true;
      break;
    }
  }

  if (containsVariable) {
    console.log("Cannot solve, must contain only constant values");
  }

  return expression;
}
