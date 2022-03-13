import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

beforeEach(() => renderWithRouter(<App />));

describe('testa o componente Pokedex', () => {
  // Define a constant instead of duplicating this literal (3) times.
  const POKEMON_NAME = 'pokemon-name';

  it('testa a presença do titulo (h2)', () => {
    const tituloPokedex = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(tituloPokedex).toBeInTheDocument();
  });

  it('testa se há um botão para mostrar o próximo pokemon', () => {
    const botãoProximo = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    expect(botãoProximo).toBeInTheDocument();
  });

  it('testa se o proximo pokemon é mostrado ao clicar no botão', () => {
    const botãoProximo = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    const nomePokemon = screen.getByTestId(POKEMON_NAME);

    userEvent.click(botãoProximo);
    expect(nomePokemon).toHaveTextContent(pokemons[1].name);
  });

  it('testa se o primeiro pokemon é mostrado se estiver no último ao clicar no botão',
    () => {
      const botãoProximo = screen.getByRole('button', {
        name: /Próximo pokémon/i,
      });
      const nomePokemon = screen.getByTestId(POKEMON_NAME);

      pokemons.forEach(() => userEvent.click(botãoProximo));

      expect(nomePokemon).toHaveTextContent(pokemons[0].name);
    });

  it('testa se só aparece um pokemon por vez', () => {
    const numero = screen.getAllByTestId(POKEMON_NAME).length;

    expect(numero).toBe(1);
  });

  it('testa se existe um botão de filtro para cada tipo', () => {
    // Criar um array com os tipos de cada Pokemon
    const tipos = pokemons.map(({ type }) => type);

    // Criar um array com os tipos sem repetir nenhum
    const tiposSemRepetição = [...new Set(tipos)];

    const botõesDeFiltro = screen.getAllByTestId('pokemon-type-button');

    // Para cada tipo, esperar que o botão tenha o texto do tipo
    tiposSemRepetição.forEach((tipo, botão) => {
      expect(botõesDeFiltro[botão].textContent).toBe(tipo);
    });
  });

  it('testa se ao escolher um filtro, só é mostrado os pokemons daquele tipo', () => {
    const filtroPsychic = screen.getAllByTestId('pokemon-type-button')[4];
    const nomePokemon = screen.getByTestId(POKEMON_NAME);
    const botãoProximo = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    userEvent.click(filtroPsychic);

    expect(nomePokemon).toHaveTextContent('Alakazam');

    userEvent.click(botãoProximo);

    expect(nomePokemon).toHaveTextContent('Mew');
  });

  it('testa se o botão de resetar os filtros está sempre visivel', () => {
    const botãoReset = screen.getByRole('button', {
      name: /All/i,
    });

    expect(botãoReset).toBeVisible();
  });

  it('testa se remove filtros ao clicar no botão de resetar filtro', () => {
    const botãoReset = screen.getByRole('button', {
      name: /All/i,
    });

    const botãoProximo = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    const pokemonName = screen.getByTestId(POKEMON_NAME);

    userEvent.click(botãoReset);

    pokemons.forEach(() => userEvent.click(botãoProximo));

    expect(pokemonName).toHaveTextContent(pokemons[0].name);
  });
});
