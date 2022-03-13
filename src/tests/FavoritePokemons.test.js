import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const exemploPokemon = [{
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Alola Route 3',
      map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 3',
      map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 4',
      map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
    },
    {
      location: 'Kanto Rock Tunnel',
      map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
    },
  ],
}];

describe('testa o componente Favorite Pokémons', () => {
  it('testa a mensagem no caso de nenhum pokémon favorito', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const mensagemVazio = screen.getByText(/No favorite pokemon found/i);

    expect(mensagemVazio).toBeInTheDocument();
  });

  it('testa exibição dos cards no caso de (1) pokémon favorito', () => {
    renderWithRouter(<FavoritePokemons pokemons={ exemploPokemon } />);

    const nomePokemon = screen.getByTestId('pokemon-name');
    const tipoPokemon = screen.getByTestId('pokemon-type');
    const pesoPokemon = screen.getByTestId('pokemon-weight');

    expect(nomePokemon).toBeInTheDocument();
    expect(tipoPokemon).toBeInTheDocument();
    expect(pesoPokemon).toBeInTheDocument();
  });
});
