import React, { useState } from 'react';

import { Button } from '../components';

const itemSize = 80;

const all = Array(75)
  .fill('')
  .map((_, i) => i + 1);
const topNumbers = all.filter(
  i => i !== 15 && i !== 30 && i !== 45 && i !== 60 && i !== 75,
);
const bottomNumbers = [15, 30, 45, 60, 75];

const compareArrays = (a: number[], b: number[]): boolean => {
  if (a.length !== b.length) return false;
  const uniqueValues = new Set([...a, ...b]);
  // eslint-disable-next-line no-restricted-syntax
  for (const v of uniqueValues) {
    const aCount = a.filter(e => e === v).length;
    const bCount = b.filter(e => e === v).length;
    if (aCount !== bCount) return false;
  }
  return true;
};

const Home: React.FC = () => {
  const [numbers, setNumbers] = useState({
    all,
    drawn: [],
  });
  const [lines, setLines] = useState({
    all: [1, 2, 3, 4, 5, 6, 7, 8],
    selected: [],
  });

  const drawnNumber = () => {
    const number = numbers.all[Math.floor(Math.random() * numbers.all.length)];

    if (numbers.drawn.find(i => i === number)) {
      if (compareArrays(numbers.all, numbers.drawn)) {
        console.log('NO MORE NUMBERS TO DRAWN');
        return;
      }
      drawnNumber();
      return;
    }

    setNumbers(st => ({ ...st, drawn: [...st.drawn, number] }));
    if (numbers.all.length === numbers.drawn.length + 1) {
      console.log('NO MORE NUMBERS TO DRAWN');
    }
  };

  const selectNumber = (number: number) => {
    setNumbers(st => ({
      ...st,
      drawn: st.drawn.find(i => i === number)
        ? st.drawn.filter(i => i !== number)
        : [...st.drawn, number],
    }));
  };

  const selectLines = (line: number) => {
    setLines(st => ({
      ...st,
      selected: st.selected.find(i => i === line)
        ? st.selected.filter(i => i !== line)
        : [...st.selected, line],
    }));
  };

  const resetGame = () => {
    setNumbers(st => ({ ...st, drawn: [] }));
    setLines(st => ({ ...st, selected: [] }));
  };

  return (
    <main className="flex p-12">
      <div>
        <ul
          className="grid grid-cols-10 gap-2"
          style={{ maxWidth: itemSize * 10 + 8 * 10 }}
        >
          {topNumbers.map(item => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={item}
              className={`
                flex items-center justify-center font-semibold rounded transition cursor-pointer
                ${
                  numbers.drawn.find(i => i === item)
                    ? 'bg-blue text-accent-0 text-5xl'
                    : 'bg-accent-2 text-accent-6 text-2xl'
                }
              `}
              onClick={() => selectNumber(item)}
              onKeyDown={() => selectNumber(item)}
              style={{ height: itemSize, width: itemSize }}
            >
              {item}
            </li>
          ))}
        </ul>
        <ul
          className="grid grid-cols-5 gap-2 mt-2"
          style={{ maxWidth: (itemSize * 2 + 8) * 5 + 8 * 5 }}
        >
          {bottomNumbers.map(item => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={item}
              className={`
                flex items-center justify-center font-semibold rounded cursor-pointer
                ${
                  numbers.drawn.find(i => i === item)
                    ? 'bg-blue text-accent-0 text-5xl'
                    : 'bg-accent-2 text-accent-6 text-2xl'
                }
              `}
              onClick={() => selectNumber(item)}
              onKeyDown={() => selectNumber(item)}
              style={{ height: itemSize, width: itemSize * 2 + 8 }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-full ml-12">
        <div>
          <div className="flex flex-col mb-6">
            <Button variant="outline" size="sm" onClick={resetGame}>
              Reiniciar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={drawnNumber}
              className="mt-2"
            >
              Sortear
            </Button>
          </div>
          <div className="flex flex-col p-6 bg-accent-2 rounded">
            <strong className="text-2xl font-semibold">Linhas</strong>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {/* <Image src="/modes.svg" layout="fixed" width={224} height={470} /> */}
              {lines.all.map(item => {
                if (lines.selected.find(i => i === item)) {
                  return (
                    <div
                      style={{ width: 100, height: 100 }}
                      className="flex items-center justify-center"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => selectLines(item)}
                      >
                        Voltar
                      </Button>
                    </div>
                  );
                }
                return (
                  <button
                    type="button"
                    onClick={() => selectLines(item)}
                    style={{ width: 100, height: 100 }}
                  >
                    <img
                      src={`/mode-${item}.svg`}
                      width={100}
                      height={100}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-1 justify-end ml-12 rounded">
        <div className="mb-3">
          <strong className="text-3xl font-semibold">Ultimos Números</strong>
          <h1 className="text-8xl font-semibold">
            {numbers.drawn[numbers.drawn.length - 1] || '-'}
          </h1>
          <ul className="mt-4">
            {numbers.drawn
              .slice(numbers.drawn.length > 6 ? numbers.drawn.length - 6 : 0)
              .reverse()
              .map((item, index) => {
                if (index === 0) return <></>;
                return (
                  <li
                    className="text-8xl font-semibold text-accent-3"
                    key={item}
                  >
                    {item}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Home;
