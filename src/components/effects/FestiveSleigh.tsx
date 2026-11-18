export default function FestiveSleigh() {
  return (
    <div className="vip-sleigh-zone" aria-hidden="true">
      <div className="aurora aurora-one" /><div className="aurora aurora-two" />
      <div className="shooting-star star-one" /><div className="shooting-star star-two" />
      <div className="sleigh-flight">
        <span className="magic-trail"><i /><i /><i /><i /><i /></span>
        <svg className="santa-sleigh" viewBox="0 0 960 260" role="presentation">
          <defs>
            <linearGradient id="sleighRed" x1="0" x2="1"><stop stopColor="#ff3038" /><stop offset="1" stopColor="#a90813" /></linearGradient>
            <linearGradient id="sleighGold" x1="0" x2="1"><stop stopColor="#fff0a8" /><stop offset=".48" stopColor="#d7a932" /><stop offset="1" stopColor="#fff2ae" /></linearGradient>
            <filter id="sleighGlow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          <g className="reindeer-team" fill="#351b14" stroke="#f2c85b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            {[20, 190, 360].map((x, index) => (
              <g key={x} transform={`translate(${x} ${index === 1 ? 7 : index === 2 ? 13 : 0})`}>
                <ellipse cx="70" cy="142" rx="60" ry="31" />
                <path d="M108 128c17-40 29-70 56-75 19-4 36 8 39 25-18 16-46 17-64 5l-13 55z" />
                <ellipse cx="184" cy="71" rx="27" ry="19" />
                <path d="m173 53-15-23m25 23 5-28m-20 13-19-15m36 9 17-17m-6 34 17-9" fill="none" />
                <path d="M29 160 8 222m63-52 3 59m55-68 28 58m-4-68 48 42" fill="none" strokeWidth="7" />
                <path d="m6 222 20 1m45 7 20-5m64-5 18-9m26-18 18-14" fill="none" strokeWidth="6" />
                <path d="M18 131-4 112m15 39-29 2" fill="none" />
                {index === 0 && <circle cx="203" cy="72" r="7" fill="#ff1e1e" stroke="none" filter="url(#sleighGlow)" />}
              </g>
            ))}
            <path d="M208 92c190 10 322 48 430 65" fill="none" stroke="#f2c85b" strokeWidth="4" strokeDasharray="10 9" />
          </g>

          <g className="sleigh-body">
            <path d="M635 128c-16-62 28-107 87-107 51 0 89 36 91 90l-2 67H655z" fill="url(#sleighRed)" stroke="#f2c85b" strokeWidth="5" />
            <path d="M608 151h264l-34 65H667c-41 0-68-25-59-65z" fill="url(#sleighRed)" stroke="#f2c85b" strokeWidth="5" />
            <path d="M824 104v111h65c39 0 61-25 66-63-33 17-69 10-88-48z" fill="#8d0911" stroke="#f2c85b" strokeWidth="5" />
            <path d="M648 220c18 28 42 34 78 34h169c31 0 51-10 62-34" fill="none" stroke="url(#sleighGold)" strokeWidth="10" strokeLinecap="round" />
            <circle cx="728" cy="52" r="29" fill="#e7b58d" stroke="#f2c85b" strokeWidth="4" />
            <path d="M687 46c13-42 71-55 94-11l-14 22c-22-16-52-18-80-11z" fill="#d31320" />
            <circle cx="789" cy="24" r="13" fill="#fff" />
            <path d="M701 67c7 33 33 43 54 8 18 34-1 73-34 72-38-1-52-48-20-80z" fill="#fff" />
            <path d="M776 116c17-52 77-61 105-14l-12 73h-91z" fill="#175c38" stroke="#f2c85b" strokeWidth="4" />
            <path d="m786 126 20-27 18 27 22-31 26 31" fill="none" stroke="#f2c85b" strokeWidth="7" />
            <circle cx="701" cy="61" r="3" fill="#24140f" stroke="none" />
          </g>
        </svg>
      </div>
    </div>
  );
}
