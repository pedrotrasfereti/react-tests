import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const primeiroPokemon = pokemons[0];

beforeEach(() => renderWithRouter(<App />));

describe('testa o componente Pokemon Details', () => {
  it('testa se a pagina contem o titulo esperado', () => {
    const botãoDetalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(botãoDetalhes);

    const titulo = screen
      .getByRole('heading', { name: `${primeiroPokemon.name} Details` });

    expect(titulo).toBeInTheDocument();
  });

  it('testa se o link de navegação para os detalhes não existe na pagina', () => {
    const botãoDetalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(botãoDetalhes);

    expect(botãoDetalhes).not.toBeInTheDocument();
  });

  it('testa se a seção de descrição contém o titulo esperado', () => {
    const botãoDetalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(botãoDetalhes);

    const tituloDescrição = screen.getByRole('heading', { name: /summary/i });

    expect(tituloDescrição).toBeInTheDocument();
  });

  it('testa se a pagina contém um paragrafo com o sumário/descrição do pokemon', () => {
    const botãoDetalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(botãoDetalhes);

    const paragrafoDescrição = screen.getByText(primeiroPokemon.summary);

    expect(paragrafoDescrição).toBeInTheDocument();
  });

  it('testa se existe um titulo com o texto \'Game Locations of...\'', () => {
    const botãoDetalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(botãoDetalhes);

    const tituloLocalização = screen.getByRole('heading', {
      name: `Game Locations of ${primeiroPokemon.name}`,
    });

    expect(tituloLocalização).toBeInTheDocument();
  });

  it('testa se a pagina exibe mapas com as localizações do pokemon', () => {
    const botãoDetalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(botãoDetalhes);

    const tituloLocalização = screen.getByRole('heading', {
      name: `Game Locations of ${primeiroPokemon.name}`,
    });

    expect(tituloLocalização).toBeInTheDocument();

    primeiroPokemon.foundAt.forEach(({ location, map }, local) => {
      expect(screen.getByText(location)).toBeInTheDocument();

      expect(screen.getAllByRole('img')[local + 1]).toHaveAttribute('src', map);

      const imagemAlt = `${primeiroPokemon.name} location`;

      expect(screen.getAllByAltText(imagemAlt)[local]).toBeInTheDocument();
    });
  });

  it('testa se a página exibe um checkbox para favoritar o pokemon', () => {
    const botãoDetalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(botãoDetalhes);

    const botãoFavoritar = screen.getByLabelText(/Pokémon favoritado?/i);

    const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });

    expect(checkbox).toBeInTheDocument();

    expect(botãoFavoritar).toBeInTheDocument();

    userEvent.click(checkbox);

    const iconeFavoritado = screen.getAllByRole('img')[1];

    expect(iconeFavoritado).toBeInTheDocument();

    userEvent.click(botãoFavoritar);

    expect(iconeFavoritado).not.toBeInTheDocument();
  });
});
