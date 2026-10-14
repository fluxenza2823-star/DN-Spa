import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ({ items }) {
  const base = useId();
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.q}>
            <h3>
              <button
                type="button"
                id={btnId}
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <ChevronDown size={20} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="faq-a" hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
