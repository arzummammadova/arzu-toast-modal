// src/types/custom.d.ts
declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.wav' {
  const src: string;
  export default src;
}

declare module '*.ogg' {
  const src: string;
  export default src;
}
// Ehtiyacınız olarsa digər media tiplərini də əlavə edə bilərsiniz (.png, .jpg, .svg və s. üçün də oxşar qayda tətbiq olunur)