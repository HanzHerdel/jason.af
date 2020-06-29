import React, { useState } from 'react';
import styles from '../styles/exploding-nav.module.css';
import { useSfx } from '../hooks/use-sfx';

const navItems = [
  {
    id: 'teaching',
    label: 'Teaching',
    icon: 'terminal',
  },
  {
    id: 'writing',
    label: 'Writing',
    icon: 'writing',
  },
  {
    id: 'art',
    label: 'Art',
    icon: 'astronaut',
  },
  {
    id: 'connect',
    label: 'Connect',
    icon: 'rubber-corgi',
  },
  {
    id: 'gear',
    label: 'What I Use',
    icon: 'tv',
  },
  {
    id: 'bio',
    label: 'Bio / Press Kit',
    icon: 'camera',
  },
];

export function ExplodingNav() {
  const [state, setState] = useState('closed');
  const { playPowerUp, playPowerDown, playPop, playClick } = useSfx();

  const toggleOpen = () => {
    const toggle = document.querySelector(`.${styles.toggle}`);
    if (state === 'closed') {
      playPowerUp();
      setState('open');
      toggle.classList.add(styles.active);
    } else {
      playPowerDown();
      setState('closed');
      toggle.classList.remove(styles.active);
    }
  };

  const handleClick = id => event => {
    event.preventDefault();
    event.stopPropagation();
    playClick();

    const target = document.getElementById(id);
    const top = target.offsetTop - 60;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.toggle} style={{ '--navCount': navItems.length }}>
      <button className={styles.button} onClick={toggleOpen}>
        <img
          className={styles.face}
          src="https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/jason.af/jason-brains.png"
          alt=""
        />
        <span className="visually-hidden">Show Nav</span>
      </button>
      <nav className={styles.nav}>
        {navItems.map((item, index) => (
          <a
            className={styles.navItem}
            key={`nav-${item.id}`}
            href={`/#${item.id}`}
            style={{
              '--offset': index,
            }}
            onFocus={playPop}
            onClick={event => event.preventDefault()}
            onMouseEnter={playPop}
            onMouseDown={handleClick(item.id)}
            onKeyDown={event =>
              event.key === 'Enter' && handleClick(item.id)(event)
            }
          >
            {item.label}
            <img
              src={`https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/jason.af/${item.icon}.png`}
              alt=""
            />
          </a>
        ))}
      </nav>
    </div>
  );
}