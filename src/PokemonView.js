import React, { useEffect, useState } from "react";

const PokemonView = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getdata() {
      const datas = await fetch("https://pokeapi.co/api/v2/pokemon");
      const jasonData = await datas.json();

      console.log(jasonData);
      setPokemonData(jasonData.results);
      localStorage.setItem("pokemon", JSON.stringify(jasonData));
      const items = await JSON.parse(localStorage.getItem("pokemon"));
      setCurrentPokemon(items.results[index]);
    }
    getdata();
    const items = JSON.parse(localStorage.getItem("pokemon"));
    setPokemonData(items.results);
    const data = pokemonData[index];
    setCurrentPokemon(data);
    console.log(currentPokemon);
  }, []);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (index + 1 === pokemonData.length) {
      setSelectedAnswer(null);
      setIndex(0);
      setCount(0);
    }
  };

  const dynamicStyles = {
    backgroundColor: selectedAnswer === currentPokemon?.name ? "green" : "red",
    color: "#fff",
    padding: "10px",
  };
  return (
    <div className="parents">
      <div className="parent">
        <h2 className="" style={{ marginLeft: "20%" }}>
          Guess the Pokémon!
        </h2>
        <div>
          {
            <div>
              <img
                src={currentPokemon?.url}
                alt={currentPokemon?.name}
                key={currentPokemon?.id}
              />
              <br></br>
              <button
                key={currentPokemon?.id}
                className={dynamicStyles}
                onClick={() => handleAnswerClick(currentPokemon?.name)}
              >
                {currentPokemon?.name}
              </button>
              <button
                className={dynamicStyles}
                onClick={() => handleAnswerClick("pikasour")}
              >
                pikasour
              </button>
              <button
                className={dynamicStyles}
                onClick={() => handleAnswerClick("runasour")}
              >
                runasour
              </button>
              <button
                className={dynamicStyles}
                onClick={() => handleAnswerClick("megasour")}
              >
                megasour
              </button>
            </div>
          }
        </div>
        {selectedAnswer !== null && (
          <div className="pp">
            <p className="text-center">
              Your answer is{" "}
              {selectedAnswer === currentPokemon?.name
                ? "correct"
                : "incorrect"}
              !
            </p>
            <button
              className="next"
              onClick={() => {
                setTimeout(() => {
                  const cur = index + 1;
                  setIndex(() => cur);
                  const data = pokemonData[cur];
                  setCurrentPokemon(data);
                  setSelectedAnswer(null);
                }, 2000);
                if (selectedAnswer === currentPokemon?.name) {
                  const cur = count + 1;
                  setCount(() => cur);
                  localStorage.setItem("count", JSON.stringify(cur));
                  setSelectedAnswer(null);
                }
                console.log(index);
                console.log(count);
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonView;
