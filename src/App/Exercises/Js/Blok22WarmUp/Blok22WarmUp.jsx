import './styles.css';

export const Blok22WarmUp = () => {
  const wagi = [
    { letter: 'A', score: 5 },
    { letter: 'E', score: 15 },
    { letter: 'I', score: 6 },
    { letter: 'O', score: 2 },
    { letter: 'U', score: 0 },
  ];

  function getScore(imie, wagi){
    let score = 0;
    for (let index = 0; index < imie.lenght; index++){
      console.log(index, imie.charAt(index).toUpperCase());
      const litera = imie.charAt(index).toUpperCase();
      wagi.find((value) => value.letter === litera);
     
      // score = score + imie.charAt(index);
    };
    return score;
  }

  function imionaWagi( imiona, wagi) {
    return imiona.map((imie) => {
      return {name: imie, score: getScore(imie, wagi)};
  }).sort((first, second) => first.score - second.score * -1)
  }

  function handleOnClick(){
    const wynik = imionaWagi(['Janek', 'Zosia'], wagi);
    console.log(wynik);
  }

  return (
    <div>
      <h1>Rozgrzewka przed blokiem 22</h1>
      <section>
        <p>
          stwórz funkcję która przyjmuje 2 argumenty imiona oraz wagę/punktację.
        </p>
        <p>
          {' '}
          Zwraca posortowaną tablice imion z dodanym parametrem sumaWag
          niemutujaca oryginalnej
        </p>
        <button onClick={handleOnClick}>
          Kliknij
        </button>
      </section>
    </div>
  );
};