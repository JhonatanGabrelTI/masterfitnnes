const snowflakes = Array.from({ length: 30 }, (_, index) => ({ left: `${(index * 37) % 100}%`, delay: `${-((index * 1.7) % 14)}s`, duration: `${10 + (index % 8)}s`, size: `${5 + (index % 6)}px`, drift: `${-30 + ((index * 19) % 60)}px` }));
const lights = ["#ff1e1e", "#f7c94b", "#ffffff", "#ff1e1e", "#f7c94b", "#ffffff", "#ff1e1e", "#f7c94b", "#ffffff", "#ff1e1e", "#f7c94b", "#ffffff"];

export default function FestiveDecor() {
  return <>
    <div className="festive-layer" aria-hidden="true">
      <div className="christmas-lights"><span className="lights-wire" />{lights.map((color, index) => <i key={index} style={{ "--bulb-color": color, "--bulb-delay": `${index * 0.18}s` } as React.CSSProperties} />)}</div>
      <div className="pine-corner pine-left"><span /><span /><span /></div><div className="pine-corner pine-right"><span /><span /><span /></div>
      <div className="gift-stack"><i /><i /><i /><b /></div>
      <div className="snow-field">{snowflakes.map((flake, index) => <i key={index} style={{ left: flake.left, width: flake.size, height: flake.size, animationDelay: flake.delay, animationDuration: flake.duration, "--snow-drift": flake.drift } as React.CSSProperties} />)}</div>
    </div>
  </>;
}
