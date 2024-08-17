import { useRef } from 'react';
import './App.css';
import { useCircularMotion } from './useCircularMotion';
import { useDelayedValue } from './useDelayedValue';
import { useHexagonalMotion } from './useHexagonalMotion';
import { useRectangularMotion } from './useRectangularMotion';
import useStarMotion from './useStarMotion';
import { useTriangularMotion } from './useTriangularMotion';

function Dot({ position = { x: 0, y: 0 }, opacity = 100 }) {
  return (
    <div style={{
      position: 'absolute',
      backgroundColor: 'pink',
      borderRadius: '50%',
      opacity,
      transform: `translate(${position.x}px, ${position.y}px)`,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
    }} />
  );
}

function ShapeMaker({ position = { x: 0, y: 0 } }) {
  const pos2 = useDelayedValue(position, 100);
  const pos3 = useDelayedValue(pos2, 100);
  const pos4 = useDelayedValue(pos3, 100);
  const pos5 = useDelayedValue(pos4, 100);
  return (
    <>
      <Dot position={position} opacity={1} />
      <Dot position={pos2} opacity={0.8} />
      <Dot position={pos3} opacity={0.6} />
      <Dot position={pos4} opacity={0.4} />
      <Dot position={pos5} opacity={0.2} />
    </>
  )
}


function App() {

  const style: React.CSSProperties = {
    height: 400, width: 400, position: "relative"
  }

  const hexRef = useRef(null);
  const Hexagonal = useHexagonalMotion(hexRef);

  const circleRef = useRef(null);
  const circle = useCircularMotion(circleRef);

  const rectangularRef = useRef(null);
  const rectangular = useRectangularMotion(rectangularRef);

  const squareRef = useRef(null);
  const square = useRectangularMotion(squareRef, 200, 200);

  const starRef = useRef(null);
  const star = useStarMotion(starRef);

  const triangularRef = useRef(null);
  const triangular = useTriangularMotion(triangularRef);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div ref={hexRef} style={style}>
        <ShapeMaker position={Hexagonal} />
      </div>
      <div ref={circleRef} style={style}>
        <ShapeMaker position={circle} />
      </div>
      <div ref={rectangularRef} style={style}>
        <ShapeMaker position={rectangular} />
      </div>
      <div ref={squareRef} style={style}>
        <ShapeMaker position={square} />
      </div>
      <div ref={starRef} style={style}>
        <ShapeMaker position={star} />
      </div>
      <div ref={triangularRef} style={style}>
        <ShapeMaker position={triangular} />
      </div>
    </div>
  )
}

export default App
