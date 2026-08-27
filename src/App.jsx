import { useState, useEffect, useRef } from 'react';

// Local data source: the five tallest mountains in the world.
const mountains = [
  {
    rank: 1, name: 'Mount Everest', height_m: 8849, height_ft: 29032,
    range: 'Mahalangur Himalaya', country: 'Nepal / China', firstAscent: 1953,
    desc: 'The highest point on Earth, measured from sea level. First summited by Edmund Hillary and Tenzing Norgay in 1953.',
    image: '/everest.jpg',
    sky: 'linear-gradient(180deg, #1e3a5f 0%, #4a7ba6 55%, #cfe3f0 100%)',
    back: '#6b93b8', mid: '#3f6d92', front: '#274b68',
  },
  {
    rank: 2, name: 'K2', height_m: 8611, height_ft: 28251,
    range: 'Karakoram', country: 'Pakistan / China', firstAscent: 1954,
    desc: 'Known as the Savage Mountain for its difficulty and danger. The second highest peak and one of the hardest to climb.',
    image: '/K2.avif',
    sky: 'linear-gradient(180deg, #3a2f4f 0%, #7a5f8f 55%, #e6dcef 100%)',
    back: '#9a7fb0', mid: '#6d5088', front: '#43315a',
  },
  {
    rank: 3, name: 'Kangchenjunga', height_m: 8586, height_ft: 28169,
    range: 'Himalayas', country: 'Nepal / India', firstAscent: 1955,
    desc: 'The third highest mountain in the world, whose name means the Five Treasures of Snow. Sacred to the people of Sikkim.',
    image: '/kangchenjunga.avif',
    sky: 'linear-gradient(180deg, #1f4a3f 0%, #3f8f74 55%, #d6f0e6 100%)',
    back: '#5fb094', mid: '#2f8068', front: '#1c5545',
  },
  {
    rank: 4, name: 'Lhotse', height_m: 8516, height_ft: 27940,
    range: 'Mahalangur Himalaya', country: 'Nepal / China', firstAscent: 1956,
    desc: 'Connected to Everest by the South Col. Its steep South Face is one of the most demanding walls in the Himalayas.',
    image: '/lhotse.jpeg',
    sky: 'linear-gradient(180deg, #5a3a2f 0%, #a6704a 55%, #f0e0d0 100%)',
    back: '#c9926a', mid: '#9a6440', front: '#653f28',
  },
  {
    rank: 5, name: 'Makalu', height_m: 8485, height_ft: 27838,
    range: 'Mahalangur Himalaya', country: 'Nepal / China', firstAscent: 1955,
    desc: 'An isolated peak shaped like a four-sided pyramid. Its sharp ridges and steep faces make it a serious mountaineering challenge.',
    image: '/makalu.jpg',
    sky: 'linear-gradient(180deg, #2f3a4f 0%, #566d8f 55%, #dfe6f0 100%)',
    back: '#8296b3', mid: '#556d92', front: '#333f5a',
  },
];

// A layered mountain silhouette drawn with plain SVG polygons (fallback if a photo is missing).
function MountainScene({ m }) {
  return (
    <svg className="scene" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <polygon fill={m.back} opacity="0.85" points="0,800 0,470 210,300 400,430 560,290 760,440 980,300 1200,470 1200,800" />
      <polygon fill={m.mid} points="0,800 0,560 260,360 470,540 680,340 900,540 1200,360 1200,800" />
      <polygon fill={m.front} points="0,800 360,470 560,620 820,430 1060,600 1200,520 1200,800" />
      <polygon fill="#ffffff" opacity="0.9" points="820,430 880,485 800,500 760,478" />
      <polygon fill="#ffffff" opacity="0.9" points="560,620 610,660 520,672 495,648" />
      <polygon fill="#ffffff" opacity="0.85" points="680,340 726,382 636,395 612,372" />
    </svg>
  );
}

function App() {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);

  const count = mountains.length;
  const goTo = (i) => setIndex(Math.max(0, Math.min(count - 1, i)));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goTo(index + 1);
      if (e.key === 'ArrowLeft') goTo(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

 
  const onDown = (e) => {
    if (e.target.closest('button')) return; 
    dragging.current = true;
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    setDrag(e.clientX - startX.current);
  };
  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (drag < -90) goTo(index + 1);
    else if (drag > 90) goTo(index - 1);
    setDrag(0);
  };


  const cardStyle = (i) => {
    const offset = i - index;
    const ease = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s ease';

    if (dragging.current && offset === 0) {
      return { transition: 'none', transform: `translateX(${drag}px) rotate(${drag * 0.02}deg)`, zIndex: 120, opacity: 1 };
    }
    // Active card, front and centre.
    if (offset === 0) return { transition: ease, transform: 'translateX(0px) scale(1) rotate(0deg)', zIndex: 100, opacity: 1 };
    if (offset === 1) return { transition: ease, transform: 'translateX(34px) scale(0.93) rotate(2deg)', zIndex: 99, opacity: 1 };
    if (offset === 2) return { transition: ease, transform: 'translateX(64px) scale(0.86) rotate(4deg)', zIndex: 98, opacity: 1 };
    if (offset > 2)   return { transition: ease, transform: 'translateX(90px) scale(0.82) rotate(5deg)', zIndex: 97, opacity: 0 };
    return { transition: ease, transform: `translateX(-130%) rotate(${offset * 4}deg) scale(0.96)`, zIndex: 200, opacity: 0 };
  };

  return (
    <div className="app">
      <nav className="navbar">
        <span className="brand">▲ SUMMITS</span>
        <ul className="navlinks">
          {mountains.map((m, i) => (
            <li key={m.rank}>
              <button
                className={'navlink' + (i === index ? ' active' : '')}
                onClick={() => goTo(i)}
              >
                {m.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className="carousel"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div className="deck">
          {mountains.map((m, i) => (
            <section
              className={'slide' + (i === index ? ' active' : '')}
              key={m.rank}
              style={{ ...cardStyle(i), background: m.sky }}
            >
              <MountainScene m={m} />
              <img
                className="photo"
                src={m.image}
                alt={m.name}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="shade" />
              <div className="overlay">
                <span className="rank">#{m.rank} tallest</span>
                <h1 className="mname">{m.name}</h1>
                <div className="stats">
                  <span>{m.height_m.toLocaleString()} m</span>
                  <span>{m.height_ft.toLocaleString()} ft</span>
                  <span>{m.range}</span>
                  <span>{m.country}</span>
                  <span>First ascent {m.firstAscent}</span>
                </div>
                <p className="desc">{m.desc}</p>
              </div>
            </section>
          ))}
        </div>

        <button className="arrow left" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous">‹</button>
        <button className="arrow right" onClick={() => goTo(index + 1)} disabled={index === count - 1} aria-label="Next">›</button>

        <div className="dots">
          {mountains.map((m, i) => (
            <button
              key={m.rank}
              className={'dot' + (i === index ? ' active' : '')}
              onClick={() => goTo(i)}
              aria-label={'Go to ' + m.name}
            />
          ))}
        </div>

        <span className="hint">swipe or use ‹ ›</span>
      </div>
    </div>
  );
}

export default App;