export const pulse = {
  from: {
    opacity: 1,
  },
  '50%': {
    opacity: 0.2,
  },
  to: {
    opacity: 1,
  },
};

export const wave = {
  '0%': {
    transform: 'translateX(-100%)',
  },
  '60%': {
    // +0.5s of delay between each loop
    transform: 'translateX(100%)',
  },
  '100%': {
    transform: 'translateX(100%)',
  },
};
