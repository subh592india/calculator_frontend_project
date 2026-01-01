const display = document.getElementById("display")

function appendValue(v) {
  display.value += v
}

function clearDisplay() {
  display.value = ""
}

function backspace() {
  display.value = display.value.slice(0, -1)
}

function addDecimal() {
  if (!display.value.endsWith(".")) display.value += "."
}

function d2r(d) {
  return d * Math.PI / 180
}

function safeTrig(fn, angle) {
  const rad = d2r(angle)
  const s = Math.sin(rad)
  const c = Math.cos(rad)
  const EPS = 1e-12

  if (fn === "sin") return Math.abs(s) < EPS ? 0 : s
  if (fn === "cos") return Math.abs(c) < EPS ? 0 : c
  if (fn === "tan") {
    if (Math.abs(c) < EPS) return NaN
    return s / c
  }
  if (fn === "cot") {
    if (Math.abs(s) < EPS) return NaN
    return c / s
  }
  if (fn === "sec") {
    if (Math.abs(c) < EPS) return NaN
    return 1 / c
  }
  if (fn === "cosec") {
    if (Math.abs(s) < EPS) return NaN
    return 1 / s
  }
}

function calculate() {
  try {
    let expr = display.value

    expr = expr.replace(
      /(sin|cos|tan|cot|sec|cosec)\(([^()]+)\)/g,
      (_, fn, angle) => {
        const a = math.evaluate(angle)
        const r = safeTrig(fn, a)
        if (!isFinite(r)) throw "Undefined"
        return r
      }
    )

    let result = math.evaluate(expr)

    const EPS = 1e-12
    if (Math.abs(result) < EPS) result = 0
    if (Math.abs(result - Math.round(result)) < EPS)
      result = Math.round(result)

    display.value = Number(result.toPrecision(12))
  } catch {
    display.value = "Undefined"
  }
}
