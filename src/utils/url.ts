const baseUrl = "https://dummyjson.com/users";

const getImageUrl = function (width: number, height: number) {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  return `https://picsum.photos/${width}/${height}.webp?random=${randomNumber}`;
};
export { baseUrl, getImageUrl };
